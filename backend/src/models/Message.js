const mongoose = require('mongoose');
const Conversation = require('./Conversation');
const Document = require('./Document');

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true
        },
        query: {
            type: String,
            required: true,
            trim: true
        },
        response: {
            type: String,
            required: true,
            trim: true
        },
        isWebSearch: {
            type: Boolean,
            default: false
        },
        documentIds: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Document'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
