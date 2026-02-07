'use client';

import { motion } from 'framer-motion';

const getTrustLabel = (score) => {
  if (score >= 75) return { label: 'Trusted', color: 'from-emerald-500 to-teal-600' };
  if (score >= 50) return { label: 'Suspicious', color: 'from-amber-500 to-orange-600' };
  return { label: 'High Risk', color: 'from-rose-500 to-red-600' };
};

export function TrustScore({ score = 0, isLoading = false }) {
  const { label, color } = getTrustLabel(score);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div 
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <motion.div 
        className="relative h-32 w-32"
        animate={{ scale: isLoading ? [1, 1.02, 1] : 1 }}
        transition={{ repeat: isLoading ? Infinity : 0, duration: 1.5 }}
      >
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="45" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted/30" />
          <motion.circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            strokeWidth="4"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: isLoading ? circumference : strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className={`bg-gradient-to-r ${color} stroke-current`}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="text-3xl font-bold text-foreground">{isLoading ? '-' : score}</div>
            <div className="text-xs font-medium text-muted-foreground">out of 100</div>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <motion.div 
          className={`text-lg font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 3, delay: 0.7 }}
        >
          {label}
        </motion.div>
        <p className="mt-1 text-sm text-muted-foreground">Confidence based on AI analysis</p>
      </motion.div>
    </motion.div>
  );
}
