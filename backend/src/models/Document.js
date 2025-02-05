const mongoose = require('mongoose');
const User = require('./User');

const documentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            enum: ['pdf', 'doc', 'docx', 'txt'],
            lowercase: true
        }
        // url: {
        //     type: String,
        //     required: true,
        //     trim: true
        // }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);
