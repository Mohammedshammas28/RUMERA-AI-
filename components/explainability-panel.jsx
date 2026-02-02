'use client';

import { useState } from 'react';
import { ChevronDown, Zap, Brain, Eye, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function ExplainabilityPanel({ analysisType = 'text', details = {} }) {
  const [isOpen, setIsOpen] = useState(false);

  const getModelInfo = () => {
    switch (analysisType) {
      case 'text':
        return {
          icon: Brain,
          title: 'Hate Speech Detection',
          model: 'Hugging Face Transformers',
          description: 'Analyzes text for toxic language and hate speech using transformer-based NLP models.',
        };
      case 'image':
        return {
          icon: Eye,
          title: 'AI-Generated Image Detection',
          model: 'OpenAI CLIP + Vision Models',
          description: 'Evaluates image authenticity and detects AI-generated or manipulated content.',
        };
      case 'video':
        return {
          icon: Zap,
          title: 'Deepfake Detection',
          model: 'XceptionNet (FaceForensics++)',
          description: 'Identifies deepfakes and face manipulations using advanced forensic analysis.',
        };
      case 'audio':
        return {
          icon: Volume2,
          title: 'Voice Authenticity Detection',
          model: 'Whisper + Speaker Verification',
          description: 'Analyzes speech patterns and detects voice synthesis, spoofing, and audio deepfakes using transcription and speaker consistency models.',
        };
      default:
        return {
          icon: Brain,
          title: 'AI Analysis',
          model: 'Multiple Models',
          description: 'Comprehensive analysis using responsible AI.',
        };
    }
  };

  const info = getModelInfo();
  const Icon = info.icon;

  return (
    <Card className="border border-border/50 bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors rounded-t-lg"
      >
        <div className="flex items-center gap-3 text-left">
          <Icon className="h-5 w-5 text-primary/70" />
          <div>
            <p className="font-semibold text-foreground text-sm">How we analyzed this</p>
            <p className="text-xs text-muted-foreground">{info.model}</p>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-border/30 px-4 py-4 space-y-4">
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-2">Model Used</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{info.description}</p>
          </div>

          {details.confidence !== undefined && (
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-2">Analysis Details</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Confidence Score</span>
                  <span className="font-medium text-foreground">{details.confidence}%</span>
                </div>
                {details.flaggedCategories && (
                  <div>
                    <span className="text-muted-foreground text-sm">Flagged Categories</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {details.flaggedCategories.map((cat) => (
                        <span
                          key={cat}
                          className="inline-flex px-2 py-1 bg-destructive/10 text-destructive text-xs rounded font-medium"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              This analysis uses responsible AI with transparency as a core principle. We prioritize accuracy and fairness.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
