const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        otp: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['verification', 'password-reset'],
            required: true
        },
        expiresAt: {
            type: Date,
            required: true,
            expires: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('OTP', otpSchema);
