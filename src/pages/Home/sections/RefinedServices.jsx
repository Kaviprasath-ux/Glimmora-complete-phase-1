import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Wifi,
  UtensilsCrossed,
  Waves,
  Sparkles,
  Dumbbell,
  CarFront,
  Wine,
  Snowflake
} from 'lucide-react';
import styles from './RefinedServices.module.css';

const RefinedServices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Complimentary fiber-optic internet throughout the property',
      color: '#4A90E2'
    },
    {
      icon: UtensilsCrossed,
      title: 'Fine Dining',
      description: 'Michelin-starred restaurant with world-class cuisine',
      color: '#E74C3C'
    },
    {
      icon: Waves,
      title: 'Infinity Pool',
      description: 'Rooftop pool with panoramic city views',
      color: '#3498DB'
    },
    {
      icon: Sparkles,
      title: 'Luxury Spa',
      description: 'Award-winning wellness center and treatments',
      color: '#D4AF37'
    },
    {
      icon: Dumbbell,
      title: 'Fitness Center',
      description: 'State-of-the-art equipment and personal trainers',
      color: '#27AE60'
    },
    {
      icon: CarFront,
      title: 'Valet Service',
      description: 'Premium parking and concierge assistance',
      color: '#8E44AD'
    },
    {
      icon: Wine,
      title: 'Executive Lounge',
      description: 'Private club with curated wine selection',
      color: '#C0392B'
    },
    {
      icon: Snowflake,
      title: 'Climate Control',
      description: 'Personalized temperature and air quality settings',
      color: '#1ABC9C'
    }
  ];

  return (
    <section className={styles.servicesSection} ref={ref}>
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
            REFINED SERVICES
          </motion.p>

          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Unparalleled Amenities & Experiences
          </motion.h2>

          <motion.p
            className={styles.sectionDescription}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Every detail thoughtfully designed to exceed expectations and create
            unforgettable moments
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className={styles.servicesGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4
              }
            }
          }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Service Card Component
const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;

  return (
    <motion.div
      className={styles.serviceCard}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      {/* Icon Container with Gradient Background */}
      <motion.div
        className={styles.iconContainer}
        style={{ '--service-color': service.color }}
        whileHover={{ rotate: 360, scale: 1.15 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
      >
        <Icon size={32} strokeWidth={1.5} />
      </motion.div>

      {/* Service Content */}
      <div className={styles.serviceContent}>
        <h3 className={styles.serviceTitle}>{service.title}</h3>
        <p className={styles.serviceDescription}>{service.description}</p>
      </div>

      {/* Hover Indicator */}
      <motion.div
        className={styles.hoverIndicator}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Background Glow Effect */}
      <motion.div
        className={styles.glowEffect}
        style={{ '--service-color': service.color }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default RefinedServices;
