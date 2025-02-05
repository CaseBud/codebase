const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AppError } = require('../middleware/errorHandler');
const emailService = require('../services/emailService');
const otpService = require('../services/otpService');

exports.signup = async (req, res, next) => {
    try {
        const { email, fullName, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new AppError('Email already exists', 400));
        }

        const user = await User.create({
            email,
            fullName,
            password
        });

        const otp = await otpService.createOTP(email, 'verification');
        await emailService.sendVerificationEmail(email, otp);

        res.status(201).json({
            status: 'success',
            message:
                'Verification email sent. Please verify your email to continue.'
        });
    } catch (error) {
        next(error);
    }
};

exports.verifyEmail = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        const isValid = await otpService.verifyOTP(email, otp, 'verification');
        if (!isValid) {
            return next(new AppError('Invalid or expired OTP', 400));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError('User not found', 404));
        }

        user.isVerified = true;
        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('Please provide email and password', 400));
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(new AppError('Invalid email or password', 401));
        }

        if (!user.isVerified) {
            return next(new AppError('Please verify your email first', 401));
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError('No user found with this email', 404));
        }

        const otp = await otpService.createOTP(email, 'password-reset');
        await emailService.sendPasswordResetEmail(email, otp);

        res.status(200).json({
            status: 'success',
            message: 'Password reset instructions sent to email'
        });
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { email, otp, newPassword } = req.body;

        const isValid = await otpService.verifyOTP(
            email,
            otp,
            'password-reset'
        );
        if (!isValid) {
            return next(new AppError('Invalid or expired OTP', 400));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError('User not found', 404));
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Password reset successful'
        });
    } catch (error) {
        next(error);
    }
};

exports.resendVerification = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError('No user found with this email', 404));
        }

        if (user.isVerified) {
            return next(new AppError('Email is already verified', 400));
        }

        const otp = await otpService.createOTP(email, 'verification');
        await emailService.sendVerificationEmail(email, otp);

        res.status(200).json({
            status: 'success',
            message: 'Verification email sent successfully'
        });
    } catch (error) {
        next(error);
    }
};
