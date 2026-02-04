const groqService = require('../utils/groqService');
const Tesseract = require('tesseract.js');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Analyze text endpoint
 */
const analyzeText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Text is required',
      });
    }

    // Limit text length to avoid excessive API calls
    const limitedText = text.substring(0, 2000);

    const analysis = await groqService.analyzeText(limitedText);
    const explanation = await groqService.generateExplanation('text', analysis);

    res.json({
      success: true,
      data: {
        ...analysis,
        explanation,
      },
    });
  } catch (error) {
    console.error('Text analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze text',
    });
  }
};

/**
 * Analyze image endpoint
 */
const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required',
      });
    }

    const imageBuffer = req.file.buffer;
    const filename = req.file.originalname;

    // Perform OCR to extract text from image
    let extractedText = '';
    try {
      const result = await Tesseract.recognize(imageBuffer, 'eng', {
        logger: (m) => console.log('OCR Progress:', m.progress),
      });
      extractedText = result.data.text;
    } catch (ocrError) {
      console.warn('OCR failed, continuing with image analysis:', ocrError.message);
      extractedText = '';
    }

    // Get image metadata
    const metadata = await sharp(imageBuffer).metadata();

    // Analyze image for AI generation and manipulation
    const analysis = await groqService.analyzeImage(imageBuffer, filename);
    const explanation = await groqService.generateExplanation('image', analysis);

    res.json({
      success: true,
      data: {
        ...analysis,
        explanation,
        extractedText: extractedText.substring(0, 500), // Limit OCR results
        metadata: {
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
          hasAlpha: metadata.hasAlpha,
        },
      },
    });
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze image',
    });
  }
};

/**
 * Analyze audio endpoint
 * Expects audio to be transcribed by frontend (using Web Speech API or Whisper)
 */
const analyzeAudio = async (req, res) => {
  try {
    const { transcription, filename } = req.body;

    if (!transcription || transcription.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Audio transcription is required',
      });
    }

    // Limit transcription length
    const limitedTranscription = transcription.substring(0, 2000);

    const analysis = await groqService.analyzeAudio(limitedTranscription);
    const explanation = await groqService.generateExplanation('audio', analysis);

    res.json({
      success: true,
      data: {
        ...analysis,
        explanation,
        transcription: limitedTranscription,
      },
    });
  } catch (error) {
    console.error('Audio analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze audio',
    });
  }
};

/**
 * Analyze video endpoint
 * Expects basic video information from frontend
 */
const analyzeVideo = async (req, res) => {
  try {
    const { filename, duration, resolution, fps } = req.body;

    if (!filename) {
      return res.status(400).json({
        success: false,
        message: 'Video filename is required',
      });
    }

    const videoInfo = {
      filename,
      duration: duration || 0,
      resolution: resolution || 'unknown',
      fps: fps || 30,
    };

    const analysis = await groqService.analyzeVideo(videoInfo);
    const explanation = await groqService.generateExplanation('video', analysis);

    res.json({
      success: true,
      data: {
        ...analysis,
        explanation,
      },
    });
  } catch (error) {
    console.error('Video analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze video',
    });
  }
};

/**
 * Health check for analysis service
 */
const healthCheck = async (req, res) => {
  try {
    // Simple test to verify Groq API connection
    const testAnalysis = await groqService.analyzeText('test');
    
    res.json({
      success: true,
      message: 'Analysis service is healthy',
      groqConnected: true,
    });
  } catch (error) {
    console.error('Analysis service health check failed:', error);
    res.status(503).json({
      success: false,
      message: 'Analysis service is unavailable',
      groqConnected: false,
      error: error.message,
    });
  }
};

module.exports = {
  analyzeText,
  analyzeImage,
  analyzeAudio,
  analyzeVideo,
  healthCheck,
};
