const express = require('express');
const protect = require('../middleware/auth');
const upload = require('../middleware/documentUpload');
const {
    uploadDocument,
    getDocument,
    updateDocument,
    deleteDocument,
    getVersions,
    getVersion
} = require('../controllers/documentController');

const router = express.Router();

router.use(protect);

router.post('/', upload.single('file'), uploadDocument);
router.get('/:id', getDocument);
router.put('/:id', upload.single('file'), updateDocument);
router.delete('/:id', deleteDocument);
router.get('/:id/versions', getVersions);
router.get('/:id/versions/:versionNumber', getVersion);

/**
 * @swagger
 * /api/documents:
 *   post:
 *     tags: [Documents]
 *     summary: Upload a new document
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Document created successfully
 *       400:
 *         description: Invalid input
 *
 *
 * /api/documents/{id}:
 *   get:
 *     tags: [Documents]
 *     summary: Get a document by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document details
 *       404:
 *         description: Document not found
 *
 *   put:
 *     tags: [Documents]
 *     summary: Update a document
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Document updated successfully
 *       404:
 *         description: Document not found
 *
 *   delete:
 *     tags: [Documents]
 *     summary: Delete a document
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Document deleted successfully
 *       404:
 *         description: Document not found
 *
 * /api/documents/{id}/versions:
 *   get:
 *     tags: [Documents]
 *     summary: Get document versions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of document versions
 *       404:
 *         description: Document not found
 *
 * /api/documents/{id}/versions/{versionNumber}:
 *   get:
 *     tags: [Documents]
 *     summary: Get specific document version
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: versionNumber
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Document version details
 *       404:
 *         description: Version not found
 */

module.exports = router;
