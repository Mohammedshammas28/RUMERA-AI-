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
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-32 w-32">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="45" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted" />
          <motion.circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            strokeWidth="3"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: isLoading ? circumference : strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className={`bg-gradient-to-r ${color} stroke-current`}
            style={{
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
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
      </div>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <div className={`text-lg font-semibold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
          {label}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Confidence based on AI analysis</p>
      </motion.div>
    </div>
  );
}
