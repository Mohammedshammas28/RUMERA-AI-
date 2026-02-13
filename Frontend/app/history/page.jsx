'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, ImageIcon, Film, Download, Trash2, Filter } from 'lucide-react';

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
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHistory = () => {
      try {
        const savedHistory = localStorage.getItem('analysisHistory');
        console.log('Raw localStorage data:', savedHistory);
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory);
          console.log('Loaded history:', parsedHistory);
          setHistory(parsedHistory);
        } else {
          console.log('No history found in localStorage');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading history:', error);
        setIsLoading(false);
      }
    };

    // Load immediately
    loadHistory();
    
    // Set up interval to check for new data every 2 seconds
    const interval = setInterval(loadHistory, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const filteredHistory =
    filter === 'all' ? history : history.filter((item) => item.type === filter);

  const handleDeleteSelected = () => {
    const remaining = history.filter((item) => !selectedItems.includes(item.id));
    setHistory(remaining);
    localStorage.setItem('analysisHistory', JSON.stringify(remaining));
    setSelectedItems([]);
  };

  const handleDeleteItem = (itemId) => {
    const remaining = history.filter((item) => item.id !== itemId);
    setHistory(remaining);
    localStorage.setItem('analysisHistory', JSON.stringify(remaining));
    setSelectedItems(selectedItems.filter((id) => id !== itemId));
  };

  const handleExportAll = () => {
    if (filteredHistory.length === 0) return;

    const dataStr = JSON.stringify(filteredHistory, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analysis-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    try {
      const savedHistory = localStorage.getItem('analysisHistory');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
        console.log('Refreshed history:', parsedHistory);
      }
    } catch (error) {
      console.error('Error refreshing history:', error);
    }
    setIsLoading(false);
  };

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
      <section className="px-4 py-8 border-b border-primary/10 bg-gradient-to-r from-primary/5 via-card/30 to-primary/5">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/50'
                    : 'bg-muted/50 text-foreground hover:bg-muted/80'
                }`}
              >
                All
              </motion.button>
              {['text', 'image', 'video'].map((type) => {
                const Icon = getIcon(type);
                return (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      filter === type
                        ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/50'
                        : 'bg-muted/50 text-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </motion.button>
                );
              })}
            </div>
            <div className="flex gap-2">
              {selectedItems.length > 0 && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/30"
                    onClick={handleDeleteSelected}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Selected
                  </Button>
                </motion.div>
              )}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleRefresh}
                >
                  Refresh
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/30"
                  onClick={handleExportAll}
                  disabled={filteredHistory.length === 0}
                >
                  <Download className="h-4 w-4" />
                  Export All
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* History Items */}
      <section className="px-4 py-12 bg-gradient-to-b from-background to-primary/5">
        <div className="mx-auto max-w-5xl">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full"
                />
              </div>
              <p className="text-muted-foreground mt-4">Loading your analysis history...</p>
            </motion.div>
          ) : filteredHistory.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border border-primary/20 bg-gradient-to-br from-card via-card to-card/50 p-12 text-center shadow-lg">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Filter className="h-12 w-12 text-primary/50 mx-auto mb-4" />
                </motion.div>
                <h3 className="font-semibold text-foreground mb-2">No analyses found</h3>
                <p className="text-muted-foreground">Analyze text, images, or videos to see your history here.</p>
              </Card>
            </motion.div>
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
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <Card
                      className={`border p-6 cursor-pointer transition-all shadow-lg hover:shadow-xl ${
                        isSelected
                          ? 'border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5'
                          : 'border-primary/20 bg-gradient-to-br from-card via-card to-card/50 hover:border-primary/50'
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
                        <motion.div
                          animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                          className={`p-3 rounded-lg ${
                            isSelected
                              ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground'
                              : 'bg-primary/10 text-primary'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground capitalize">
                                {item.type} Analysis
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">{item.timestamp}</p>
                            </div>
                            <div className="text-right">
                              <motion.div
                                className={`text-sm font-bold bg-gradient-to-r ${getTrustColor(
                                  item.trustScore
                                )} bg-clip-text text-transparent`}
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                {item.trustScore}
                              </motion.div>
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
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteItem(item.id);
                              }}
                              className="ml-auto px-3 py-1 rounded text-xs bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                            >
                              <Trash2 className="h-3 w-3" />
                            </motion.button>
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
