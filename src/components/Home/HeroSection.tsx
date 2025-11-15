import React from 'react';
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
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroOverlay} />
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

        {/* Booking Widget - Same for both logged and unlogged */}
        <BookingWidget />
      </div>
    </section>
  );
};

export default HeroSection;
