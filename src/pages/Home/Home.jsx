import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import Navigation from '../../components/Home/Navigation';
import Footer from '../../components/Home/Footer';
import HeroSection from './sections/HeroSection';
import SignatureExperience from './sections/SignatureExperience';
import LuxuryAccommodations from './sections/LuxuryAccommodations';
import PrestigeNumbers from './sections/PrestigeNumbers';
import RefinedServices from './sections/RefinedServices';
import GuestVoices from './sections/GuestVoices';
import FinalInvitation from './sections/FinalInvitation';
import styles from './Home.module.css';

const Home = () => {
  const { isAuthenticated, currentUser } = useApp();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const user = currentUser || {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@glimmora.com'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.homePage}>
      {/* Scroll Progress Bar */}
      <motion.div
        className={styles.progressBar}
        style={{ scaleX }}
      />

      {/* Navigation */}
      <Navigation
        isAuthenticated={isAuthenticated}
        user={user}
        activeTab="home"
      />

      {/* Floating Background Elements */}
      <div className={styles.floatingElements}>
        <motion.div
          className={styles.floatingCircle1}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className={styles.floatingCircle2}
          animate={{
            y: [0, 40, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <HeroSection />
        <SignatureExperience />
        <LuxuryAccommodations />
        <PrestigeNumbers />
        <RefinedServices />
        <GuestVoices />
        <FinalInvitation />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
