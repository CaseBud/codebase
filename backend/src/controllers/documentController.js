const documentService = require('../services/documentService');
const { AppError } = require('../middleware/errorHandler');

exports.uploadDocument = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new AppError('No file uploaded', 400);
        }

        const document = await documentService.createDocument(
            req.user.id,
            req.file
            // req.body.name
        );

        res.status(201).json({
            status: 'success',
            data: { document }
        });
    } catch (error) {
        next(error);
    }
};

exports.getDocument = async (req, res, next) => {
    try {
        const document = await documentService.getDocument(
            req.params.id,
            req.user.id
        );

        res.status(200).json({
            status: 'success',
            data: { document }
        });
    } catch (error) {
        next(error);
    }
};

exports.updateDocument = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new AppError('No file uploaded', 400);
        }

        const document = await documentService.updateDocument(
            req.params.id,
            req.user.id,
            req.file
        );

        res.status(200).json({
            status: 'success',
            data: { document }
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteDocument = async (req, res, next) => {
    try {
        await documentService.deleteDocument(req.params.id, req.user.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

exports.getVersions = async (req, res, next) => {
    try {
        const versions = await documentService.getVersions(
            req.params.id,
            req.user.id
        );

        res.status(200).json({
            status: 'success',
            data: { versions }
        });
    } catch (error) {
        next(error);
    }
};

exports.getVersion = async (req, res, next) => {
    try {
        const version = await documentService.getVersion(
            req.params.id,
            req.params.versionNumber,
            req.user.id
        );

        res.status(200).json({
            status: 'success',
            data: { version }
        });
    } catch (error) {
        next(error);
    }
};
