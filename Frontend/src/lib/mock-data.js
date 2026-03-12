// Mock data for when backend is unavailable

export const mockTextAnalysis = {
  trust_score: 85,
  analysis_type: 'text',
  hate_speech: {
    detected: false,
    confidence: 0.12,
    categories: []
  },
  toxicity: {
    score: 0.08,
    level: 'low'
  },
  sentiment: {
    label: 'neutral',
    score: 0.65
  },
  summary: 'The text appears to be safe and does not contain hate speech or toxic content.',
  recommendations: [
    'Content is suitable for general audiences',
    'No harmful language detected'
  ]
};

export const mockImageAnalysis = {
  trust_score: 72,
  analysis_type: 'image',
  ai_generated: {
    detected: false,
    confidence: 0.28,
    model_detected: null
  },
  manipulation: {
    detected: false,
    confidence: 0.15,
    areas: []
  },
  metadata: {
    format: 'JPEG',
    dimensions: '1920x1080',
    has_exif: true
  },
  summary: 'The image appears to be authentic with no signs of AI generation or manipulation.',
  recommendations: [
    'Image metadata is intact',
    'No obvious signs of tampering'
  ]
};

export const mockVideoAnalysis = {
  trust_score: 68,
  analysis_type: 'video',
  deepfake: {
    detected: false,
    confidence: 0.22,
    face_swap_detected: false,
    lip_sync_issues: false
  },
  manipulation: {
    detected: false,
    confidence: 0.18,
    temporal_inconsistencies: false
  },
  audio_video_sync: {
    in_sync: true,
    confidence: 0.92
  },
  summary: 'The video appears to be authentic with no signs of deepfake manipulation.',
  recommendations: [
    'Video frames are consistent',
    'Audio and video are synchronized',
    'No face manipulation detected'
  ]
};

export const mockAudioAnalysis = {
  trust_score: 78,
  analysis_type: 'audio',
  synthetic_voice: {
    detected: false,
    confidence: 0.15,
    voice_cloning_detected: false
  },
  audio_quality: {
    clarity: 'good',
    background_noise: 'low',
    compression_artifacts: false
  },
  transcription: {
    text: 'Sample transcription text...',
    confidence: 0.95
  },
  sentiment: {
    label: 'neutral',
    score: 0.6
  },
  summary: 'The audio appears to be authentic human speech with no signs of synthesis.',
  recommendations: [
    'Voice patterns are consistent',
    'No synthetic voice markers detected',
    'Audio quality is good'
  ]
};
