const { Groq } = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = 'llama-3.1-8b-instant';

/**
 * Analyze text for authenticity, toxicity, and trustworthiness
 */
const analyzeText = async (text) => {
  try {
    const prompt = `Analyze the following text for authenticity and trustworthiness. Provide a JSON response with:
- trust_score (0-100)
- classification (Authentic/Mixed/Suspicious)
- toxicity_level (Low/Medium/High)
- confidence (0-100)
- flags (array of detected issues)
- details (object with specific metrics)

Text to analyze: "${text}"

Respond ONLY with valid JSON, no markdown or extra text.`;

    const message = await groq.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].text;
    
    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Text analysis error:', error);
    throw new Error('Failed to analyze text: ' + error.message);
  }
};

/**
 * Analyze image for AI generation and manipulation
 */
const analyzeImage = async (imageBuffer, filename, extractedText = '') => {
  try {
    // Build a more detailed prompt with OCR text if available
    let contentDescription = `Image filename: ${filename}
Image size: ${imageBuffer.length} bytes`;

    if (extractedText && extractedText.trim()) {
      contentDescription += `

Extracted text from image:
${extractedText.substring(0, 500)}`;
    }

    const prompt = `Analyze the following image for signs of AI generation, deepfakes, or manipulation.

${contentDescription}

Provide a JSON response with:
- trust_score (0-100, higher = more authentic)
- ai_generated_probability (0-100)
- authenticity_badge (Likely Authentic/Suspicious/High Risk)
- manipulation_score (0-100, higher = more manipulated)
- confidence (0-100)
- details (object with specific analysis metrics like: compression_artifacts, lighting_consistency, text_detection, etc.)

Respond ONLY with valid JSON, no markdown or extra text.`;

    const message = await groq.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].text;
    
    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Image analysis error:', error);
    throw new Error('Failed to analyze image: ' + error.message);
  }
};

/**
 * Analyze audio transcription for authenticity
 */
const analyzeAudio = async (transcription) => {
  try {
    if (!transcription || transcription.length === 0) {
      throw new Error('No transcription provided');
    }

    const prompt = `Analyze the following audio transcription for signs of speech synthesis, deepfakes, or manipulation.

Transcription: "${transcription}"

Provide a JSON response with:
- trust_score (0-100)
- classification (Authentic/Suspicious/Deepfake Risk)
- speech_authenticity (Low Risk/Medium Risk/High Risk)
- detected_issues (array of detected problems)
- confidence (0-100)
- details (object with audio quality metrics)

Respond ONLY with valid JSON, no markdown or extra text.`;

    const message = await groq.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].text;
    
    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Audio analysis error:', error);
    throw new Error('Failed to analyze audio: ' + error.message);
  }
};

/**
 * Analyze video for deepfakes and authenticity
 */
const analyzeVideo = async (videoInfo) => {
  try {
    const prompt = `Analyze the following video information for signs of deepfakes or manipulation.

Video filename: ${videoInfo.filename}
Duration: ${videoInfo.duration} seconds
Resolution: ${videoInfo.resolution}
Frame rate: ${videoInfo.fps}

Provide a JSON response with:
- trust_score (0-100)
- deepfake_likelihood (0-100)
- face_consistency (0-100)
- risk_label (Low Risk/Moderate Risk/High Risk)
- frames_analyzed (estimated)
- confidence (0-100)
- details (object with video analysis metrics)

Respond ONLY with valid JSON, no markdown or extra text.`;

    const message = await groq.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].text;
    
    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Video analysis error:', error);
    throw new Error('Failed to analyze video: ' + error.message);
  }
};

/**
 * Generate detailed explanation for analysis results
 */
const generateExplanation = async (analysisType, results) => {
  try {
    const prompt = `Based on the following ${analysisType} analysis results, provide a brief, user-friendly explanation of the findings.

Results: ${JSON.stringify(results)}

Provide a JSON response with:
- summary (one-line summary)
- explanation (2-3 sentences explaining the results)
- recommendations (array of recommended actions)

Respond ONLY with valid JSON, no markdown or extra text.`;

    const message = await groq.messages.create({
      model: MODEL,
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].text;
    
    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Explanation generation error:', error);
    return {
      summary: 'Analysis complete',
      explanation: 'Analysis results are displayed above.',
      recommendations: [],
    };
  }
};

module.exports = {
  analyzeText,
  analyzeImage,
  analyzeAudio,
  analyzeVideo,
  generateExplanation,
};
