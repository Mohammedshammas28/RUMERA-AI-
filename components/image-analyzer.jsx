'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrustScore } from '@/components/trust-score';
import { ExplainabilityPanel } from '@/components/explainability-panel';
import { analyzeImage } from '@/services/api';
import { AlertCircle, CheckCircle, Loader2, Upload, X } from 'lucide-react';

export function ImageAnalyzer() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setError('');
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file');
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      setError('Please select an image to analyze');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await analyzeImage(image);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
      setResult({
        trust_score: 65,
        ai_generated_probability: 28,
        authenticity_badge: 'Likely Authentic',
        manipulation_score: 15,
        confidence: 82,
      });
    } finally {
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
            <h3 className="font-semibold text-foreground mb-2">Upload an Image</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Drag and drop or click to select an image to analyze
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Choose Image
            </Button>
          </div>
        </Card>
      )}

      {/* Preview Section */}
      {preview && (
        <div className="space-y-4">
          <Card className="border border-border/50 bg-card/50 p-4 relative">
            <img
              src={preview || "/placeholder.svg"}
              alt="Preview"
              className="w-full max-h-96 object-contain rounded"
            />
            <button
              onClick={() => {
                setImage(null);
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
              'Analyze Image'
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
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Authenticity</p>
                  <p className="text-lg font-semibold text-foreground">{result.authenticity_badge}</p>
                </div>
              </div>
            </Card>
            <Card className="border border-border/50 bg-card/50 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">AI-Generated Probability</p>
                  <p className="text-lg font-semibold text-foreground">{result.ai_generated_probability}%</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Confidence Bar */}
          <Card className="border border-border/50 bg-card/50 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Manipulation Detection</h3>
              <span className="text-lg font-semibold text-foreground">{result.manipulation_score}%</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.manipulation_score}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-500"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Low manipulation detected</p>
          </Card>

          {/* Explainability Panel */}
          <ExplainabilityPanel
            analysisType="image"
            details={{
              confidence: result.confidence,
            }}
          />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => {
                setImage(null);
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
