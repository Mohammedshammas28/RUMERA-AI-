'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Users, Lock, CheckCircle, Zap, Eye } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Powered by Responsible AI</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 text-foreground">
              A New Era of <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Truth</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Verify content, detect hate speech, and identify deepfakes using advanced AI. Built by experts, trusted by journalists and organizations worldwide.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/analyze">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                  Start Analyzing
                </Button>
              </Link>
              <Link href="#why-rumera">
                <Button size="lg" variant="outline" className="border-primary/30 bg-transparent">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Trust Indicators Section */}
      <section className="px-4 py-20 bg-card/30 border-y border-border/30">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16 text-foreground"
          >
            Trusted by Leaders
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Users,
                title: 'For Journalists',
                desc: 'Verify sources and detect misinformation in real-time',
              },
              {
                icon: Lock,
                title: 'Privacy-First',
                desc: 'Your content analysis stays secure. No data retention.',
              },
              {
                icon: CheckCircle,
                title: 'Responsible AI',
                desc: 'Transparent, ethical AI with explainability built-in',
              },
            ].map((indicator, i) => {
              const Icon = indicator.icon;
              return (
                <motion.div key={i} variants={item}>
                  <Card className="p-6 border border-border/50 bg-card/50 hover:bg-card/70 transition-colors hover:border-primary/30">
                    <Icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{indicator.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{indicator.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="why-rumera" className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-foreground">Why RUMERA?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive content analysis powered by state-of-the-art AI models. Simple for everyone, powerful for professionals.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                icon: Eye,
                title: 'Hate Speech Detection',
                desc: 'Identify toxic language and harmful content using transformer-based NLP models.',
                model: 'Hugging Face Transformers',
              },
              {
                icon: Zap,
                title: 'AI-Generated Detection',
                desc: 'Detect artificially created or manipulated images with high accuracy.',
                model: 'OpenAI CLIP',
              },
              {
                icon: Shield,
                title: 'Deepfake Detection',
                desc: 'Identify face manipulations and synthetic videos with forensic precision.',
                model: 'XceptionNet (FaceForensics++)',
              },
              {
                icon: Users,
                title: 'Audio Verification',
                desc: 'Convert and verify audio content with advanced speech recognition.',
                model: 'OpenAI Whisper',
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div key={i} variants={item}>
                  <Card className="p-8 border border-border/50 bg-card/50 hover:bg-card/70 transition-colors group hover:border-primary/30">
                    <Icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{feature.desc}</p>
                    <p className="text-xs font-medium text-primary/70">{feature.model}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Trust Score Explanation */}
      <section className="px-4 py-20 bg-card/30 border-y border-border/30">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-foreground">Trust Score System</h2>
            <p className="text-muted-foreground">Clear, transparent scores that help you understand content authenticity</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                score: '75-100',
                label: 'Trusted',
                color: 'from-emerald-500 to-teal-600',
                description: 'Content appears authentic and free from detected issues',
              },
              {
                score: '50-74',
                label: 'Suspicious',
                color: 'from-amber-500 to-orange-600',
                description: 'Content contains elements requiring further review',
              },
              {
                score: '0-49',
                label: 'High Risk',
                color: 'from-rose-500 to-red-600',
                description: 'Content shows significant authenticity or safety concerns',
              },
            ].map((trust, i) => (
              <motion.div key={i} variants={item}>
                <Card className="p-6 border border-border/50 bg-card/50 text-center">
                  <div className={`bg-gradient-to-r ${trust.color} bg-clip-text text-transparent mb-2`}>
                    <div className="text-3xl font-bold">{trust.score}</div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{trust.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{trust.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Verify?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Start analyzing content in seconds. No setup required.
          </p>
          <Link href="/analyze">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Begin Analysis
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-card/30 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-foreground">RUMERA</span>
              </div>
              <p className="text-sm text-muted-foreground">A new era of truth in the digital age.</p>
            </div>
            {[
              {
                title: 'Product',
                links: [
                  { label: 'Analyze', href: '/analyze' },
                  { label: 'Pricing', href: '#' },
                  { label: 'API Access', href: '#' },
                ],
              },
              {
                title: 'Company',
                links: [
                  { label: 'About', href: '/about' },
                  { label: 'Blog', href: '#' },
                  { label: 'Contact', href: '#' },
                ],
              },
              {
                title: 'Legal',
                links: [
                  { label: 'Privacy', href: '#' },
                  { label: 'Terms', href: '#' },
                  { label: 'Ethics', href: '/about' },
                ],
              },
            ].map((group, i) => (
              <div key={i}>
                <h3 className="font-semibold text-foreground mb-4 text-sm">{group.title}</h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border/30 pt-8">
            <p className="text-sm text-muted-foreground text-center">
              Built with responsible AI. © 2026 RUMERA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
