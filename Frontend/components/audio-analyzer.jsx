'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrustScore } from '@/components/trust-score';
import { ExplainabilityPanel } from '@/components/explainability-panel';
import { analyzeAudio } from '@/services/api';
import { AlertCircle, CheckCircle, Loader2, Upload, Play, Pause, Volume2 } from 'lucide-react';

export function AudioAnalyzer() {
  const [audioFile, setAudioFile] = useState(null);
  const [audioPreview, setAudioPreview] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('audio/')) {
        setError('Please select a valid audio file (MP3, WAV, M4A, etc.)');
        return;
      }

      if (file.size > 100 * 1024 * 1024) {
        setError('File size must be less than 100MB');
        return;
      }

      setAudioFile(file);
      setError('');
      setResult(null);

      const reader = new FileReader();
      reader.onload = (event) => {
        setAudioPreview(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!audioFile) {
      setError('Please select an audio file to analyze');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      // Transcribe audio using Web Speech API as a fallback
      // In production, you might use a proper transcription service
      let transcription = '';
      
      // Try to get transcription from Web Speech API if available
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        try {
          transcription = await getAudioTranscription(audioFile);
        } catch (transcriptionError) {
          console.warn('Transcription failed, sending filename to Groq for analysis:', transcriptionError);
          transcription = `Audio file: ${audioFile.name}`;
        }
      } else {
        transcription = `Audio file: ${audioFile.name}`;
      }

      const data = await analyzeAudio(transcription, audioFile.name);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getAudioTranscription = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // For demo, we'll send the filename since Web Speech API doesn't directly support files
        // In production, use a proper transcription API like Whisper
        resolve(`Audio transcription from: ${file.name}`);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Upload Section */}
      <Card className="border border-border/50 bg-card/50 p-8">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            disabled={isLoading}
            className="hidden"
          />
          <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-semibold text-foreground mb-1">
            {audioFile ? 'Change audio file' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-muted-foreground">
            MP3, WAV, M4A, OGG or other audio formats (max 100MB)
          </p>
        </div>

        {/* File Info */}
        {audioFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{audioFile.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatFileSize(audioFile.size)}</p>
              </div>
              <button
                onClick={() => {
                  setAudioFile(null);
                  setAudioPreview('');
                  setResult(null);
                  setIsPlaying(false);
                }}
                className="text-xs text-destructive hover:text-destructive/80 font-medium"
              >
                Remove
              </button>
            </div>

            {/* Audio Player */}
            {audioPreview && (
              <div className="flex items-center gap-3 mt-4 p-3 rounded-lg bg-background/50">
                <button
                  onClick={togglePlayback}
                  className="flex-shrink-0 p-2 rounded-full hover:bg-primary/20 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 text-primary" />
                  ) : (
                    <Play className="h-4 w-4 text-primary" />
                  )}
                </button>
                <audio
                  ref={audioRef}
                  src={audioPreview}
                  onEnded={handleAudioEnded}
                  className="hidden"
                />
                <div className="flex-1 h-1 rounded-full bg-border/30">
                  <div className="h-full w-1/3 rounded-full bg-primary" />
                </div>
                <Volume2 className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        )}

        {/* Action Button */}
        <div className="mt-6 flex gap-3">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading || !audioFile}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Audio...
              </>
            ) : (
              'Analyze Audio'
            )}
          </Button>
        </div>
      </Card>

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 flex gap-3"
        >
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-destructive text-sm">Analysis Error</p>
            <p className="text-sm text-destructive/80 mt-1">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Results Section */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Trust Score */}
          <Card className="border border-border/50 bg-card/50 p-8 flex justify-center">
            <TrustScore score={result.trust_score} isLoading={isLoading} />
          </Card>

          {/* Classification Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-border/50 bg-card/50 p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Classification</p>
                  <p className="text-lg font-semibold text-foreground">{result.classification}</p>
                </div>
              </div>
            </Card>
            <Card className="border border-border/50 bg-card/50 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Speech Authenticity</p>
                  <p className="text-lg font-semibold text-foreground">{result.speech_authenticity}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Detected Issues */}
          {result.detected_issues && result.detected_issues.length > 0 && (
            <Card className="border border-border/50 bg-card/50 p-6">
              <h3 className="font-semibold text-foreground mb-4">Detected Issues</h3>
              <div className="space-y-3">
                {result.detected_issues.map((issue, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{issue}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Audio Transcription */}
          {result.transcription && (
            <Card className="border border-border/50 bg-card/50 p-6">
              <h3 className="font-semibold text-foreground mb-4">Transcription Preview</h3>
              <p className="text-sm text-muted-foreground leading-relaxed bg-background/50 p-4 rounded-lg border border-border/30">
                {result.transcription}
              </p>
            </Card>
          )}

          {/* Explainability Panel */}
          <ExplainabilityPanel
            analysisType="audio"
            details={{
              confidence: result.confidence,
              detectedIssues: result.detected_issues || [],
              transcriptionAvailable: !!result.transcription,
            }}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => {
                setAudioFile(null);
                setAudioPreview('');
                setResult(null);
                setIsPlaying(false);
              }}
              variant="outline"
              className="flex-1"
            >
              Analyze Another
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Download Report
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
