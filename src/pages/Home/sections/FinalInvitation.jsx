import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Award, Shield, Sparkles } from 'lucide-react';
import styles from './FinalInvitation.module.css';

const FinalInvitation = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const trustBadges = [
    {
      icon: Award,
      text: 'Award Winner 2024'
    },
    {
      icon: Shield,
      text: 'Secure Booking'
    },
    {
      icon: Sparkles,
      text: 'Best Price Guarantee'
    }
  ];

  return (
    <section className={styles.invitationSection} ref={ref}>
      {/* Gradient Background */}
      <div className={styles.gradientBackground} />

      {/* Floating Particles */}
      <div className={styles.particlesContainer}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
            animate={{
              y: [0, -40 - Math.random() * 20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Mesh Gradient Overlay */}
      <div className={styles.meshOverlay} />

      <div className={styles.sectionContainer}>
        {/* Content */}
        <motion.div
          className={styles.contentWrapper}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1 }}
        >
          {/* Badge */}
          <motion.div
            className={styles.premiumBadge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Sparkles size={14} />
            <span>LIMITED AVAILABILITY</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className={styles.invitationTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Begin Your Journey to
            <br />
            <span className={styles.goldText}>Exceptional Luxury</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className={styles.invitationDescription}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Experience the pinnacle of hospitality. Book your exclusive stay and discover
            why discerning travelers choose Glimmora for unforgettable moments.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className={styles.ctaContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.button
              className={styles.primaryButton}
              onClick={() => navigate('/rooms')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar size={20} strokeWidth={2} />
              <span>Reserve Your Suite</span>
              <motion.div
                className={styles.buttonGlow}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.button>

            <motion.button
              className={styles.secondaryButton}
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Contact Concierge</span>
            </motion.button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className={styles.trustBadges}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 1.1
                }
              }
            }}
          >
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.trustBadge}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={18} strokeWidth={2} />
                  <span>{badge.text}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalInvitation;
