import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import { Search, Calendar, Users, ChevronDown, Sparkles } from 'lucide-react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const { currentUser, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  const [searchData, setSearchData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2
  });

  const handleSearch = () => {
    if (searchData.checkIn && searchData.checkOut) {
      navigate('/rooms', { state: searchData });
    }
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className={styles.heroSection}>
      {/* Animated Background Gradient */}
      <motion.div
        className={styles.gradientBackground}
        animate={{
          background: [
            'linear-gradient(135deg, #A57865 0%, #8B6450 100%)',
            'linear-gradient(135deg, #8B6450 0%, #A57865 100%)',
            'linear-gradient(135deg, #A57865 0%, #8B6450 100%)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Mesh Gradient Overlay */}
      <div className={styles.meshGradient} />

      {/* Floating Particles */}
      <div className={styles.particlesContainer}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        className={styles.heroContent}
        style={{ y: y1, opacity }}
      >
        {/* Premium Badge */}
        <motion.div
          className={styles.premiumBadge}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Sparkles size={16} />
          <span>Luxury Redefined</span>
        </motion.div>

        {/* Main Title with Letter Animation */}
        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {isAuthenticated ? (
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Welcome back,
              <br />
              <span className={styles.nameHighlight}>
                {currentUser?.firstName}
              </span>
              <motion.span
                className={styles.emoji}
                animate={{ rotate: [0, 14, -8, 14, 0] }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                🎉
              </motion.span>
            </motion.span>
          ) : (
            <motion.span
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.03
                  }
                }
              }}
            >
              {'Experience Luxury'.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              <br />
              {'Redefined'.split('').map((char, index) => (
                <motion.span
                  key={index + 100}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  style={{ display: 'inline-block' }}
                  className={styles.goldText}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.span>
          )}
        </motion.h1>

        {/* Subtitle with Shimmer Effect */}
        <motion.p
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {isAuthenticated ? (
            <>Your next adventure awaits</>
          ) : (
            <>Where every moment becomes an unforgettable memory</>
          )}
        </motion.p>

        {/* Glassmorphism Search Widget */}
        <motion.div
          className={styles.searchWidget}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
        >
          <div className={styles.searchGrid}>
            {/* Check-in */}
            <motion.div
              className={styles.searchField}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className={styles.fieldIcon} size={20} />
              <div className={styles.fieldContent}>
                <label>Check-in</label>
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                />
              </div>
            </motion.div>

            {/* Check-out */}
            <motion.div
              className={styles.searchField}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className={styles.fieldIcon} size={20} />
              <div className={styles.fieldContent}>
                <label>Check-out</label>
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                />
              </div>
            </motion.div>

            {/* Guests */}
            <motion.div
              className={styles.searchField}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Users className={styles.fieldIcon} size={20} />
              <div className={styles.fieldContent}>
                <label>Guests</label>
                <select
                  value={searchData.guests}
                  onChange={(e) => setSearchData({ ...searchData, guests: parseInt(e.target.value) })}
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Search Button with Gradient Animation */}
            <motion.button
              className={styles.searchButton}
              onClick={handleSearch}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(165, 120, 101, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={styles.buttonGradient}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <Search size={20} />
              <span>Search</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll Indicator with Bounce */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={scrollToContent}
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown size={32} strokeWidth={1.5} />
          </motion.div>
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
