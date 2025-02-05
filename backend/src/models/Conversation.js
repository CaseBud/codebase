const mongoose = require('mongoose');
const Document = require('./Document');
const User = require('./User');

const conversationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            default: 'Untitled Conversation',
            trim: true
        },
        isDefaultTitle: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            required: true,
            enum: [
                'standard-conversation',
                'document-analysis',
                'document-generation'
            ],
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Conversation', conversationSchema);
