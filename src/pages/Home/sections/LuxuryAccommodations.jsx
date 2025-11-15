import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Maximize, Bed, ArrowRight } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import styles from './LuxuryAccommodations.module.css';

const LuxuryAccommodations = () => {
  const navigate = useNavigate();
  const { rooms } = useApp();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Get first 3 rooms or use sample data
  const featuredRooms = rooms?.slice(0, 3) || [
    {
      id: 1,
      name: 'Deluxe Suite',
      description: 'Elegant retreat with refined comfort and sophisticated amenities',
      price: 250,
      originalPrice: 300,
      discount: 17,
      guests: 2,
      size: '45m²',
      bedType: 'King Bed',
      featured: false
    },
    {
      id: 2,
      name: 'Executive Suite',
      description: 'Spacious suite with separate living area and premium furnishings',
      price: 350,
      guests: 2,
      size: '60m²',
      bedType: 'King Bed',
      featured: true
    },
    {
      id: 3,
      name: 'Presidential Suite',
      description: 'Ultimate luxury with panoramic views and exclusive services',
      price: 450,
      guests: 4,
      size: '120m²',
      bedType: '2 King Beds',
      isNew: true
    }
  ];

  return (
    <section className={styles.accommodationsSection} ref={ref}>
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
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            LUXURY ACCOMMODATIONS
          </motion.p>

          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Curated Spaces for Discerning Guests
          </motion.h2>

          <motion.p
            className={styles.sectionDescription}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Each suite is a masterpiece of design, blending timeless elegance with
            modern comfort for an unforgettable stay
          </motion.p>
        </motion.div>

        {/* Rooms Grid */}
        <motion.div
          className={styles.roomsGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {featuredRooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className={styles.viewAllContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.button
            className={styles.viewAllButton}
            onClick={() => navigate('/rooms')}
            whileHover={{ scale: 1.05, backgroundColor: '#A57865', color: '#FFFFFF' }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore All Suites & Rooms</span>
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

// Room Card Component
const RoomCard = ({ room, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className={styles.roomCard}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.2
          }
        }
      }}
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/rooms/${room.id}`)}
    >
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <div className={`${styles.roomImage} ${styles[`gradient${index + 1}`]}`} />

        {/* Badges */}
        {room.discount && (
          <motion.div
            className={styles.discountBadge}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
          >
            <span className={styles.discountPercent}>{room.discount}%</span>
            <span className={styles.discountText}>OFF</span>
          </motion.div>
        )}

        {room.featured && (
          <motion.div
            className={styles.featuredBadge}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.2 }}
          >
            Featured
          </motion.div>
        )}

        {room.isNew && (
          <motion.div
            className={styles.newBadge}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.2 }}
          >
            New
          </motion.div>
        )}

        {/* Hover Overlay */}
        <motion.div
          className={styles.hoverOverlay}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <span>View Details</span>
        </motion.div>
      </div>

      {/* Card Content */}
      <div className={styles.cardContent}>
        <h3 className={styles.roomName}>{room.name}</h3>
        <p className={styles.roomDescription}>{room.description}</p>

        <div className={styles.divider} />

        {/* Room Features */}
        <div className={styles.roomFeatures}>
          <div className={styles.feature}>
            <Users size={14} strokeWidth={2} />
            <span>{room.guests} Guests</span>
          </div>
          <div className={styles.feature}>
            <Maximize size={14} strokeWidth={2} />
            <span>{room.size}</span>
          </div>
          <div className={styles.feature}>
            <Bed size={14} strokeWidth={2} />
            <span>{room.bedType}</span>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Pricing */}
        <div className={styles.pricingRow}>
          <div className={styles.priceContainer}>
            {room.originalPrice && (
              <span className={styles.originalPrice}>${room.originalPrice}</span>
            )}
            <div className={styles.currentPrice}>
              <span className={styles.currency}>$</span>
              <span className={styles.price}>{room.price}</span>
            </div>
            <span className={styles.perNight}>/night</span>
          </div>
        </div>

        {/* View Button */}
        <motion.button
          className={styles.viewButton}
          whileHover={{
            backgroundColor: '#A57865',
            color: '#FFFFFF',
            borderColor: '#A57865'
          }}
          whileTap={{ scale: 0.95 }}
        >
          View Suite
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LuxuryAccommodations;
