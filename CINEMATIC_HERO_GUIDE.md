# Cinematic Hotel Hero Section - Complete Guide

## 🎬 Overview

This guide covers the transformation of your hero section from a gradient background to a **cinematic hotel promo video background** while maintaining all existing UI rules and typography.

---

## 🎨 Visual Transformation

### Layer Architecture (z-index hierarchy)

```
┌─────────────────────────────────────────────┐
│  Hero Content (z: 3)                        │
│  ├─ Title (fade-in: 0.5s)                   │
│  ├─ Subtitle (fade-in: 0.7s)                │
│  └─ Booking Widget (fade-in: 0.9s)          │
├─────────────────────────────────────────────┤
│  Warm Vignette Layer (z: 2)                 │
│  └─ Light rays pseudo-element               │
├─────────────────────────────────────────────┤
│  Dark Radial Overlay (z: 1)                 │
│  └─ Center to edge gradient                 │
├─────────────────────────────────────────────┤
│  Video Background (z: 0)                    │
│  └─ Cinematic hotel footage                 │
└─────────────────────────────────────────────┘
```

---

## 📹 Video Specifications

### Recommended Video Content

**Option 1: Luxury Lobby**
- Slow camera dolly through grand hotel lobby
- Chandelier movement, subtle lighting
- Duration: 15-30 seconds (loops seamlessly)
- Focus: Architecture, lighting, warmth

**Option 2: Pool Shimmer**
- Infinity pool with water reflections
- Sunset/golden hour lighting
- Slow parallax movement
- Duration: 20-40 seconds
- Focus: Luxury, relaxation, water movement

**Option 3: Sunset Exterior**
- Hotel facade at golden hour
- Slow panning or static with natural light changes
- Duration: 30-60 seconds
- Focus: Grandeur, architecture, natural beauty

**Option 4: Mixed Montage**
- 3-4 clips: lobby → pool → room → exterior
- Each 5-10 seconds
- Smooth transitions
- Total: 30-40 seconds

### Technical Video Requirements

```
Format:           MP4 (H.264) + WebM (VP9 fallback)
Resolution:       1920x1080 minimum (4K preferred: 3840x2160)
Aspect Ratio:     16:9
Frame Rate:       24fps or 30fps
Bitrate:          5-8 Mbps (balance quality/file size)
File Size:        3-10 MB (compressed for web)
Duration:         15-60 seconds
Audio:            None (muted for autoplay)
Orientation:      Landscape
Color Grading:    Warm tones (browns, golds, ambers)
                  Avoid cool/blue tones
Motion:           Slow, cinematic (dolly, pan, or static)
                  Avoid quick movements
Lighting:         Natural, warm, soft
                  Golden hour preferred
Loop Point:       Seamless transition from end to start
```

### File Naming & Structure

```
public/
  ├── videos/
  │   ├── hotel-promo.mp4       (Primary H.264 video)
  │   └── hotel-promo.webm      (WebM fallback)
  └── hero-poster.jpg           (Fallback still image)
```

### Video Compression Tips

**Using FFmpeg:**
```bash
# Convert to optimized MP4
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset slow \
  -vf "scale=1920:1080" -an hotel-promo.mp4

# Convert to WebM
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 0 \
  -vf "scale=1920:1080" -an hotel-promo.webm

# Create poster image (frame at 3 seconds)
ffmpeg -i hotel-promo.mp4 -ss 00:00:03 -vframes 1 hero-poster.jpg
```

**Online Tools:**
- [HandBrake](https://handbrake.fr/) - Free video compression
- [Cloudinary](https://cloudinary.com/) - Video optimization service
- [Vimeo](https://vimeo.com/) - Can host + deliver optimized video

---

## 🎭 Overlay Design

### Primary Overlay: Dark Radial Gradient

**Purpose:** Ensures text readability over dynamic video

**CSS Implementation:**
```css
.heroVideoOverlay {
  background: radial-gradient(
    ellipse at center,
    rgba(26, 20, 16, 0.3) 0%,      /* Center: lighter (30% opacity) */
    rgba(26, 20, 16, 0.5) 40%,     /* Mid: medium (50% opacity) */
    rgba(26, 20, 16, 0.7) 70%,     /* Outer: darker (70% opacity) */
    rgba(20, 15, 12, 0.85) 100%    /* Edge: darkest (85% opacity) */
  );
}
```

**Color Breakdown:**
- `rgb(26, 20, 16)` = Dark warm brown (#1A1410)
- `rgb(20, 15, 12)` = Darker warm brown (#140F0C)
- Gradual opacity increase from center to edges
- Creates spotlight effect on content area

**Result:**
- ✅ Center area visible (video shows through)
- ✅ Edges heavily darkened (creates focus)
- ✅ Text highly readable against any video content
- ✅ Warm brown tones match hospitality brand

### Secondary Overlay: Warm Vignette

**Purpose:** Premium edge darkening with warm hospitality tones

**CSS Implementation:**
```css
.heroVignette {
  background: radial-gradient(
    ellipse at center,
    transparent 0%,                 /* Center: fully transparent */
    transparent 30%,                /* Inner: still transparent */
    rgba(44, 28, 20, 0.4) 60%,     /* Mid: warm brown (40%) */
    rgba(30, 20, 15, 0.7) 100%     /* Outer: darker brown (70%) */
  );
}
```

**Color Breakdown:**
- `rgb(44, 28, 20)` = Warm brown with red undertones
- `rgb(30, 20, 15)` = Deep warm brown
- Creates cinematic vignette effect
- Adds warmth and premium feel

**Additional Layer: Light Rays**
```css
.heroVignette::after {
  background: radial-gradient(
    ellipse at top,
    rgba(255, 255, 255, 0.05) 0%, /* Subtle white light from top */
    transparent 40%
  );
}
```

**Result:**
- ✅ Soft top-down lighting effect
- ✅ Adds depth and dimension
- ✅ Mimics natural light behavior
- ✅ Enhances premium atmosphere

---

## 🔮 Enhanced Glassmorphism Widget

### Booking Widget Transformation

**Before (Gradient Background):**
- Background: `rgba(255, 255, 255, 0.98)` (98% opaque white)
- Blur: `blur(20px)`
- Shadow: 5 layers

**After (Video Background):**
- Background: `rgba(255, 255, 255, 0.12)` (12% opaque white - much more transparent!)
- Blur: `blur(40px)` (double the blur for stronger glass effect)
- Saturation: `saturate(200%)`
- Shadow: 5 enhanced layers with deeper blacks

### Why More Transparency?

With a video background, the widget needs to:
1. **Show video through glass** - Creates dynamic, living surface
2. **Maintain readability** - Heavy blur compensates for transparency
3. **Feel premium** - True glassmorphism (not fake white card)
4. **Stand out** - Strong shadows create elevation

### Shadow System

**5-Layer Shadow Stack:**
```css
box-shadow:
  0 4px 12px rgba(0, 0, 0, 0.15),    /* Contact shadow */
  0 12px 40px rgba(0, 0, 0, 0.25),   /* Mid elevation */
  0 24px 80px rgba(0, 0, 0, 0.3),    /* Far ambient shadow */
  0 0 0 1px rgba(255, 255, 255, 0.2) inset,  /* Inner stroke */
  0 2px 4px rgba(255, 255, 255, 0.15) inset; /* Top highlight */
```

**Result:**
- Widget appears to float 80px above video
- Inner glow creates glass-like edge
- Dark shadows create depth against dark video overlay

### Glow Halo Effect

**Enhanced for Video:**
```css
.bookingWidget::after {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25),      /* Bright white glow */
    rgba(165, 120, 101, 0.2),       /* Warm brand color glow */
    rgba(255, 255, 255, 0.15)       /* Soft white glow */
  );
  filter: blur(12px);               /* Soft diffusion */
  opacity: 0.7;                     /* Visible but subtle */
}
```

**Result:**
- Soft glow surrounds widget like backlighting
- Warm brand color integrates with hotel aesthetic
- Creates separation from dark video background

---

## 🎬 Animation Choreography

### Entrance Sequence

**Timeline:**
```
0.0s  ━━━━━━━━━━━━━━━━━━━━  Video: instant (dark brown fallback)
0.3s  ┏━━━━━━━━━━━━━━━━━━┓  Video: fade in (1.5s duration)
0.5s     ┏━━━━━━━━━━━━━━┓   Title: fade + slide (1s duration)
0.7s        ┏━━━━━━━━━━━┓  Subtitle: fade + slide (1s duration)
0.9s           ┏━━━━━━━━━━━━┓ Widget: fade + slide (1s duration)
      ══════════════════════════
      0    0.5    1.0   1.5   1.9s
```

### Why These Timings?

1. **Video fade (0.3s delay, 1.5s duration):**
   - Dark fallback shows instantly (no flash of white)
   - Video fades in smoothly over fallback
   - Long duration prevents jarring appearance
   - User sees content loading progressively

2. **Title (0.5s delay):**
   - Appears after video is partially visible
   - 1s fade-up feels cinematic and deliberate
   - Slower than typical for premium feel

3. **Subtitle (0.7s delay):**
   - 0.2s after title (natural reading flow)
   - Same 1s duration for consistency

4. **Widget (0.9s delay):**
   - Final element to appear (hero reveal)
   - Largest delay creates anticipation
   - 1s duration matches other elements

**Total Sequence:** 1.9 seconds from page load to full reveal

### Continuous Animations

**Widget Floating:**
```css
@keyframes floatWidget {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
animation: floatWidget 6s ease-in-out infinite;
```

**Why 6 seconds?**
- Slower than typical (4s) for cinematic feel
- Matches video's slow, deliberate pacing
- Creates gentle, breathing motion
- 12px vertical movement (increased from 8px) for visibility

**Video Loop:**
- Seamlessly loops from end to start
- No animation needed (native video behavior)
- Creates living, dynamic background

---

## 🎯 Framer Motion Enhancements

### Installation

```bash
npm install framer-motion
```

### Enhanced HeroSection with Framer Motion

```tsx
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BookingWidget from './BookingWidget';
import styles from './Home.module.css';

interface HeroSectionProps {
  isAuthenticated: boolean;
  userName?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  isAuthenticated,
  userName = 'Guest',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax effect on scroll
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    },
  };

  const widgetVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    },
  };

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      {/* Video with parallax */}
      <motion.video
        ref={videoRef}
        className={styles.heroVideo}
        style={{ y }}
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-poster.jpg"
      >
        <source src="/videos/hotel-promo.mp4" type="video/mp4" />
        <source src="/videos/hotel-promo.webm" type="video/webm" />
      </motion.video>

      {/* Overlays */}
      <div className={styles.heroVideoOverlay} />
      <div className={styles.heroVignette} />

      {/* Content with fade on scroll */}
      <motion.div
        className={styles.heroContent}
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {!isAuthenticated ? (
          <>
            <motion.h1
              className={styles.heroTitle}
              variants={titleVariants}
            >
              Experience Luxury Like Never Before
            </motion.h1>
            <motion.p
              className={styles.heroSubtitle}
              variants={subtitleVariants}
            >
              Discover comfort and elegance at Glimmora Hotel
            </motion.p>
          </>
        ) : (
          <>
            <motion.h1
              className={styles.heroTitle}
              variants={titleVariants}
            >
              Welcome back, {userName}! 🎉
            </motion.h1>
            <motion.p
              className={styles.heroSubtitle}
              variants={subtitleVariants}
            >
              Ready for your next adventure?
            </motion.p>
          </>
        )}

        <motion.div variants={widgetVariants}>
          <BookingWidget />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
```

### Motion Features Explained

**1. Parallax Video Background**
```tsx
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 500], [0, -100]);
```
- As user scrolls down (0-500px), video moves up (-100px)
- Creates depth and separation from content
- Cinematic parallax effect common in luxury sites

**2. Content Fade on Scroll**
```tsx
const opacity = useTransform(scrollY, [0, 300], [1, 0]);
```
- Content fades out as user scrolls
- Reveals next section smoothly
- Prevents content overlap

**3. Staggered Children**
```tsx
staggerChildren: 0.2,
delayChildren: 0.5,
```
- Each child (title, subtitle, widget) appears 0.2s apart
- All delayed by 0.5s after page load
- Creates orchestrated reveal

**4. Custom Easing**
```tsx
ease: [0.6, 0.01, 0.05, 0.95]
```
- Cubic bezier for cinematic motion
- Fast start, slow end (decelerating)
- Professional, high-end feel

---

## 🎨 Color Palette & Mood

### Overlay Colors (RGB Breakdown)

**Primary Overlay:**
- `rgb(26, 20, 16)` = `#1A1410` - Warm dark brown
  - Red: 26 (slightly warm)
  - Green: 20 (brown undertone)
  - Blue: 16 (least, keeps warmth)

**Secondary Overlay:**
- `rgb(44, 28, 20)` = `#2C1C14` - Rich chocolate brown
  - Red: 44 (stronger red for warmth)
  - Green: 28
  - Blue: 20 (warm, not cool)

**Darkest Edges:**
- `rgb(20, 15, 12)` = `#140F0C` - Deep espresso brown
  - Nearly black but maintains warmth
  - Avoids harsh #000000 black

### Why These Colors?

**Hospitality Psychology:**
- Browns = Warmth, comfort, earth, stability
- Avoids cold blacks and blues
- Creates inviting, welcoming atmosphere
- Matches luxury hotel interiors (wood, leather, warm lighting)

**Visual Hierarchy:**
- Lighter center = Focus on content
- Darker edges = Frame the scene, like cinema letterboxing
- Creates natural eye movement toward center

---

## 📐 Spacing & Layout Preservation

### Unchanged (Exact Preservation)

✅ **Widget:**
- Width: `1000px`
- Padding: `32px`
- Gap: `16px`
- Border-radius: `16px`

✅ **Typography:**
- Title font-size: `56px`
- Title font-weight: `700`
- Title line-height: `68px`
- Title margin: `0 0 16px 0`
- Subtitle font-size: `18px`
- Subtitle line-height: `28px`
- Subtitle margin: `0 0 48px 0`

✅ **Section:**
- Height: `600px`
- Max-width: `1000px`
- Content padding: `0 48px`

✅ **All Other Spacing:**
- Input heights: `56px`
- Button dimensions: `120px × 56px`
- Label margins: `0 0 8px 0`
- Field gaps: maintained

### Only Visual Changes

✅ **Background:** Gradient → Video + overlays
✅ **Widget opacity:** 98% → 12% (stronger glass)
✅ **Widget blur:** 20px → 40px (enhanced effect)
✅ **Shadows:** Enhanced depth for video context
✅ **Animations:** Slower, more cinematic timing
✅ **Text shadows:** Stronger for video readability

---

## 🎬 Implementation Checklist

### 1. Video Preparation
- [ ] Source luxury hotel footage (lobby/pool/exterior)
- [ ] Edit to 15-60 seconds with seamless loop
- [ ] Color grade with warm tones (browns, golds)
- [ ] Export as MP4 (H.264) at 1080p minimum
- [ ] Export as WebM (VP9) for fallback
- [ ] Compress to 3-10 MB file size
- [ ] Create poster image (JPG) from key frame
- [ ] Test loop point for smoothness

### 2. File Setup
- [ ] Create `/public/videos/` directory
- [ ] Add `hotel-promo.mp4` to videos folder
- [ ] Add `hotel-promo.webm` to videos folder
- [ ] Add `hero-poster.jpg` to public root
- [ ] Verify file paths in code

### 3. Code Implementation
- [ ] Replace `HeroSection.tsx` with enhanced version
- [ ] Update `Home.module.css` with video styles
- [ ] Test video autoplay in all browsers
- [ ] Verify fallback poster displays while loading
- [ ] Test on mobile (video should work on iOS/Android)

### 4. Performance Testing
- [ ] Check page load time (video shouldn't block render)
- [ ] Verify video loads after critical content
- [ ] Test on slow 3G connection
- [ ] Ensure fallback works if video fails
- [ ] Check memory usage (video shouldn't leak)

### 5. Accessibility
- [ ] Add alt text to poster image
- [ ] Ensure text remains readable over video
- [ ] Test keyboard navigation (video doesn't interfere)
- [ ] Verify reduced-motion preferences respected

### 6. Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & iOS)
- [ ] Firefox
- [ ] Edge
- [ ] Test autoplay policies (all should work with muted)

---

## 🎯 Design Principles Applied

### 1. **Cinematic Storytelling**
- Video creates immediate emotional connection
- Slow motion, deliberate pacing
- Hotel comes alive, not static
- User feels transported to location

### 2. **Luxury Through Restraint**
- Not overwhelming or flashy
- Subtle, sophisticated motion
- Premium materials (glass, blur, shadows)
- Quality over quantity

### 3. **Warm Hospitality**
- Brown color palette (not cold grays/blacks)
- Inviting, welcoming atmosphere
- Natural lighting aesthetic
- Comfortable, not clinical

### 4. **Technical Excellence**
- Seamless loops (no jarring cuts)
- Smooth animations (60fps)
- Progressive enhancement (fallbacks work)
- Performance optimized (fast loading)

### 5. **Visual Hierarchy Through Layering**
- Video = background context
- Overlays = readability + mood
- Widget = hero focal point
- Text = primary message
- No hierarchy change via typography (forbidden)

---

## 🚀 Optional Enhancements

### 1. Multiple Video Sources by Time of Day

```tsx
const getVideoByTime = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'hotel-morning.mp4';
  if (hour >= 12 && hour < 17) return 'hotel-afternoon.mp4';
  if (hour >= 17 && hour < 21) return 'hotel-evening.mp4';
  return 'hotel-night.mp4';
};
```

### 2. Video Playback Speed Control

```tsx
// Slow-mo for premium feel
videoRef.current.playbackRate = 0.7;
```

### 3. Video Quality Adaptation

```tsx
const isMobile = window.innerWidth < 768;
const videoSrc = isMobile
  ? '/videos/hotel-promo-mobile.mp4'  // Lower res for mobile
  : '/videos/hotel-promo-desktop.mp4'; // 4K for desktop
```

### 4. Intersection Observer for Performance

```tsx
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        videoRef.current?.play();
      } else {
        videoRef.current?.pause();
      }
    });
  });

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
}, []);
```

---

## 📊 Performance Metrics

### Target Goals

- **Page Load (LCP):** < 2.5s
- **Video Starts Playing:** < 3s
- **First Contentful Paint:** < 1.5s
- **Cumulative Layout Shift:** 0 (video doesn't cause reflow)

### Optimization Strategies

1. **Lazy Load Video:**
   - Don't load video until hero is in viewport
   - Saves bandwidth on slow connections

2. **Poster Image:**
   - Shows instantly while video loads
   - Matches video's first frame
   - Prevents flash of unstyled content

3. **Preload Hint:**
   ```html
   <link rel="preload" href="/videos/hotel-promo.mp4" as="video" type="video/mp4">
   ```

4. **CDN Delivery:**
   - Host video on CDN (Cloudflare, AWS CloudFront)
   - Faster delivery worldwide
   - Automatic format conversion

---

## 🎬 Final Result

### User Experience Flow

1. **Page loads** → Dark brown background appears (instant)
2. **0.3s** → Video fades in over brown (1.5s fade)
3. **0.5s** → Title slides up with glow (1s animation)
4. **0.7s** → Subtitle follows (1s animation)
5. **0.9s** → Widget floats in (1s animation)
6. **1.9s** → Full scene revealed
7. **Continuous** → Video loops, widget floats gently
8. **User scrolls** → Video parallaxes, content fades
9. **User hovers widget** → Glass shimmers, fields lift
10. **User books** → Smooth transition to next step

### Emotional Response

- **Initial:** "Wow, this is cinematic"
- **5 seconds:** "This feels premium and alive"
- **15 seconds:** "I want to stay here"
- **Interaction:** "This is so smooth and polished"
- **Booking:** "This brand clearly cares about quality"

---

## ✅ Summary of Changes

### What Changed

**Background:**
- ❌ Gradient with floating orbs
- ✅ Cinematic hotel video with overlays

**Overlays:**
- ✅ Dark radial gradient (30-85% opacity)
- ✅ Warm vignette (brown tones)
- ✅ Light rays from top

**Widget:**
- ❌ 98% opaque white
- ✅ 12% transparent glass
- ✅ 40px blur (doubled)
- ✅ Enhanced shadows (deeper, darker)
- ✅ Stronger glow halo

**Animations:**
- ✅ Slower, more deliberate (1s vs 0.8s)
- ✅ Video fade-in (1.5s)
- ✅ Widget float increased (12px vs 8px, 6s vs 4s)
- ✅ Staggered entrance (0.5s, 0.7s, 0.9s)

**Text:**
- ✅ Stronger shadows (for video readability)
- ✅ Enhanced glow (50px vs 40px)
- ✅ 5-layer shadows instead of 4

### What Stayed Same

✅ All text content (word-for-word)
✅ All font sizes and weights
✅ All line-heights and letter-spacing
✅ All spacing values (margins, paddings, gaps)
✅ All border radius values
✅ Component structure and layout
✅ Form functionality

---

## 🎯 Result

A **cinematic, luxury hotel hero section** that:
- Feels alive and dynamic (video background)
- Maintains perfect readability (dual overlay system)
- Creates premium atmosphere (warm brown vignette)
- Showcases brand quality (high-end glassmorphism)
- Loads performantly (optimized video delivery)
- Works everywhere (fallbacks for all scenarios)

**The hero now matches the promise:**
**"Experience Luxury Like Never Before"** 🌟
