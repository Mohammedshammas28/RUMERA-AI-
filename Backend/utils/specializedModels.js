const { pipeline } = require('@xenova/transformers');

// Cache for loaded models
let toxicityClassifier = null;
let zeroShotClassifier = null;

/**
 * Initialize specialized ML models
 */
async function initializeModels() {
  try {
    // Hate speech detection model
    toxicityClassifier = await pipeline(
      'text-classification',
      'Xenova/toxic-bert',
      { quantized: true }
    );
    console.log('✓ Toxicity classifier loaded');

    // Zero-shot classifier for image detection
    zeroShotClassifier = await pipeline(
      'zero-shot-classification',
      'Xenova/mobilebert-uncased-mnli',
      { quantized: true }
    );
    console.log('✓ Zero-shot classifier loaded');
  } catch (error) {
    console.warn('⚠ Could not load ML models:', error.message);
  }
}

/**
 * Detect hate speech and toxic language
 */
async function detectHateSpeech(text) {
  try {
    if (!toxicityClassifier) {
      await initializeModels();
    }

    if (!toxicityClassifier) {
      return {
        is_toxic: false,
        toxicity_score: 0,
        message: 'Model not available',
      };
    }

    const result = await toxicityClassifier(text);
    const toxicity = result[0];

    return {
      is_toxic: toxicity.label === 'toxic' && toxicity.score > 0.5,
      toxicity_score: Math.round(toxicity.score * 100),
      label: toxicity.label,
      confidence: Math.round(toxicity.score * 100),
    };
  } catch (error) {
    console.error('Hate speech detection error:', error);
    return {
      is_toxic: false,
      toxicity_score: 0,
      error: error.message,
    };
  }
}

/**
 * Detect AI-generated content using image analysis
 */
async function detectAIGenerated(imageDescription) {
  try {
    if (!zeroShotClassifier) {
      await initializeModels();
    }

    if (!zeroShotClassifier) {
      return {
        ai_generated_probability: 0,
        message: 'Model not available',
      };
    }

    const candidates = [
      'AI generated image',
      'authentic photograph',
      'manipulated image',
      'synthetic content',
    ];

    const result = await zeroShotClassifier(imageDescription, candidates);

    // Find probability of AI-generated
    const aiGeneratedIdx = result.labels.indexOf('AI generated image');
    const aiProb = Math.round(result.scores[aiGeneratedIdx] * 100);

    return {
      ai_generated_probability: aiProb,
      top_classification: result.labels[0],
      confidence: Math.round(result.scores[0] * 100),
    };
  } catch (error) {
    console.error('AI detection error:', error);
    return {
      ai_generated_probability: 0,
      error: error.message,
    };
  }
}

/**
 * Enhanced text analysis with hate speech detection
 */
async function enhancedTextAnalysis(text) {
  try {
    const hateSpeechResult = await detectHateSpeech(text);

    return {
      hate_speech_detected: hateSpeechResult.is_toxic,
      toxicity_score: hateSpeechResult.toxicity_score,
      toxicity_level:
        hateSpeechResult.toxicity_score > 70
          ? 'High'
          : hateSpeechResult.toxicity_score > 40
            ? 'Medium'
            : 'Low',
      confidence: hateSpeechResult.confidence,
    };
  } catch (error) {
    console.error('Enhanced text analysis error:', error);
    return {
      hate_speech_detected: false,
      toxicity_score: 0,
      error: error.message,
    };
  }
}

/**
 * Enhanced image analysis with AI detection
 */
async function enhancedImageAnalysis(imageDescription) {
  try {
    const aiResult = await detectAIGenerated(imageDescription);

    return {
      ai_generated: aiResult.ai_generated_probability > 50,
      ai_probability: aiResult.ai_generated_probability,
      classification: aiResult.top_classification,
      confidence: aiResult.confidence,
    };
  } catch (error) {
    console.error('Enhanced image analysis error:', error);
    return {
      ai_generated: false,
      ai_probability: 0,
      error: error.message,
    };
  }
}

// Initialize models on startup
initializeModels();

module.exports = {
  detectHateSpeech,
  detectAIGenerated,
  enhancedTextAnalysis,
  enhancedImageAnalysis,
  initializeModels,
};
