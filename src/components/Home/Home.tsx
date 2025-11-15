import React from 'react';
import {
  Waves,
  Utensils,
  Sparkles,
  Car,
  Wifi,
  Dumbbell,
  Coffee,
  Shield,
  Building2,
  ClipboardCheck,
  MessageCircle,
} from 'lucide-react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import RoomCard from './RoomCard';
import AmenityCard from './AmenityCard';
import Footer from './Footer';
import ChatBubble from './ChatBubble';
import styles from './Home.module.css';

interface HomeProps {
  isAuthenticated?: boolean;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

const Home: React.FC<HomeProps> = ({ isAuthenticated = false, user }) => {
  const userName = user?.firstName || 'Guest';
  const userEmail = user?.email || 'user@glimmora.com';
  const userInitials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : 'G';

  // Sample room data
  const rooms = [
    {
      name: 'Deluxe Suite',
      description: 'Spacious suite with modern amenities and stunning city views',
      guests: '2 Guests',
      bed: 'King Bed',
      size: '45m²',
      price: '250',
    },
    {
      name: 'Ocean View Room',
      description: 'Breathtaking ocean views with private balcony and luxury furnishings',
      guests: '2 Guests',
      bed: 'Queen Bed',
      size: '38m²',
      price: '200',
    },
    {
      name: 'Presidential Suite',
      description: 'Ultimate luxury with separate living area and premium facilities',
      guests: '4 Guests',
      bed: '2 King Beds',
      size: '85m²',
      price: '450',
    },
  ];

  // Sample amenity data
  const amenities = [
    {
      icon: Waves,
      title: 'Swimming Pool',
      description: 'Relax in our heated outdoor pool',
    },
    {
      icon: Utensils,
      title: 'Restaurant & Bar',
      description: 'Fine dining experience with international cuisine',
    },
    {
      icon: Sparkles,
      title: 'Spa & Wellness',
      description: 'Pamper yourself with luxury treatments',
    },
    {
      icon: Car,
      title: 'Free Parking',
      description: 'Secure parking for all guests',
    },
    {
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Complimentary fast internet access',
    },
    {
      icon: Dumbbell,
      title: 'Fitness Center',
      description: 'State-of-the-art gym equipment',
    },
    {
      icon: Coffee,
      title: '24/7 Room Service',
      description: 'Order anytime, day or night',
    },
    {
      icon: Shield,
      title: 'Concierge Service',
      description: 'Personal assistance for all your needs',
    },
  ];

  const handleSignOut = () => {
    console.log('User signed out');
    // TODO: Implement actual sign out logic
    // Clear auth token, redirect to home, etc.
  };

  const handleViewAllRooms = () => {
    window.location.href = '/rooms';
  };

  const handleBookNow = () => {
    window.location.href = '/rooms';
  };

  return (
    <div className={styles.homeContainer}>
      {/* Navigation */}
      <Navigation
        isAuthenticated={isAuthenticated}
        userName={userName}
        userEmail={userEmail}
        userInitials={userInitials}
        notificationCount={isAuthenticated ? 3 : 0}
        activeTab="home"
        onSignOut={handleSignOut}
      />

      {/* Hero Section */}
      <HeroSection isAuthenticated={isAuthenticated} userName={userName} />

      {/* Quick Actions Section - For Logged-in Users Only */}
      {isAuthenticated && (
        <section className={styles.quickActionsSection}>
          <div className={styles.quickActionsContainer}>
            <h2 className={styles.quickActionsTitle}>Quick Actions</h2>
            <div className={styles.quickActionsGrid}>
              <a href="/rooms" className={styles.actionCard}>
                <Building2 size={32} strokeWidth={1.5} />
                <h3>Book a Room</h3>
                <p>Find and book your perfect stay</p>
              </a>

              <a href="/pre-check-in" className={styles.actionCard}>
                <ClipboardCheck size={32} strokeWidth={1.5} />
                <h3>Pre Check-in</h3>
                <p>Complete online check-in</p>
              </a>

              <a href="/services" className={styles.actionCard}>
                <Sparkles size={32} strokeWidth={1.5} />
                <h3>Services</h3>
                <p>Explore hotel amenities</p>
              </a>

              <a href="/contact" className={styles.actionCard}>
                <MessageCircle size={32} strokeWidth={1.5} />
                <h3>Contact Us</h3>
                <p>Get help and support</p>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Featured Rooms Section */}
      <section className={styles.featuredRoomsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Luxury Rooms</h2>
          <p className={styles.sectionDescription}>
            Choose from our collection of beautifully designed rooms
          </p>
        </div>

        <div className={styles.roomsGrid}>
          {rooms.map((room, index) => (
            <RoomCard key={index} {...room} />
          ))}
        </div>

        <button className={styles.viewAllButton} onClick={handleViewAllRooms}>
          View All Rooms
        </button>
      </section>

      {/* Amenities Section */}
      <section className={styles.amenitiesSection}>
        <h2 className={styles.sectionTitle}>World-Class Amenities</h2>

        <div className={styles.amenitiesGrid}>
          {amenities.map((amenity, index) => (
            <AmenityCard key={index} {...amenity} />
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Experience Glimmora?</h2>
        <p className={styles.ctaSubtitle}>
          Book your stay today and enjoy exclusive benefits
        </p>
        <button className={styles.ctaButton} onClick={handleBookNow}>
          Book Now
        </button>
      </section>

      {/* Footer */}
      <Footer />

      {/* AI Chat Bubble */}
      <ChatBubble hasUnreadMessages={isAuthenticated} />
    </div>
  );
};

export default Home;
