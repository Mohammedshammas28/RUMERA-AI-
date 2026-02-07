# RUMERA-AI Animations & Styling List

## 🎨 Global Styling Applied

### Background Gradients
- **Primary background**: `bg-gradient-to-br from-background via-background to-primary/5`
- **Section backgrounds**: Gradient transitions between sections (`from-primary/5 via-card/30 to-background`)
- **Border accents**: `border-primary/10`, `border-primary/20`, `border-primary/30`
- **Decorative blurs**: `blur-3xl` rounded full elements with `opacity-10` for depth

### Gradient Text Effects
- **Headings**: `bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`
- Applied to: "Truth", "RUMERA", "Leaders", "Why RUMERA", "Trust Score System", "Verify"
- Creates premium, eye-catching visual hierarchy

### Card Styling (Global Pattern)
```
Card className="p-6|p-8 border border-primary/20 bg-gradient-to-br from-card via-card to-card/50 
hover:border-primary/50 transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20"
```
- Gradient background cards
- Primary color borders that glow on hover
- Drop shadows with color tint
- Smooth transitions on interaction

---

## 📄 HOME PAGE (page.jsx) - Detailed Animations

### 1. **Hero Section**
- **Badge**: Slides in with icon and text (opacity fade, scale)
- **Heading**: Fade + slide down (`initial={{ opacity: 0, y: -20 }}` → `animate={{ opacity: 1, y: 0 }}`)
- **Description**: Follows heading with 0.2s delay
- **Buttons**: Staggered entry with 0.2s delay, parent div has fade effect
- **CTA Button**: `whileHover={{ scale: 1.05 }}` + `whileTap={{ scale: 0.98 }}`

### 2. **Trust Indicators Section (3-card grid)**
- **Section background**: Gradient with top/bottom borders
- **Heading**: `whileInView={{ opacity: 1, y: 0 }}` + `viewport={{ once: true }}`
- **Cards**: Staggered reveal using container/item variants
  - Initial: `opacity: 0, y: 20`
  - Animate: Spring physics (`type: 'spring', stiffness: 100`)
  - Delay: Staggered by 0.1s between cards

- **Hover Effects**:
  - `whileHover={{ y: -4, scale: 1.02 }}`
  - Border color transition
  - Shadow enhancement with primary color glow
  
- **Floating Icons**: 
  - `animate={{ y: [0, -3, 0] }}`
  - `transition={{ repeat: Infinity, duration: 3, delay: i * 0.3 }}`
  - Creates gentle bouncing effect

### 3. **Features Section (4-card grid with rotating icons)**
- **Heading**: Gradient text + fade-in on view
- **Cards**: Container/item staggered animation (0.1s + 0.3s delay)
  
- **Card Interactions**:
  - `whileHover={{ y: -4, scale: 1.02 }}`
  - Spring physics: `stiffness: 300`
  - Enhanced shadows on hover
  - Border glow transition

- **Icon Animation** (UNIQUE):
  - `animate={{ rotate: [0, 5, 0] }}`
  - `transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}`
  - 5° rotation loop with staggered timing
  
- **Icon Hover Scale**:
  - `group-hover:scale-125` on icon itself
  - Smooth transition when card is hovered

- **Badge**: Primary/10 background with padding and rounded corners

### 4. **Trust Score Explanation (3-card gradient display)**
- **Heading**: Fade-in on view with gradient text
- **Cards**: Staggered via container/item pattern
  
- **Score Numbers**: 
  - `bg-gradient-to-r` applied to score display
  - Color-coded: Emerald (75+), Amber (50-74), Rose (0-49)
  
- **Hover Effect**:
  - `whileHover={{ y: -4 }}`
  - Shadow enhancement
  - Spring stiffness: 300

### 5. **CTA Section (Call-to-Action)**
- **Container**: 
  - `initial={{ opacity: 0, y: 20, scale: 0.95 }}`
  - `whileInView={{ opacity: 1, y: 0, scale: 1 }}`
  - Spring physics with delay
  - Gradient background + border glow
  - Large shadow with primary tint

- **Text Elements**: Staggered opacity with delays (0.2s, 0.3s)
  
- **Button**:
  - `whileHover={{ scale: 1.05 }}`
  - `whileTap={{ scale: 0.98 }}`
  - Gradient background (`from-primary to-primary/80`)
  - Hover shadow with primary color glow

---

## 📋 ANALYZE PAGE (app/analyze/page.jsx) - Animations

### 1. **Page-Level Wrapper**
- `motion.div` with fade-in on mount
- `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}`
- Duration: 0.5s for smooth page transition

### 2. **Hero Section**
- **Heading**: Fade + slide down (same pattern as home)
- **Gradient Text**: "Analyze Content"
- **Description**: Fade with delay

### 3. **Tab Navigation (4-button grid)**
- **Container**: Fade + slide up with 0.2s delay
- **Each Tab Button**:
  - `whileHover={{ y: -4, scale: 1.02 }}`
  - `whileTap={{ scale: 0.98 }}`
  - Gradient background when active
  - Icon rotates on hover
  - Smooth color transitions
  - Border glow on active state

- **Active Tab Styling**: 
  - `bg-gradient-to-r from-primary/20 to-accent/20`
  - `border-primary/50`
  - Text gradient color

### 4. **Content Area**
- Tab content switches without animation
- Analyzers (text, image, video, audio) embedded

---

## 📝 TEXT ANALYZER (components/text-analyzer.jsx)

### Animations
- **Container**: `motion.div` wrapper
- **Textarea**: Gradient border styling with focus effects
- **Analyze Button**: 
  - Primary gradient background
  - `whileHover={{ scale: 1.05 }}`
  - `whileTap={{ scale: 0.95 }}`

### Styling
- Gradient input borders with smooth transitions
- Card wrapper with shadow effects
- Loading state with spinner animation (built-in)

---

## 🖼️ IMAGE ANALYZER (components/image-analyzer.jsx)

### Animations
- **Upload Card**: Bouncing icon effect
  - `animate={{ y: [0, -10, 0] }}`
  - `transition={{ repeat: Infinity, duration: 2 }}`
  - Icon bobs up and down continuously

- **Button Hover**: Scale and color transition
  - `whileHover={{ scale: 1.05 }}`
  - `whileTap={{ scale: 0.95 }}`

### Styling
- Dashed border card with gradient background
- Hover shadow enhancement
- Gradient button with icon

---

## 🎬 VIDEO ANALYZER (components/video-analyzer.jsx)

### Animations
- **Upload Section**: 
  - Icon bounces: `y: [0, -5, 0]`
  - Continuous loop with Infinity repeat
  - Duration: 2-3 seconds

- **Button Interactions**:
  - `whileHover={{ scale: 1.05 }}`
  - `whileTap={{ scale: 0.95 }}`

### Styling
- Card with gradient background
- Hover shadow glow
- Smooth transitions on all interactions

---

## 🎵 AUDIO ANALYZER (components/audio-analyzer.jsx)

### Animations
- **Upload Icon**: Floating animation
  - `animate={{ y: [0, -5, 0] }}`
  - Repeat: Infinity
  - Duration: 2 seconds

- **Container**: `motion.div` wrapper for smooth transitions

### Styling
- Gradient bordered card
- Icon scaling on hover
- Hover shadow enhancement

---

## 📊 TRUST SCORE (components/trust-score.jsx)

### Animations
- **Circular Progress**: SVG stroke animation
  - Animates from 0% to score percentage
  - Duration: 1.5 seconds
  - Smooth easing

- **Glow Effect**: 
  - `drop-shadow-[0_0_8px_var(--color)]`
  - Color matches trust level
  - Creates breathing effect during loading

- **Container Scale**: 
  - Slight scale animation for loading state
  - `animate={{ scale: [0.95, 1.05] }}`

### Styling
- Gradient text based on score range
- Color-coded: Green (trusted), Amber (suspicious), Red (high risk)
- SVG circle with dynamic stroke

---

## 🏠 HISTORY PAGE (app/history/page.jsx) - Animations

### 1. **Hero Section**
- **Heading**: Fade + slide down
- **Description**: Follows with delay
- **Decorative background**: Accent blur element

### 2. **Controls Section (Filter Buttons)**
- **All Buttons**:
  - `whileHover={{ scale: 1.05 }}`
  - `whileTap={{ scale: 0.95 }}`
  - Color transition on active state
  
- **Active Filter**: 
  - Gradient background
  - Primary border glow
  - Bold text

### 3. **History Cards**
- **Container**: Staggered animation on view
- **Each Card**:
  - Initial: Fade + slide up
  - Animate: Full opacity + no transform
  - Delay: Staggered by index
  - Duration: 0.4-0.5s with easing

- **Card Hover**:
  - `whileHover={{ y: -4, scale: 1.02 }}`
  - Shadow enhancement
  - Border color transition
  
- **Trust Score Badge**:
  - Gradient background based on score range
  - Icon color matches trust level
  
- **Action Buttons** (Download, Delete):
  - `whileHover={{ scale: 1.1 }}`
  - `whileTap={{ scale: 0.95 }}`
  - Icon color transition

### 4. **Delete Confirmation Modal**
- Fade-in animation
- Button transitions
- Close on escape or confirmation

---

## 📚 ABOUT PAGE (app/about/page.jsx) - Animations

### 1. **Hero Section**
- **Heading**: Fade-in on view
- **Gradient Text**: "RUMERA", "Mission", "Matters"
- **Description**: Slide up + fade

### 2. **Mission Statement Cards**
- **Container**: Grid with gap
- **Each Card**:
  - Fade-in on view
  - Slide up from bottom
  - Staggered timing

### 3. **Model Cards (Technology Stack)**
- **Recent Enhancement - Matching Home Page Style**:
  - Container: `motion.div` with variant animation
  - Individual Cards:
    - `whileHover={{ y: -4, scale: 1.02 }}`
    - Spring physics: `stiffness: 300`
    - Enhanced shadow on hover
    - Border glow transition
    - Gradient background card
  
  - **Badge Animation**:
    - `whileHover={{ scale: 1.05 }}`
    - Color transition on hover
  
  - **Staggered Reveal**: 
    - Cards animate in with container/item pattern
    - Delay: 0.1s between each

### 4. **Commitments Section**
- **List Items**:
  - `initial={{ opacity: 0, x: -10 }}`
  - `whileInView={{ opacity: 1, x: 0 }}`
  - Transition: Staggered by index (0.05s delay)
  - Slight slide from left to right

### 5. **FAQ Section**
- **Accordion Items**: Click to expand
- **Smooth height transitions**
- **Arrow icon rotation on expand**

---

## 🧭 NAVIGATION (components/navigation.jsx) - Animations

### 1. **Logo Section**
- **Logo Image**: 
  - `whileHover={{ rotate: 5, scale: 1.05 }}`
  - Spring animation on hover
  
- **Logo Text**: 
  - Gradient text: `from-primary to-accent`
  - Smooth color transition

### 2. **Nav Links**
- **Link Wrapper**: `motion.div` hover animation
  - `whileHover={{ color: 'primary' }}`
  - Underline slides in from left
  
- **Active Link**: Primary color with underline

### 3. **Mobile Menu** (if present)
- Slide-in animation
- Backdrop fade effect
- Close button with hover state

---

## 🎬 Animation Variants (Reusable Patterns)

### Container Variant
```javascript
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
```
**Usage**: Wraps grid containers for staggered child animations

### Item Variant
```javascript
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
```
**Usage**: Applied to individual cards/items within container

---

## 🎨 Common Hover Patterns

### Card Hover (Most Cards)
```
whileHover={{ y: -4, scale: 1.02 }}
transition={{ type: 'spring', stiffness: 300 }}
```
- Lifts 4px
- Slightly scales up
- Spring physics for bouncy feel

### Button Hover
```
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.98 }}
```
- Scales up 5% on hover
- Scales down 2% on click for tactile feedback

### Icon Hover (Feature Cards)
```
group-hover:scale-125
transition-transform
animate={{ rotate: [0, 5, 0] }} // Continuous rotation
```
- Continuous 5° rotation loop
- Scales up on card hover
- Smooth transitions

---

## 🌈 Color & Gradient Patterns

### Primary Accent Gradient
`from-primary to-accent`
- Used in: Headings, buttons, text highlights

### Card Gradient
`from-card via-card to-card/50`
- Subtle darkening for depth

### Trust Score Gradients
- **Trusted (75+)**: `from-emerald-500 to-teal-600`
- **Suspicious (50-74)**: `from-amber-500 to-orange-600`
- **High Risk (0-49)**: `from-rose-500 to-red-600`

### Shadow Glow
`shadow-primary/20` or `shadow-accent/20`
- Creates color-tinted shadows on hover

---

## ✨ Summary

**Total Pages Enhanced**: 6 (Home, Analyze, History, About, Login, Signup)

**Animation Techniques Used**:
- ✅ Framer Motion container/item staggering
- ✅ Spring physics transitions
- ✅ Infinite loops (bouncing, rotating icons)
- ✅ Scroll-triggered animations (whileInView)
- ✅ Hover effects with scale/translate
- ✅ Tap feedback animations
- ✅ SVG stroke animations
- ✅ Gradient text overlays

**Total Animated Elements**: 40+ across the application

**Performance**: All animations use GPU-accelerated transforms (transform, opacity) for smooth 60fps experience
