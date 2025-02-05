const express = require('express');
const protect = require('../middleware/auth');
const {
    documentAnalysisChat,
    standardConversationChat,
    getConversations,
    getConversation,
    deleteConversation,
    editConversationTitle
} = require('../controllers/chatController');

const router = express.Router();

router.use(protect);

router.get('/', getConversations);
router.post('/document-analysis', documentAnalysisChat);
router.post('/standard-conversation', standardConversationChat);
router.get('/:conversationId', getConversation);
router.put('/:conversationId', editConversationTitle);
router.delete('/:conversationId', deleteConversation);

/**
 * @swagger
 * /api/chat/:
 *   get:
 *     tags:
 *       - Conversations
 *     summary: Get all conversations for the user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of conversations
 *
 * /api/chat/{conversationId}/:
 *   get:
 *     tags:
 *       - Conversations
 *     summary: Get a specific conversation by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conversation details
 *       404:
 *         description: Conversation not found
 *
 * /api/chat/{conversationId}:
 *   delete:
 *     tags:
 *       - Conversations
 *     summary: Delete a conversation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Conversation deleted successfully
 *       404:
 *         description: Conversation not found
 *
 * /api/chat/document-analysis:
 *   post:
 *     tags:
 *       - Conversations
 *     summary: Start or continue a document analysis chat
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *             properties:
 *               conversationId:
 *                 type: string
 *               documentIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               query:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI response, conversation ID and conversation title
 *       400:
 *         description: Query is required or documents not found
 *
 * /api/chat/standard-conversation:
 *   post:
 *     tags:
 *       - Conversations
 *     summary: Start or continue a standard conversation chat
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *             properties:
 *               conversationId:
 *                 type: string
 *               query:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI response, conversation ID and conversation title
 *       400:
 *         description: Query is required
 *
 * /api/chat/{conversation-Id}:
 *   put:
 *     tags:
 *       - Conversations
 *     summary: Edit the title of a conversation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated conversation details
 *       404:
 *         description: Conversation not found
 */

module.exports = router;
