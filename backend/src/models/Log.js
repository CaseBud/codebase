const mongoose = require('mongoose');
const User = require('./User');

const logSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
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
        metadata: {
            type: Map,
            of: String,
            default: {}
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Log', logSchema);
