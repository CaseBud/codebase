const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const { AppError } = require('../middleware/errorHandler');

const extractTextFromFile = async (buffer, mimetype) => {
    try {
        switch (mimetype) {
            case 'application/pdf':
                const pdfData = await pdf(buffer);
                return pdfData.text;

            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                const result = await mammoth.extractRawText({ buffer });
                return result.value;

            case 'text/plain':
                return buffer.toString('utf-8');

            default:
                throw new AppError('Unsupported file type', 400);
        }
    } catch (error) {
        throw new AppError(`Error processing file: ${error.message}`, 500);
    }
};

module.exports = { extractTextFromFile };
