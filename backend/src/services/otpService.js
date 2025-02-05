const crypto = require('crypto');
const OTP = require('../models/Otp');

class OTPService {
    generateOTP() {
        return crypto.randomInt(100000, 999999).toString();
    }

    async createOTP(email, type) {
        await OTP.deleteMany({ email, type });

        const otp = this.generateOTP();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        await OTP.create({
            email,
            otp,
            type,
            expiresAt
        });

        return otp;
    }

    async verifyOTP(email, otp, type) {
        const otpDoc = await OTP.findOne({
            email,
            otp,
            type,
            expiresAt: { $gt: new Date() }
        });

        if (!otpDoc) {
            return false;
        }

        await OTP.findByIdAndDelete(otpDoc._id);
        return true;
    }
}

const otpService = new OTPService();
module.exports = otpService;
