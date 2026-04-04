import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/theme-toggle'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/analyze', label: 'Analyze' },
  { to: '/history', label: 'History' },
  { to: '/about', label: 'About' },
]

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-primary/10 bg-gradient-to-r from-background via-background to-primary/5 supports-[backdrop-filter]:bg-background/60 dark:border-primary/40 dark:bg-gradient-to-r">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <img
                src="/RUMERA -AI LOGO.jpeg"
                alt="RUMERA Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              RUMERA AI
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <motion.div
              className="flex items-center gap-2 rounded-full border border-foreground/10 bg-background/60 px-4 py-2 shadow-[0_10px_25px_-15px_rgba(15,23,42,0.6)] backdrop-blur dark:border-foreground/20 dark:shadow-[0_10px_25px_-15px_rgba(2,6,23,0.7)]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25 }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-full px-4 py-1 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground dark:text-foreground/60 dark:hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
