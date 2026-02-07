'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Shield,
  Users,
  Zap,
  Eye,
  Lock,
  Brain,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

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

export default function AboutPage() {
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
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4 text-foreground">
              About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">RUMERA</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building a more trustworthy internet, one verification at a time.
            </p>
          </motion.div>
        </div>

        <div className="absolute top-20 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Mission Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary/15 via-primary/10 to-accent/10 border border-primary/30 rounded-2xl p-12 shadow-2xl shadow-primary/20"
          >
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold mb-6 text-foreground"
            >
              Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Mission</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-4"
            >
              RUMERA exists to empower individuals, journalists, educators, and organizations with
              accessible tools to identify misinformation, hate speech, and deepfakes in the digital
              age.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              We believe that truth is foundational to a healthy society, and that advanced AI,
              when built responsibly, can be a force for good in combating digital deception.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Why Misinformation Matters */}
      <section className="px-4 py-20 bg-gradient-to-b from-primary/5 via-card/30 to-background border-y border-primary/10">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12 text-foreground"
          >
            Why This <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Matters</span>
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                icon: AlertCircle,
                title: 'Misinformation Spreads Fast',
                description:
                  'False information travels faster than truth online. Verification tools help slow the spread and build media literacy.',
              },
              {
                icon: Users,
                title: 'Impacts Real People',
                description:
                  'Hate speech and deepfakes cause real harm—to individuals, communities, and democratic institutions.',
              },
              {
                icon: Eye,
                title: 'Complex Media Environment',
                description:
                  'With AI-generated content becoming common, visual and audio verification is critical for trust.',
              },
              {
                icon: Zap,
                title: 'Urgent Need for Solutions',
                description:
                  'Professionals—journalists, educators, NGOs—need accessible tools to verify content at scale.',
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={i} variants={item}>
                  <Card className="p-6 border border-border/50 bg-card/50 hover:bg-card/70 transition-colors">
                    <Icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{card.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{card.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Responsible AI Commitment */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-foreground">Responsible AI & Transparency</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We are committed to building AI that is trustworthy, ethical, and aligned with
              human values. Every feature is designed with these principles in mind.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            {[
              {
                icon: Brain,
                title: 'Explainability',
                description:
                  "We don't just give you a score—we explain how we arrived at it, which models we used, and what factors influenced the result.",
              },
              {
                icon: Lock,
                title: 'Privacy-First',
                description:
                  'Your content is analyzed locally. We never store or sell your data. Your privacy is non-negotiable.',
              },
              {
                icon: Eye,
                title: 'Fairness & Bias Mitigation',
                description:
                  'We actively test for and address bias in our models to ensure equitable analysis across all communities.',
              },
              {
                icon: Users,
                title: 'Human-Centric Design',
                description:
                  'Our tools are built for real people, not experts. Clarity and accessibility are core to every interface.',
              },
            ].map((principle, i) => {
              const Icon = principle.icon;
              return (
                <motion.div key={i} variants={item}>
                  <div className="flex gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary h-fit">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-foreground">{principle.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Tools & Models */}
      <section className="px-4 py-20 bg-card/30 border-y border-border/30">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-foreground"
          >
            Tools & Models We Use
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                name: 'Hugging Face Transformers',
                use: 'Hate Speech & Toxic Language Detection',
                description:
                  'Advanced NLP models trained on multi-language datasets for detecting harmful content with high accuracy.',
              },
              {
                name: 'OpenAI CLIP',
                use: 'AI-Generated Image Detection',
                description:
                  'Evaluates images for authenticity and identifies artificially created or heavily manipulated content.',
              },
              {
                name: 'XceptionNet (FaceForensics++)',
                use: 'Deepfake Video Detection',
                description:
                  'Forensic analysis of video frames to detect face swaps, reenactments, and synthetic media.',
              },
              {
                name: 'OpenAI Whisper',
                use: 'Audio Verification & Transcription',
                description:
                  'Converts audio to text for verification and helps identify synthetic audio patterns.',
              },
            ].map((tool, i) => (
              <motion.div key={i} variants={item}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="border border-primary/20 bg-gradient-to-br from-card via-card to-card/50 p-6 hover:border-primary/50 transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg text-foreground">{tool.name}</h3>
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full transition-colors hover:bg-primary/20"
                      >
                        {tool.use}
                      </motion.span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{tool.description}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-foreground">Our Commitments</h2>
            <div className="space-y-4">
              {[
                'Transparency in all operations: We explain how our AI works.',
                'Data minimization: We collect and retain only what is necessary.',
                'User control: You decide how your data is used.',
                'Continuous improvement: We test and refine our models regularly.',
                'Accessible pricing: Quality verification tools for everyone, including non-profits and educators.',
                'Ethical research: We contribute to the open-source community.',
              ].map((commitment, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground text-lg">{commitment}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Preview */}
      <section className="px-4 py-20 bg-card/30 border-y border-border/30">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-foreground">Privacy & Security</h2>
            <Card className="border border-border/50 bg-card/50 p-8">
              <div className="space-y-4 text-muted-foreground">
                <p className="font-semibold text-foreground">Key Privacy Principles:</p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>
                      <strong>No data retention:</strong> We do not store your content after analysis is complete.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>
                      <strong>Local processing:</strong> Analysis happens on your device whenever possible.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>
                      <strong>Encrypted transmission:</strong> Any data in transit uses industry-standard encryption.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>
                      <strong>No third-party sharing:</strong> We never sell or share your information.
                    </span>
                  </li>
                </ul>
                <p className="pt-4">
                  For full details, see our <a href="#" className="text-primary hover:underline">Privacy Policy</a> and{' '}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>.
                </p>
              </div>
            </Card>
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
          <h2 className="text-3xl font-bold mb-4 text-foreground">Join the Truth Revolution</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Help build a more transparent and trustworthy digital world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Start Verifying
            </Button>
            <Button variant="outline">
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-card/30 px-4 py-12">
        <div className="mx-auto max-w-5xl text-center text-sm text-muted-foreground">
          <p>© 2026 RUMERA — Building trust in the digital age.</p>
        </div>
      </footer>
    </div>
  );
}
