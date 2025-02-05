const mongoose = require('mongoose');
const Document = require('./Document');

const documentAnalysisSchema = new mongoose.Schema(
    {
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document',
            required: true
        },
        content: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        metadata: {
            type: Map,
            of: String,
            default: {}
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('DocumentAnalysis', documentAnalysisSchema);
