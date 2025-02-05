// const cloudinary = require('../config/cloudinary');
const Document = require('../models/Document');
const DocumentVersion = require('../models/DocumentVersion');
const { extractTextFromFile } = require('../utils/fileProcessing');
const { AppError } = require('../middleware/errorHandler');
// const stream = require('stream');

class DocumentService {
    // async uploadToCloudinary(buffer, originalname) {
    //     return new Promise((resolve, reject) => {
    //         const uploadStream = cloudinary.uploader.upload_stream(
    //             {
    //                 resource_type: 'raw',
    //                 folder: 'casebud/documents',
    //                 public_id: `${Date.now()}-${originalname}`
    //             },
    //             (error, result) => {
    //                 if (error) reject(error);
    //                 else resolve(result);
    //             }
    //         );

    //         const bufferStream = new stream.PassThrough();
    //         bufferStream.end(buffer);
    //         bufferStream.pipe(uploadStream);
    //     });
    // }

    async createDocument(userId, file) {
        try {
            // Upload file to Cloudinary
            // const uploadResult = await this.uploadToCloudinary(
            //     file.buffer,
            //     file.originalname
            // );

            // Extract text from document
            const textContent = await extractTextFromFile(
                file.buffer,
                file.mimetype
            );

            // Create document record
            const document = await Document.create({
                userId,
                name: file.originalname,
                type: file.originalname.split('.').pop()
                // url: uploadResult.secure_url
            });

            // Create initial version
            await DocumentVersion.create({
                documentId: document._id,
                versionNumber: 1,
                content: textContent,
                createdBy: userId
            });

            return document;
        } catch (error) {
            throw new AppError(
                `Error creating document: ${error.message}`,
                500
            );
        }
    }

    async getDocument(documentId, userId) {
        const document = await Document.findOne({ _id: documentId, userId });
        if (!document) {
            throw new AppError('Document not found', 404);
        }
        return document;
    }

    async updateDocument(documentId, userId, file) {
        const document = await this.getDocument(documentId, userId);

        // Upload new version to Cloudinary

        // const uploadResult = await this.uploadToCloudinary(
        //     file.buffer,
        //     file.originalname
        // );

        // Extract text from new version
        const textContent = await extractTextFromFile(
            file.buffer,
            file.mimetype
        );

        // Get latest version number
        const latestVersion = await DocumentVersion.findOne({
            documentId
        }).sort({ versionNumber: -1 });
        const newVersionNumber = (latestVersion?.versionNumber || 0) + 1;

        // Create new version
        await DocumentVersion.create({
            documentId,
            versionNumber: newVersionNumber,
            content: textContent,
            createdBy: userId
        });

        // Update document record
        // document.url = uploadResult.secure_url;
        document.type = file.originalname.split('.').pop();
        await document.save();

        return document;
    }

    async deleteDocument(documentId, userId) {
        const document = await this.getDocument(documentId, userId);

        // // Delete from Cloudinary
        // const publicId = document.url.split('/').slice(-1)[0].split('.')[0];
        // await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });

        // Delete versions
        await DocumentVersion.deleteMany({ documentId });

        // Delete document
        await Document.findByIdAndDelete(documentId);
    }

    async getVersions(documentId, userId) {
        await this.getDocument(documentId, userId); // Check access
        return DocumentVersion.find({ documentId }).sort({ versionNumber: -1 });
    }

    async getVersion(documentId, versionNumber, userId) {
        await this.getDocument(documentId, userId); // Check access
        const version = await DocumentVersion.findOne({
            documentId,
            versionNumber
        });
        if (!version) {
            throw new AppError('Version not found', 404);
        }
        return version;
    }
}

module.exports = new DocumentService();
