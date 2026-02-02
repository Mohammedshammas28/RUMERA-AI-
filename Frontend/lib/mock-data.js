// Mock data for testing without backend
// Remove or replace with real API calls when backend is ready

export const mockTextAnalysis = {
  trust_score: 75,
  classification: 'Mixed',
  toxicity_level: 'Medium',
  confidence: 88,
  flags: ['Potential harassment', 'Heated language'],
  details: {
    offensive_words: 3,
    all_caps_ratio: 0.15,
    aggressive_tone_probability: 0.62,
  },
};

export const mockImageAnalysis = {
  trust_score: 82,
  ai_generated_probability: 12,
  authenticity_badge: 'Likely Authentic',
  manipulation_score: 8,
  confidence: 85,
  details: {
    jpeg_artifacts: false,
    frequency_analysis: 'normal',
    lighting_consistency: 'consistent',
    compression_quality: 'high',
  },
};

export const mockVideoAnalysis = {
  trust_score: 61,
  deepfake_likelihood: 28,
  face_consistency: 85,
  risk_label: 'Moderate Risk',
  frames_analyzed: 240,
  confidence: 79,
  details: {
    face_swaps_detected: 0,
    reenactment_probability: 0.22,
    audio_sync: 0.96,
    video_codec: 'h264',
    fps: 30,
    resolution: '1080p',
  },
};

export const mockAudioAnalysis = {
  trust_score: 68,
  classification: 'Suspicious',
  speech_authenticity: 'Medium Risk',
  detected_issues: [
    'Possible speech synthesis detected',
    'Audio compression artifacts present',
    'Unusual speech patterns identified',
  ],
  confidence: 78,
  transcription: 'This is a sample transcription of the audio content that would be extracted by our AI models using Whisper technology...',
  audio_quality: {
    noise_level: 'Medium',
    compression_artifacts: true,
    bit_rate: 128,
    sample_rate: 44100,
  },
  speaker_verification: {
    speaker_identified: true,
    consistency_score: 0.72,
    anomalies_detected: ['Unusual pitch modulation', 'Synthetic breathing pattern'],
  },
};

export const mockAnalysisHistory = [
  {
    id: 1,
    type: 'text',
    content: 'Sample text from social media comment',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    trustScore: 85,
    status: 'Clean',
  },
  {
    id: 2,
    type: 'image',
    content: 'Product photo from e-commerce site',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    trustScore: 72,
    status: 'Suspicious',
  },
  {
    id: 3,
    type: 'video',
    content: 'Short video clip from social media',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    trustScore: 45,
    status: 'High Risk',
  },
  {
    id: 4,
    type: 'text',
    content: 'News article comment section',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    trustScore: 90,
    status: 'Trusted',
  },
  {
    id: 5,
    type: 'audio',
    content: 'Podcast episode audio file',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    trustScore: 68,
    status: 'Suspicious',
  },
];

// Simulated delay for mock API calls
export const simulateDelay = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Local storage helpers for offline testing
export const saveAnalysisLocally = (analysis) => {
  try {
    const history = JSON.parse(localStorage.getItem('rumera_history') || '[]');
    const newEntry = {
      id: Date.now(),
      ...analysis,
      timestamp: new Date().toISOString(),
    };
    history.unshift(newEntry);
    // Keep only last 50 analyses
    const limited = history.slice(0, 50);
    localStorage.setItem('rumera_history', JSON.stringify(limited));
    return newEntry;
  } catch (error) {
    console.error('Failed to save locally:', error);
    return null;
  }
};

export const getLocalHistory = () => {
  try {
    const history = JSON.parse(localStorage.getItem('rumera_history') || '[]');
    return history.map((item) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }));
  } catch (error) {
    console.error('Failed to retrieve history:', error);
    return [];
  }
};

export const clearLocalHistory = () => {
  try {
    localStorage.removeItem('rumera_history');
    return true;
  } catch (error) {
    console.error('Failed to clear history:', error);
    return false;
  }
};
