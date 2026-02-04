'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrustScore } from '@/components/trust-score';
import { ExplainabilityPanel } from '@/components/explainability-panel';
import { analyzeVideo } from '@/services/api';
import { AlertCircle, CheckCircle, Loader2, Upload, X } from 'lucide-react';

export function VideoAnalyzer() {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('video/')) {
      setVideo(file);
      setError('');
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid video file');
    }
  };

  const handleAnalyze = async () => {
    if (!video) {
      setError('Please select a video to analyze');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      // Extract video metadata
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(video);
      
      videoElement.onloadedmetadata = async () => {
        const videoInfo = {
          filename: video.name,
          duration: Math.round(videoElement.duration),
          resolution: `${videoElement.videoWidth}x${videoElement.videoHeight}`,
          fps: 30, // Default FPS, actual value depends on source
        };

        try {
          const data = await analyzeVideo(videoInfo);
          setResult(data);
        } catch (err) {
          setError(err.message || 'Analysis failed. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

      videoElement.onerror = () => {
        setError('Failed to load video metadata');
        setIsLoading(false);
      };
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      {!preview && (
        <Card className="border-2 border-dashed border-primary/30 bg-card/30 p-12">
          <div className="text-center">
            <Upload className="h-12 w-12 text-primary/50 mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Upload a Video</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop or click to select a video file to analyze
            </p>
            <p className="text-xs text-muted-foreground mb-6">Maximum size: 500MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Choose Video
            </Button>
          </div>
        </Card>
      )}

      {/* Preview Section */}
      {preview && (
        <div className="space-y-4">
          <Card className="border border-border/50 bg-card/50 p-4 relative">
            <video
              src={preview}
              controls
              className="w-full max-h-96 rounded bg-background"
            />
            <button
              onClick={() => {
                setVideo(null);
                setPreview(null);
                setResult(null);
              }}
              disabled={isLoading}
              className="absolute top-6 right-6 p-2 bg-background/80 rounded-lg hover:bg-background/95 transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
          </Card>

          <Button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Video'
            )}
          </Button>
        </div>
      )}

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

          {/* Analysis Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-border/50 bg-card/50 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Deepfake Likelihood</p>
                  <p className="text-lg font-semibold text-foreground">{result.deepfake_likelihood}%</p>
                </div>
              </div>
            </Card>
            <Card className="border border-border/50 bg-card/50 p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Face Consistency</p>
                  <p className="text-lg font-semibold text-foreground">{result.face_consistency}%</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Risk Assessment */}
          <Card className="border border-border/50 bg-card/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Risk Assessment</h3>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-amber-500/10 text-amber-600">
                {result.risk_label}
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Deepfake Detection</p>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.deepfake_likelihood}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-rose-500"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Face Consistency</p>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.face_consistency}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Analysis Details */}
          <Card className="border border-border/50 bg-card/50 p-6">
            <h3 className="font-semibold text-foreground mb-4">Analysis Details</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Frames Analyzed</span>
                <span className="font-medium text-foreground">{result.frames_analyzed}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Processing Duration</span>
                <span className="font-medium text-foreground">~45 seconds</span>
              </div>
            </div>
          </Card>

          {/* Explainability Panel */}
          <ExplainabilityPanel
            analysisType="video"
            details={{
              confidence: result.confidence,
            }}
          />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => {
                setVideo(null);
                setPreview(null);
                setResult(null);
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
    </div>
  );
}
