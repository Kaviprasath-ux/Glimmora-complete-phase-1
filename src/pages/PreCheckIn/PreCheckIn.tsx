import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Navigation from '../../components/Home/Navigation';
import Footer from '../../components/Home/Footer';
import BookingListView from '../../components/PreCheckIn/BookingListView';
import LookupFormView from '../../components/PreCheckIn/LookupFormView';
import PreCheckInForm from '../../components/PreCheckIn/PreCheckInForm';
import SuccessView from '../../components/PreCheckIn/SuccessView';
import styles from './PreCheckIn.module.css';

interface PreCheckInProps {
  isAuthenticated: boolean;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface Booking {
  id: string;
  confirmationNumber: string;
  roomName: string;
  roomImage?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights?: number;
  guestName?: string;
  email?: string;
  phone?: string;
  availableUntil?: string;
}

const PreCheckIn: React.FC<PreCheckInProps> = ({ isAuthenticated, user }) => {
  const { logout } = useApp();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  // State management
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [preCheckInCompleted, setPreCheckInCompleted] = useState(false);

  // Sample eligible bookings for logged-in users
  const eligibleBookings: Booking[] = isAuthenticated
    ? [
        {
          id: '1',
          confirmationNumber: 'GLM123456',
          roomName: 'Deluxe Ocean View Suite',
          roomImage: '/path/to/image.jpg',
          checkIn: '2025-11-20',
          checkOut: '2025-11-23',
          guests: 2,
          availableUntil: 'Nov 19, 2:00 PM',
        },
        {
          id: '2',
          confirmationNumber: 'GLM789012',
          roomName: 'Premium City View Room',
          roomImage: '/path/to/image.jpg',
          checkIn: '2025-11-25',
          checkOut: '2025-11-27',
          guests: 2,
          availableUntil: 'Nov 24, 2:00 PM',
        },
      ]
    : [];

  // Handle booking selection (from booking list)
  const handleSelectBooking = (booking: Booking) => {
    // Add additional booking details
    const fullBooking = {
      ...booking,
      nights: 3,
      guestName: user ? `${user.firstName} ${user.lastName}` : 'John Doe',
      email: user?.email || 'john.doe@glimmora.com',
      phone: '+971 50 123 4567',
    };
    setSelectedBooking(fullBooking);
  };

  // Handle booking found (from lookup)
  const handleBookingFound = (booking: any) => {
    const fullBooking = {
      ...booking,
      nights: 3,
      guestName: booking.guestName || 'John Doe',
      email: booking.email,
      phone: booking.phone || '+971 50 123 4567',
    };
    setSelectedBooking(fullBooking);
  };

  // Handle pre check-in completion
  const handleComplete = () => {
    setPreCheckInCompleted(true);
  };

  // Determine which view to render
  const renderView = () => {
    // Priority 1: Success view (if completed)
    if (preCheckInCompleted && selectedBooking) {
      return <SuccessView booking={selectedBooking} />;
    }

    // Priority 2: Form view (if booking selected/found)
    if (selectedBooking) {
      return <PreCheckInForm booking={selectedBooking} onComplete={handleComplete} />;
    }

    // Priority 3: Logged-in user view
    if (isAuthenticated && user) {
      return (
        <BookingListView
          userName={user.firstName}
          bookings={eligibleBookings}
          onSelectBooking={handleSelectBooking}
        />
      );
    }

    // Priority 4: Non-logged user view (default)
    return <LookupFormView onBookingFound={handleBookingFound} />;
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Navigation */}
      <Navigation
        isAuthenticated={isAuthenticated}
        userName={user ? `${user.firstName} ${user.lastName}` : undefined}
        userEmail={user?.email}
        userInitials={user ? `${user.firstName[0]}${user.lastName[0]}` : undefined}
        activeTab="pre-checkin"
        onSignOut={handleSignOut}
      />

      {/* Breadcrumb */}
      <div className={styles.breadcrumbContainer}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbLink}>Home</span>
          <ChevronRight size={16} strokeWidth={2} />
          <span className={styles.breadcrumbCurrent}>Pre Check-in</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Pre Check-in</h1>
          <p className={styles.heroSubtitle}>
            Skip the front desk and check-in online
            <br />
            Available 24 hours before your arrival
          </p>
        </div>
      </section>

      {/* Main Content - Dynamic Views */}
      <main className={styles.mainContent}>{renderView()}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PreCheckIn;
