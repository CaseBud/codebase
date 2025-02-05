const { AppError } = require('../middleware/errorHandler');
const axios = require('axios');

const baseUrl = 'https://api.assemblyai.com/v2';

const headers = {
    authorization: process.env.ASSEMBLYAI_API_KEY
};

exports.transcribe = async (req, res) => {
    try {
        if (!req.file) {
            throw new AppError('No file uploaded', 400);
        }

        const { buffer, originalname } = req.file;

        const uploadResponse = await axios.post(`${baseUrl}/upload`, buffer, {
            headers: {
                ...headers,
                'Content-Type': 'application/octet-stream'
            }
        });

        if (!uploadResponse.data.upload_url) {
            throw new AppError('Upload to AssemblyAI failed', 500);
        }

        const data = {
            audio_url: uploadResponse.data.upload_url
        };

        const url = `${baseUrl}/transcript`;
        const response = await axios.post(url, data, { headers: headers });

        if (!response.data.id) {
            throw new AppError('Transcription failed', 500);
        }

        const transcriptId = response.data.id;

        const pollingEndpoint = `${baseUrl}/transcript/${transcriptId}`;
        let transcriptionResult;

        while (true) {
            const pollingResponse = await axios.get(pollingEndpoint, {
                headers: headers
            });
            transcriptionResult = pollingResponse.data;

            if (transcriptionResult.status === 'completed') {
                break;
            } else if (transcriptionResult.status === 'error') {
                throw new AppError(
                    `Transcription failed: ${transcriptionResult.error}`
                );
            } else {
                await new Promise((resolve) => setTimeout(resolve, 1500));
            }
        }

        res.status(200).json({
            status: 'success',
            data: {
                transcript: transcriptionResult.text
            }
        });
    } catch (error) {
        throw new AppError(
            `Error extracting transcript: ${error.message}`,
            500
        );
    }
};
