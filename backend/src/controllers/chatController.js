const Document = require('../models/Document');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const DocumentVersion = require('../models/DocumentVersion');
const AIService = require('../services/ai/aiService');
const { AppError } = require('../middleware/errorHandler');

exports.getConversation = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        if (!conversationId) {
            throw new AppError('Conversation ID is required', 400);
        }
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            throw new AppError('Conversation not found', 404);
        }
        const messages = await Message.find({ conversationId })
            .sort({ createdAt: 1 })
            .populate('documentIds');
        res.status(200).json({ conversation, messages });
    } catch (error) {
        next(error);
    }
};

exports.deleteConversation = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        if (!conversationId) {
            throw new AppError('Conversation ID is required', 400);
        }
        const conversation = await Conversation.findOneAndDelete({
            _id: conversationId,
            userId: req.user.id
        });
        if (!conversation) {
            throw new AppError('Conversation not found', 404);
        }
        await Message.deleteMany({ conversationId });
        res.status(204).json({ message: 'Conversation deleted' });
    } catch (error) {
        next(error);
    }
};

exports.getConversations = async (req, res, next) => {
    try {
        const { type } = req.query;
        let conversations = [];
        if (type) {
            conversations = await Conversation.find({
                userId: req.user.id,
                type
            }).sort({ updatedAt: -1 });
        } else {
            conversations = await Conversation.find({
                userId: req.user.id
            }).sort({ updatedAt: -1 });
        }
        res.status(200).json({ conversations });
    } catch (error) {
        next(error);
    }
};

exports.editConversationTitle = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        const { title } = req.body;
        if (!conversationId || !title) {
            throw new AppError('Conversation ID and title are required', 400);
        }
        const conversation = await Conversation.findOne({
            _id: conversationId,
            userId: req.user.id
        });
        if (!conversation) {
            throw new AppError('Conversation not found', 404);
        }
        conversation.title = title;
        await conversation.save();
        res.status(200).json({ conversation });
    } catch (error) {
        next(error);
    }
};

exports.documentAnalysisChat = async (req, res, next) => {
    try {
        const { conversationId, documentIds, query, webSearch } = req.body;
        if (!query) {
            throw new AppError('Query is required', 400);
        }

        let conversation;
        let content = '';
        let messages = '';
        let isFirstMessage = false;

        if (conversationId) {
            conversation = await Conversation.findOne({
                _id: conversationId,
                type: 'document-analysis',
                userId: req.user.id
            });

            if (!conversation) {
                throw new AppError('Conversation not found', 404);
            }
            const conversationMessages = await Message.find({ conversationId })
                .sort({ createdAt: 1 })
                .limit(10);
            const messagesArray = conversationMessages.map(
                (msg) => `Me: ${msg.query}\n CaseBud (You): ${msg.response}\n`
            );
            let previousDocuments = [];
            if (conversationMessages.length > 0) {
                conversationMessages.forEach((msg) => {
                    if (Array.isArray(msg.documentIds)) {
                        msg.documentIds.forEach((doc) =>
                            previousDocuments.push(doc)
                        );
                    }
                });
            }

            const previousDocumentContents = await Promise.all(
                previousDocuments.map(async (document) => {
                    const versions = await DocumentVersion.find({
                        documentId: document
                    });
                    return versions
                        .map((version) => version.content)
                        .join('\n');
                })
            );
            content =
                'Previous document(s) content:\n' +
                previousDocumentContents.join('\n');

            messages = messagesArray.join('');
        } else {
            conversation = await Conversation.create({
                userId: req.user.id,
                type: 'document-analysis'
            });
            isFirstMessage = true;
        }

        if (documentIds) {
            const documents = await Document.find({
                _id: { $in: documentIds },
                userId: req.user.id
            });

            if (documents.length === 0) {
                throw new AppError('Document(s) not found', 404);
            }

            const documentContents = await Promise.all(
                documents.map(async (document) => {
                    const versions = await DocumentVersion.find({
                        documentId: document._id
                    });
                    return versions
                        .map((version) => version.content)
                        .join('\n');
                })
            );
            content =
                documentContents.length > 0
                    ? content +
                      'Current document(s) content:\n' +
                      documentContents.join('\n')
                    : content;
        }

        const isDefaultTitle = conversation.isDefaultTitle;
        // const isWebSearch = webSearch ? true : false;
        const requestBody = AIService.buildDocumentAnalysisRequest(
            content,
            messages,
            query,
            isFirstMessage,
            isDefaultTitle
            // isWebSearch
        );
        // requestBody.web_search = isWebSearch;

        let aiResponse = await AIService.queryAIModel(requestBody);
        aiResponse = aiResponse.response;

        if (!aiResponse) {
            throw new AppError(
                'Error querying AI model. No response returned.',
                500
            );
        }

        if (isFirstMessage || isDefaultTitle) {
            const response = AIService.getConversationTitle(aiResponse);
            const newTitle = response.title;

            if (newTitle) {
                const newAiResponse = response.newAiResponse;

                conversation.title = newTitle;
                conversation.isDefaultTitle = false;
                aiResponse = newAiResponse;

                await conversation.save();
            }
        }

        const message = await Message.create({
            conversationId: conversation._id,
            query,
            response: aiResponse,
            documentIds
        });

        res.status(200).json({
            conversationId: conversation._id,
            response: aiResponse,
            title: conversation.title
        });
    } catch (error) {
        next(error);
    }
};

exports.standardConversationChat = async (req, res, next) => {
    try {
        const { conversationId, query, webSearch } = req.body;
        if (!query) {
            throw new AppError('Query is required', 400);
        }

        let conversation;
        let messages = '';
        let isFirstMessage = false;

        if (conversationId) {
            conversation = await Conversation.findOne({
                _id: conversationId,
                type: 'standard-conversation',
                userId: req.user.id
            });
            if (!conversation) {
                throw new AppError('Conversation not found', 404);
            }

            const conversationMessages = await Message.find({ conversationId })
                .sort({ createdAt: 1 })
                .limit(10);
            const messagesArray = conversationMessages.map(
                (msg) => `Me: ${msg.query}\n CaseBud (You): ${msg.response}\n`
            );
            messages = messagesArray.join('');
        } else {
            conversation = await Conversation.create({
                userId: req.user.id,
                type: 'standard-conversation'
            });
            isFirstMessage = true;
        }

        const isDefaultTitle = conversation.isDefaultTitle;
        const isWebSearch = webSearch ? true : false;
        const requestBody = AIService.buildStandardConversationRequest(
            messages,
            query,
            isFirstMessage,
            isDefaultTitle,
            isWebSearch
        );

        let aiResponse = await AIService.queryAIModel(requestBody);

        aiResponse = aiResponse.response;

        if (!aiResponse) {
            throw new AppError(
                'Error querying AI model. No response returned.',
                500
            );
        }

        if (isFirstMessage || isDefaultTitle) {
            const response = AIService.getConversationTitle(aiResponse);
            const newTitle = response.title;

            if (newTitle) {
                const newAiResponse = response.newAiResponse;

                conversation.title = newTitle;
                conversation.isDefaultTitle = false;
                aiResponse = newAiResponse;

                await conversation.save();
            }
        }

        const message = await Message.create({
            conversationId: conversation._id,
            query,
            response: aiResponse,
            isWebSearch
        });

        res.status(200).json({
            conversationId: conversation._id,
            response: aiResponse,
            title: conversation.title
        });
    } catch (error) {
        next(error);
    }
};
