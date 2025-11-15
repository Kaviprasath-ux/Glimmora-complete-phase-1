import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import styles from './SignatureExperience.module.css';

const SignatureExperience = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    'Established 2009',
    'Historic Architecture',
    'Michelin-Star Dining',
    'Personalized Butler Service',
    'Private Art Collection',
    'Award-Winning Spa'
  ];

  return (
    <section className={styles.experienceSection} ref={ref}>
      <div className={styles.experienceContainer}>
        {/* Left Side - Image Gallery */}
        <motion.div
          className={styles.imageGallery}
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Main Image */}
          <motion.div
            className={styles.mainImage}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.imageGradient1} />
            <motion.div
              className={styles.imageOverlay}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* Secondary Images Grid */}
          <div className={styles.secondaryImages}>
            <motion.div
              className={styles.smallImage}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.imageGradient2} />
            </motion.div>
            <motion.div
              className={styles.smallImage}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.imageGradient3} />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          className={styles.contentArea}
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Section Badge */}
          <motion.div
            className={styles.sectionBadge}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className={styles.goldLine} />
            <span>OUR SIGNATURE EXPERIENCE</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Timeless Elegance
            <br />
            Refined Service
          </motion.h2>

          {/* Description */}
          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            At Glimmora, we believe luxury is in the details. Every element of
            your stay is thoughtfully curated to create moments of pure
            indulgence and comfort.
          </motion.p>

          {/* Features List */}
          <motion.div
            className={styles.featuresList}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 1
                }
              }
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={styles.featureItem}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Check size={20} className={styles.checkIcon} />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className={styles.ctaButton}
            onClick={() => navigate('/about')}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Discover Our Story</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SignatureExperience;
