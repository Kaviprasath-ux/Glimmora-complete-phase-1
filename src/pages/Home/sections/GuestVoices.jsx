import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './GuestVoices.module.css';

const GuestVoices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      location: 'New York, USA',
      avatar: 'SM',
      rating: 5,
      text: 'Absolutely breathtaking experience. From the moment we arrived, every detail was perfection. The staff anticipated our every need, and the suite was beyond luxurious. We will definitely return.',
      date: 'December 2024'
    },
    {
      id: 2,
      name: 'James & Emily Chen',
      location: 'Singapore',
      avatar: 'JC',
      rating: 5,
      text: 'Our honeymoon at Glimmora exceeded all expectations. The personalized butler service, the exquisite dining, and the stunning architecture created memories we will treasure forever.',
      date: 'November 2024'
    },
    {
      id: 3,
      name: 'David Armstrong',
      location: 'London, UK',
      avatar: 'DA',
      rating: 5,
      text: 'Having stayed at luxury hotels worldwide, Glimmora stands in a league of its own. The attention to detail, the historic elegance combined with modern amenities - simply outstanding.',
      date: 'October 2024'
    },
    {
      id: 4,
      name: 'Isabella Rodriguez',
      location: 'Barcelona, Spain',
      avatar: 'IR',
      rating: 5,
      text: 'The spa treatments and infinity pool with panoramic views were incredible. The Michelin-starred restaurant delivered an unforgettable culinary journey. Pure luxury at its finest.',
      date: 'September 2024'
    },
    {
      id: 5,
      name: 'Michael & Jennifer Park',
      location: 'Seoul, South Korea',
      avatar: 'MP',
      rating: 5,
      text: 'Celebrating our anniversary here was magical. The Presidential Suite was palatial, the service impeccable, and every moment felt special. Glimmora truly understands luxury hospitality.',
      date: 'August 2024'
    }
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      zIndex: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
      zIndex: 0
    })
  };

  return (
    <section className={styles.voicesSection} ref={ref}>
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
            GUEST VOICES
          </motion.p>

          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Stories from Our Distinguished Guests
          </motion.h2>

          <motion.p
            className={styles.sectionDescription}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Discover why discerning travelers from around the world choose Glimmora
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div className={styles.carouselContainer}>
          {/* Navigation Arrows */}
          <motion.button
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            onClick={handlePrev}
            whileHover={{ scale: 1.1, backgroundColor: '#A57865' }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.8 }}
          >
            <ChevronLeft size={28} />
          </motion.button>

          <motion.button
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={handleNext}
            whileHover={{ scale: 1.1, backgroundColor: '#A57865' }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.8 }}
          >
            <ChevronRight size={28} />
          </motion.button>

          {/* Testimonials Carousel */}
          <div className={styles.carouselWrapper}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  rotateY: { duration: 0.6 }
                }}
                className={styles.testimonialCard}
              >
                {/* Quote Icon */}
                <div className={styles.quoteIcon}>
                  <Quote size={48} />
                </div>

                {/* Star Rating */}
                <div className={styles.ratingContainer}>
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Star
                        size={20}
                        fill="#D4AF37"
                        color="#D4AF37"
                        strokeWidth={0}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className={styles.testimonialText}>
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Guest Info */}
                <div className={styles.guestInfo}>
                  <div className={styles.avatarContainer}>
                    <div className={styles.avatar}>
                      {testimonials[currentIndex].avatar}
                    </div>
                  </div>
                  <div className={styles.guestDetails}>
                    <h4 className={styles.guestName}>
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className={styles.guestLocation}>
                      {testimonials[currentIndex].location}
                    </p>
                    <p className={styles.visitDate}>
                      {testimonials[currentIndex].date}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <motion.div
            className={styles.dotsContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1 }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.dotActive : ''
                }`}
                onClick={() => handleDotClick(index)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className={styles.dotInner} />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GuestVoices;
