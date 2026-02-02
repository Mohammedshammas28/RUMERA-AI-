'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, ImageIcon, Film, Download, Trash2, Filter } from 'lucide-react';

const mockHistory = [
  {
    id: 1,
    type: 'text',
    content: 'This is a sample text analysis result...',
    timestamp: '2 hours ago',
    trustScore: 85,
    status: 'Clean',
  },
  {
    id: 2,
    type: 'image',
    content: 'Sample image analysis',
    timestamp: '5 hours ago',
    trustScore: 72,
    status: 'Suspicious',
  },
  {
    id: 3,
    type: 'video',
    content: 'Sample video analysis',
    timestamp: '1 day ago',
    trustScore: 45,
    status: 'High Risk',
  },
  {
    id: 4,
    type: 'text',
    content: 'Another text sample for analysis...',
    timestamp: '2 days ago',
    trustScore: 90,
    status: 'Trusted',
  },
];

const getIcon = (type) => {
  switch (type) {
    case 'text':
      return MessageCircle;
    case 'image':
      return ImageIcon;
    case 'video':
      return Film;
    default:
      return MessageCircle;
  }
};

const getTrustColor = (score) => {
  if (score >= 75) return 'from-emerald-500 to-teal-600';
  if (score >= 50) return 'from-amber-500 to-orange-600';
  return 'from-rose-500 to-red-600';
};

export default function HistoryPage() {
  const [filter, setFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredHistory =
    filter === 'all' ? mockHistory : mockHistory.filter((item) => item.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Analysis History
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              View and manage your past analyses. Download reports or clear your history.
            </p>
          </motion.div>
        </div>

        <div className="absolute top-20 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10" />
      </section>

      {/* Controls Section */}
      <section className="px-4 py-8 border-b border-border/30 bg-card/30">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                All
              </button>
              {['text', 'image', 'video'].map((type) => {
                const Icon = getIcon(type);
                return (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      filter === type
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2">
              {selectedItems.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent"
                  onClick={() => setSelectedItems([])}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Selected
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent"
              >
                <Download className="h-4 w-4" />
                Export All
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* History Items */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          {filteredHistory.length === 0 ? (
            <Card className="border border-border/50 bg-card/50 p-12 text-center">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="font-semibold text-foreground mb-2">No analyses found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or upload new content.</p>
            </Card>
          ) : (
            <motion.div
              className="space-y-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {filteredHistory.map((item, i) => {
                const Icon = getIcon(item.type);
                const isSelected = selectedItems.includes(item.id);

                return (
                  <motion.div
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: {
                        opacity: 1,
                        y: 0,
                      },
                    }}
                  >
                    <Card
                      className={`border border-border/50 p-6 cursor-pointer transition-all hover:border-primary/30 ${
                        isSelected ? 'bg-primary/5 border-primary/30' : 'bg-card/50'
                      }`}
                      onClick={() =>
                        setSelectedItems(
                          isSelected
                            ? selectedItems.filter((id) => id !== item.id)
                            : [...selectedItems, item.id]
                        )
                      }
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground capitalize">
                                {item.type} Analysis
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">{item.timestamp}</p>
                            </div>
                            <div className="text-right">
                              <div
                                className={`text-sm font-semibold bg-gradient-to-r ${getTrustColor(
                                  item.trustScore
                                )} bg-clip-text text-transparent`}
                              >
                                {item.trustScore}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{item.status}</p>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.content}</p>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-8 text-xs bg-transparent">
                              View Report
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 text-xs flex items-center gap-1 bg-transparent">
                              <Download className="h-3 w-3" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-card/30 px-4 py-8 mt-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-3">Reports</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Download detailed reports of your analyses for documentation and reference.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-3">Privacy</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your analysis history is stored locally. You can delete items anytime.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-3">Retention</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                History is kept for 30 days by default. Adjust settings in your account.
              </p>
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 text-center text-xs text-muted-foreground">
            <p>© 2026 RUMERA. All analysis data is handled with care and transparency.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
