const express = require('express');
const multer = require('multer');
const analysisController = require('../controllers/analysisController');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Validate file types
    const allowedMimes = {
      'image/jpeg': 'image',
      'image/png': 'image',
      'image/webp': 'image',
      'image/gif': 'image',
      'audio/mpeg': 'audio',
      'audio/wav': 'audio',
      'audio/ogg': 'audio',
      'video/mp4': 'video',
      'video/mpeg': 'video',
      'video/quicktime': 'video',
      'video/webm': 'video',
    };

    if (allowedMimes[file.mimetype]) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}`));
    }
  },
});

/**
 * POST /analyze/text
 * Analyze text for authenticity and trustworthiness
 */
router.post('/text', analysisController.analyzeText);

/**
 * POST /analyze/image
 * Analyze image for AI generation and manipulation
 */
router.post('/image', upload.single('image'), analysisController.analyzeImage);

/**
 * POST /analyze/audio
 * Analyze audio transcription for authenticity
 */
router.post('/audio', analysisController.analyzeAudio);

/**
 * POST /analyze/video
 * Analyze video for deepfakes and authenticity
 */
router.post('/video', analysisController.analyzeVideo);

/**
 * GET /analyze/health
 * Health check for analysis service
 */
router.get('/health', analysisController.healthCheck);

module.exports = router;
