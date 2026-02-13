'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrustScore } from '@/components/trust-score';
import { ExplainabilityPanel } from '@/components/explainability-panel';
import { analyzeText } from '@/services/api';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export function TextAnalyzer() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const saveToHistory = (analysisResult) => {
    try {
      if (!analysisResult || typeof analysisResult !== 'object') {
        console.error('Invalid analysis result:', analysisResult);
        return;
      }
      
      const trustScore = analysisResult.trust_score || 0;
      const historyEntry = {
        id: Date.now(),
        type: 'text',
        content: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
        timestamp: new Date().toLocaleString(),
        trustScore: Math.round(trustScore),
        status: trustScore >= 75 ? 'Clean' : trustScore >= 50 ? 'Suspicious' : 'High Risk',
        fullData: analysisResult,
      };

      const existingHistory = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
      existingHistory.unshift(historyEntry);
      localStorage.setItem('analysisHistory', JSON.stringify(existingHistory));
      console.log('✓ Saved to history:', historyEntry);
    } catch (err) {
      console.error('Error saving to history:', err);
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter text to analyze');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await analyzeText(text);
      setResult(data);
      saveToHistory(data);
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Input Section */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Card className="border border-primary/20 bg-gradient-to-br from-card via-card to-card/50 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Paste or type text to analyze
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
            placeholder="Enter text, caption, or comment here..."
            className="w-full h-32 px-4 py-3 rounded-lg border border-primary/30 bg-gradient-to-br from-background to-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 resize-none"
          />
          <div className="mt-4 flex items-center justify-between">
            <motion.p 
              className="text-xs text-muted-foreground"
              animate={{ opacity: text.length > 0 ? 1 : 0.5 }}
            >
              {text.length} characters
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleAnalyze}
                disabled={isLoading || !text.trim()}
                className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Text'
                )}
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>

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
          transition={{ staggerChildren: 0.1 }}
          className="space-y-6"
        >
          {/* Trust Score */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card className="border border-primary/30 bg-gradient-to-br from-card via-card to-card/30 p-8 flex justify-center shadow-xl">
              <TrustScore score={result.trust_score} isLoading={isLoading} />
            </Card>
          </motion.div>

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
                  <p className="text-sm text-muted-foreground">Toxicity Level</p>
                  <p className="text-lg font-semibold text-foreground">{result.toxicity_level}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Flagged Items */}
          {result.flags && result.flags.length > 0 && (
            <Card className="border border-border/50 bg-card/50 p-6">
              <h3 className="font-semibold text-foreground mb-4">Flagged Content</h3>
              <div className="space-y-2">
                {result.flags.map((flag, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-muted-foreground">{flag}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Explainability Panel */}
          <ExplainabilityPanel
            analysisType="text"
            details={{
              confidence: result.confidence,
              flaggedCategories: result.flags || [],
            }}
          />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => {
                setText('');
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
    </motion.div>
  );
}
