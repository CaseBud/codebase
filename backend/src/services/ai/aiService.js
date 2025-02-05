const axios = require('axios');
const { AppError } = require('../../middleware/errorHandler');
const { isFullWidth } = require('validator');

class AIService {
    static buildDocumentAnalysisRequest(
        documentContent,
        conversationHistory,
        userQuery,
        isFirstMessage = false,
        isDefaultTitle = false
        // isWebSearch = false
    ) {
        let query = `\n\nMy current query:\n${userQuery}`;
        // if (isWebSearch) {
        //     query = userQuery;
        // }
        if (documentContent.length > 0) {
            query = `Document(s) content:\n${documentContent}` + query;
        }
        if (isFirstMessage) {
            query =
                `\n\nNO PREVIOUS MESSAGE HAS BEEN SENT IN THIS CONVERSATION.` +
                query +
                `\n\nThis is the first message in the conversation. At the LAST line of your response, give a suitable title for the conversation in the format of 'Title: <insert-suitable-title>. DO NOT PUT ANY OTHER THING BETWEEN THE LAST LINE OF YOUR RESPONSE AND THE TITLE APART FROM '\n'`;
        } else {
            query = `Conversation so far:\n${conversationHistory}` + query;
        }
        if (isDefaultTitle && !isFirstMessage) {
            query =
                query +
                `Based on all the messages in the conversation, generate a suitable title for this conversation at the end of your response to the query. At the LAST line of your response, give a suitable title for the conversation in the format of '\nTitle: <insert-suitable-title>. DO NOT PUT ANY OTHER THING BETWEEN THE LAST LINE OF YOUR RESPONSE AND THE TITLE APART FROM '\n'`;
        }
        return { query };
    }

    static buildStandardConversationRequest(
        conversationHistory,
        userQuery,
        isFirstMessage = false,
        isDefaultTitle = false,
        isWebSearch = false
    ) {
        if (isWebSearch) {
            return {
                query: userQuery,
                web_search: true
            };
        }
        if (isDefaultTitle && !isFirstMessage) {
            return {
                query: `Conversation so far:\n${conversationHistory}\n\nMy current query:\n${userQuery}\n\nBased on all the messages in the conversation, generate a suitable title for this conversation at the end of your response to the query. At the LAST line of your response, give a suitable title for the conversation in the format of '\nTitle: <insert-suitable-title>. DO NOT PUT ANY OTHER THING BETWEEN THE LAST LINE OF YOUR RESPONSE AND THE TITLE APART FROM '\n'`
            };
        }
        return {
            query: isFirstMessage
                ? `NO PREVIOUS MESSAGE HAS BEEN SENT IN THIS CONVERSATION. My first query:\n${userQuery}\n\nThis is the first message in the conversation. At the LAST line of your response, give a suitable title for the conversation in the format of 'Title: <insert-suitable-title>. DO NOT PUT ANY OTHER THING BETWEEN THE LAST LINE OF YOUR RESPONSE AND THE TITLE APART FROM '\n'`
                : `Conversation so far:\n${conversationHistory}\n\nMy current query:\n${userQuery}`
        };
    }

    static getConversationTitle(aiResponse) {
        let responseLines = aiResponse.split('\n');
        const titleLine = responseLines[responseLines.length - 1];
        const titleMatch = titleLine.match(/Title:\s*(.*)/);
        let title = null;
        let newAiResponse = aiResponse;

        if (titleMatch) {
            title = titleMatch[1].replace(/^['"]|['"]$/g, '');
            responseLines.pop();
            newAiResponse = responseLines.join('\n');
        }

        return {
            title,
            newAiResponse
        };
    }

    static async queryAIModel(requestBody) {
        try {
            const response = await axios.post(
                process.env.MODEL_ENDPOINT,
                requestBody
            );
            return response.data;
        } catch (error) {
            throw new AppError('Error querying AI model: ' + error.message);
        }
    }
}

module.exports = AIService;
