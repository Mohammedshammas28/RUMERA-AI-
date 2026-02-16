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
    // Common curse words and profanity patterns (simple check)
    const profanityPattern = /fuck|shit|asshole|bitch|damn|crap|hell|dick|cock|pussy|motherfuck|bastard|damn|arse|piss/gi;
    const hasProfanity = profanityPattern.test(text);
    
    const prompt = `Analyze the following text for toxicity, hate speech, and trustworthiness. 

CRITICAL SCORING RULES:
- If text contains ANY profanity, curse words, or hate speech: trust_score MUST be 10-30
- If toxicity_level is HIGH: trust_score MUST be 5-25
- If toxicity_level is MEDIUM: trust_score MUST be 20-40
- If toxicity_level is LOW and no profanity: trust_score can be 60+
- If text is clean and authentic: trust_score can be 75-100

Respond ONLY with valid JSON, no markdown or extra text.

{
  "trust_score": <number 0-100>,
  "classification": "<Authentic|Mixed|Suspicious>",
  "toxicity_level": "<Low|Medium|High>",
  "confidence": <number 0-100>,
  "flags": [<array of strings>],
  "details": {<object>}
}

Text to analyze: "${text}"`;

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
    
    const result = JSON.parse(jsonMatch[0]);
    
    // AGGRESSIVE toxicity enforcement - override Groq if needed
    if (hasProfanity) {
      result.trust_score = Math.min(result.trust_score, 25);
      result.toxicity_level = 'High';
    } else if (result.toxicity_level === 'High') {
      result.trust_score = Math.min(result.trust_score, 25);
    } else if (result.toxicity_level === 'Medium') {
      result.trust_score = Math.min(result.trust_score, 40);
    }
    
    // If any flags indicate toxic content, ensure low score
    const flags = result.flags || [];
    if (flags.some(f => {
      const lower = f.toLowerCase();
      return lower.includes('profanity') || 
             lower.includes('curse') ||
             lower.includes('hate') || 
             lower.includes('slur') ||
             lower.includes('offensive') ||
             lower.includes('toxic');
    })) {
      result.trust_score = Math.min(result.trust_score, 30);
    }
    
    // Ensure trust_score never exceeds certain thresholds for toxic content
    if (result.trust_score > 50 && (result.toxicity_level === 'Medium' || result.toxicity_level === 'High')) {
      result.trust_score = Math.min(result.trust_score, 40);
    }
    
    // Update classification based on corrected trust score
    if (result.trust_score >= 70) {
      result.classification = 'Authentic';
    } else if (result.trust_score >= 45) {
      result.classification = 'Mixed';
    } else {
      result.classification = 'Suspicious';
    }
    
    return result;
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
