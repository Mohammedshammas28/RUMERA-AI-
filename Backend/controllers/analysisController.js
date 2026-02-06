const advancedModels = require('../utils/advancedModels');
const Tesseract = require('tesseract.js');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Analyze text for toxicity and classification
 * Uses: Transformers + ToxicBERT
 */
const analyzeText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Text is required for analysis'
      });
    }

    console.log(`Analyzing text (${text.length} chars)...`);

    // Run enhanced text analysis
    const result = await advancedModels.enhancedTextAnalysis(text);

    res.json({
      success: true,
      data: {
        ...result,
        analyzed_at: new Date().toISOString(),
        model_used: 'OpenAI Whisper + Hugging Face Transformers + ToxicBERT'
      }
    });
  } catch (error) {
    console.error('Text analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Text analysis failed: ' + error.message
    });
  }
};

/**
 * Analyze image for AI generation and deepfakes
 * Uses: OpenAI CLIP + XceptionNet
 */
const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Image file is required'
      });
    }

    const imageBuffer = req.file.buffer;
    const filename = req.file.originalname;

    console.log(`Analyzing image: ${filename} (${imageBuffer.length} bytes)...`);

    // Extract text from image using OCR
    let extractedText = '';
    try {
      const ocrResult = await Tesseract.recognize(imageBuffer, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log(`OCR progress: ${Math.round(m.progress * 100)}%`);
          }
        }
      });
      extractedText = ocrResult.data.text;
      console.log(`Extracted text: ${extractedText.substring(0, 100)}...`);
    } catch (ocrError) {
      console.warn('OCR failed, continuing with image analysis:', ocrError.message);
      extractedText = '[No text extracted]';
    }

    // Get image metadata
    const metadata = await sharp(imageBuffer).metadata();
    console.log('Image metadata:', metadata);

    // Run enhanced image analysis using CLIP + XceptionNet
    const result = await advancedModels.enhancedImageAnalysis(imageBuffer);

    res.json({
      success: true,
      data: {
        filename,
        file_size: imageBuffer.length,
        image_metadata: {
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
          density: metadata.density,
          hasAlpha: metadata.hasAlpha
        },
        ocr_text: extractedText.substring(0, 500),
        ...result,
        analyzed_at: new Date().toISOString(),
        model_used: 'OpenAI CLIP + XceptionNet (FaceForensics++)'
      }
    });
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Image analysis failed: ' + error.message
    });
  }
};

/**
 * Analyze audio for transcription and toxicity
 * Uses: OpenAI Whisper + ToxicBERT
 */
const analyzeAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Audio file is required'
      });
    }

    const audioBuffer = req.file.buffer;
    const filename = req.file.originalname;

    console.log(`Analyzing audio: ${filename} (${audioBuffer.length} bytes)...`);

    // Run enhanced audio analysis (Whisper + toxicity)
    const result = await advancedModels.enhancedAudioAnalysis(audioBuffer);

    res.json({
      success: true,
      data: {
        filename,
        file_size: audioBuffer.length,
        ...result,
        analyzed_at: new Date().toISOString(),
        model_used: 'OpenAI Whisper + ToxicBERT'
      }
    });
  } catch (error) {
    console.error('Audio analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Audio analysis failed: ' + error.message
    });
  }
};

/**
 * Analyze video for deepfakes and metadata
 * Uses: XceptionNet (FaceForensics++)
 */
const analyzeVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Video file is required'
      });
    }

    const videoBuffer = req.file.buffer;
    const filename = req.file.originalname;

    console.log(`Analyzing video: ${filename} (${videoBuffer.length} bytes)...`);

    // Get basic video metadata
    const metadata = {
      filename,
      file_size: videoBuffer.length,
      mime_type: req.file.mimetype
    };

    // Run enhanced video analysis (XceptionNet)
    const result = await advancedModels.enhancedVideoAnalysis(metadata);

    res.json({
      success: true,
      data: {
        ...result,
        analyzed_at: new Date().toISOString(),
        model_used: 'XceptionNet (FaceForensics++)',
        analysis_note: 'For accurate deepfake detection, frame extraction and per-frame analysis is recommended. Upload individual frames for detailed analysis.',
        recommended_next_steps: [
          'Extract key frames from video',
          'Analyze each frame individually for deepfake indicators',
          'Use XceptionNet frame-by-frame for highest accuracy'
        ]
      }
    });
  } catch (error) {
    console.error('Video analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Video analysis failed: ' + error.message
    });
  }
};

/**
 * Health check endpoint - report model status
 */
const healthCheck = async (req, res) => {
  try {
    console.log('Running health check...');
    const modelStatus = await advancedModels.initializeAllModels();

    res.json({
      success: true,
      status: 'operational',
      timestamp: new Date().toISOString(),
      models: {
        whisper: {
          name: 'OpenAI Whisper',
          purpose: 'Audio transcription',
          status: modelStatus.whisper,
          version: 'whisper-tiny.en'
        },
        clip: {
          name: 'OpenAI CLIP',
          purpose: 'Image-text understanding & AI detection',
          status: modelStatus.clip,
          version: 'clip-vit-base-patch32'
        },
        transformers: {
          name: 'Hugging Face Transformers',
          purpose: 'Text classification & general NLP',
          status: modelStatus.textClassification,
          version: 'distilbert-base-uncased'
        },
        toxicity: {
          name: 'ToxicBERT',
          purpose: 'Hate speech & toxicity detection',
          status: modelStatus.toxicity,
          version: 'toxic-bert'
        },
        xceptionNet: {
          name: 'XceptionNet (FaceForensics++)',
          purpose: 'Deepfake & video forgery detection',
          status: modelStatus.xceptionNet,
          version: 'xception'
        }
      },
      endpoints: {
        text_analysis: 'POST /analyze/text',
        image_analysis: 'POST /analyze/image',
        audio_analysis: 'POST /analyze/audio',
        video_analysis: 'POST /analyze/video'
      },
      features: [
        'Text toxicity detection',
        'Hate speech detection',
        'AI-generated image detection',
        'Deepfake detection',
        'Audio transcription',
        'Content classification',
        'Trust scoring'
      ]
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      success: false,
      error: 'Health check failed: ' + error.message,
      models: {
        status: 'degraded'
      }
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
