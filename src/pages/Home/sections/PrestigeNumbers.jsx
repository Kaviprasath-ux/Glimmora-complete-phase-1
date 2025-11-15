import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Users, Building2, Calendar, Star } from 'lucide-react';
import styles from './PrestigeNumbers.module.css';

// Animated Counter Hook
const useAnimatedCounter = (target, isInView, duration = 2) => {
  const [count, setCount] = useState(0);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 50,
    damping: 30,
    duration: duration * 1000
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setCount(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return count;
};

const PrestigeNumbers = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    {
      icon: Users,
      value: 10000,
      suffix: '+',
      label: 'Guests Hosted',
      description: 'Since 2009',
      delay: 0
    },
    {
      icon: Building2,
      value: 150,
      suffix: '+',
      label: 'Luxury Suites',
      description: 'Premium Rooms',
      delay: 0.2
    },
    {
      icon: Calendar,
      value: 15,
      suffix: '+',
      label: 'Years Excellence',
      description: 'Award Winning',
      delay: 0.4
    },
    {
      icon: Star,
      value: 4.9,
      suffix: '',
      label: 'Guest Rating',
      description: 'Outstanding',
      decimal: true,
      delay: 0.6
    }
  ];

  return (
    <section className={styles.prestigeSection} ref={ref}>
      {/* Gradient Overlay */}
      <div className={styles.gradientOverlay} />

      {/* Floating Particles */}
      <div className={styles.particlesContainer}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className={styles.sectionContainer}>
        {/* Section Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.goldLine} />

          <motion.p
            className={styles.sectionLabel}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            OUR PRESTIGE IN NUMBERS
          </motion.p>

          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Excellence Measured by Experience
          </motion.h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className={styles.statsGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.4
              }
            }
          }}
        >
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Individual Stat Card Component
const StatCard = ({ stat, isInView }) => {
  const Icon = stat.icon;
  const count = useAnimatedCounter(stat.value, isInView, 2.5);
  const displayValue = stat.decimal
    ? (count / 10).toFixed(1)
    : count.toLocaleString();

  return (
    <motion.div
      className={styles.statCard}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      }}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      {/* Icon Container */}
      <motion.div
        className={styles.iconContainer}
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{
          delay: stat.delay + 0.3,
          duration: 0.8,
          type: "spring",
          stiffness: 200
        }}
      >
        <Icon size={32} strokeWidth={1.5} />
      </motion.div>

      {/* Counter */}
      <div className={styles.counterContainer}>
        <motion.div
          className={styles.counterValue}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: stat.delay + 0.5, duration: 0.6 }}
        >
          <span className={styles.number}>{displayValue}</span>
          {stat.suffix && <span className={styles.suffix}>{stat.suffix}</span>}
        </motion.div>
      </div>

      {/* Labels */}
      <motion.h3
        className={styles.statLabel}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: stat.delay + 0.7, duration: 0.6 }}
      >
        {stat.label}
      </motion.h3>

      <motion.p
        className={styles.statDescription}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: stat.delay + 0.9, duration: 0.6 }}
      >
        {stat.description}
      </motion.p>

      {/* Divider Line */}
      <motion.div
        className={styles.statDivider}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: stat.delay + 0.6, duration: 0.8 }}
      />
    </motion.div>
  );
};

export default PrestigeNumbers;
