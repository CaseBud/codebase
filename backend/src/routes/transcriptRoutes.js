const express = require('express');
const protect = require('../middleware/auth');
const upload = require('../middleware/audioUpload');

const { transcribe } = require('../controllers/transcriptController');

router = express.Router();

router.use(protect);

router.post('/', upload.single('file'), transcribe);

module.exports = router;
