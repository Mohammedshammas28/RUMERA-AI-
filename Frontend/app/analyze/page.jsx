'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Card } from '@/components/ui/card';
import { TextAnalyzer } from '@/components/text-analyzer';
import { ImageAnalyzer } from '@/components/image-analyzer';
import { VideoAnalyzer } from '@/components/video-analyzer';
import { AudioAnalyzer } from '@/components/audio-analyzer';
import { MessageCircle, ImageIcon, Film, AlertCircle, Volume2 } from 'lucide-react';

const tabs = [
  {
    id: 'text',
    label: 'Text Verification',
    icon: MessageCircle,
    description: 'Detect hate speech and toxic language',
  },
  {
    id: 'image',
    label: 'Image Verification',
    icon: ImageIcon,
    description: 'Identify AI-generated content',
  },
  {
    id: 'video',
    label: 'Video Verification',
    icon: Film,
    description: 'Detect deepfakes and manipulations',
  },
  {
    id: 'audio',
    label: 'Audio Verification',
    icon: Volume2,
    description: 'Detect voice synthesis and spoofing',
  },
];

export default function AnalyzePage() {
  const [activeTab, setActiveTab] = useState('text');

  const renderAnalyzer = () => {
    switch (activeTab) {
      case 'text':
        return <TextAnalyzer />;
      case 'image':
        return <ImageAnalyzer />;
      case 'video':
        return <VideoAnalyzer />;
      case 'audio':
        return <AudioAnalyzer />;
      default:
        return <TextAnalyzer />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Analyze Content
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the content type you want to verify. Our AI tools provide instant analysis with transparency.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-4 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'bg-card/50 text-foreground border border-border/50 hover:bg-card/70 hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-3 justify-center">
                    <Icon className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-semibold text-sm">{tab.label}</div>
                      <div className={`text-xs ${activeTab === tab.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {tab.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8 rounded-lg border border-primary/20 bg-primary/5 p-4 flex gap-3"
          >
            <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">Privacy & Security</p>
              <p className="text-muted-foreground mt-1">
                Your content is analyzed locally and never stored. No data is retained after analysis is complete.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10" />
      </section>

      {/* Main Content */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderAnalyzer()}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-card/30 px-4 py-8 mt-20">
        <div className="mx-auto max-w-5xl text-center text-sm text-muted-foreground">
          <p>Analysis powered by Hugging Face Transformers, OpenAI CLIP, XceptionNet, and Whisper</p>
        </div>
      </footer>
    </div>
  );
}
