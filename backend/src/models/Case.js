const mongoose = require('mongoose');
const User = require('./User');
const Document = require('./Document');

const caseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            required: true,
            enum: ['open', 'in_progress', 'closed', 'archived'],
            default: 'open'
        },
        type: {
            type: String,
            required: true,
            trim: true
        },
        documents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Document'
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Case', caseSchema);
