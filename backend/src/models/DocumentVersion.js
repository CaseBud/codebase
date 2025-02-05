const mongoose = require('mongoose');
const Document = require('./Document');
const User = require('./User');

const documentVersionSchema = new mongoose.Schema(
    {
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document',
            required: true
        },
        versionNumber: {
            type: Number,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('DocumentVersion', documentVersionSchema);
