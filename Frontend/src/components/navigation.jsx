import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export function Navigation() {
  return (
    <nav className="border-b border-primary/10 bg-gradient-to-r from-background via-background to-primary/5 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
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
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">RUMERA</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            {[{ to: '/', label: 'Home' }, { to: '/analyze', label: 'Analyze' }, { to: '/history', label: 'History' }, { to: '/about', label: 'About' }].map((link) => (
              <motion.div key={link.to} whileHover={{ y: -2 }}>
                <Link to={link.to} className="hidden sm:inline text-sm font-medium text-foreground/70 hover:text-foreground transition-colors relative group">
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
