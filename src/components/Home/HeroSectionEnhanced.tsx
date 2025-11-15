import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    // Ensure video plays on mount (some browsers require this)
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* Cinematic Video Background */}
      <video
        ref={videoRef}
        className={styles.heroVideo}
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-poster.jpg" // Fallback image while loading
      >
        <source src="/videos/hotel-promo.mp4" type="video/mp4" />
        <source src="/videos/hotel-promo.webm" type="video/webm" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Premium Radial Gradient Overlay - Dark center to darker edges */}
      <div className={styles.heroVideoOverlay} />

      {/* Warm Vignette Layer */}
      <div className={styles.heroVignette} />

      {/* Content Layer */}
      <div className={styles.heroContent}>
        {!isAuthenticated ? (
          <>
            <h1 className={styles.heroTitle}>
              Experience Luxury Like Never Before
            </h1>
            <p className={styles.heroSubtitle}>
              Discover comfort and elegance at Glimmora Hotel
            </p>
          </>
        ) : (
          <>
            <h1 className={styles.heroTitle}>
              Welcome back, {userName}! 🎉
            </h1>
            <p className={styles.heroSubtitle}>
              Ready for your next adventure?
            </p>
          </>
        )}

        {/* Enhanced Glassmorphism Booking Widget */}
        <BookingWidget />
      </div>
    </section>
  );
};

export default HeroSection;
