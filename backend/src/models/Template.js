const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            enum: ['pdf', 'doc', 'txt'],
            lowercase: true
        },
        url: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Template', templateSchema);
