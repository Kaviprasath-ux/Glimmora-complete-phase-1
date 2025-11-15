import React, { useEffect } from 'react';
import {
  Check,
  Star,
  Calendar,
  Users,
  Moon,
  Mail,
  Download,
  Phone,
  Home,
  Plus,
  Bell,
  XCircle,
} from 'lucide-react';
import Navigation from '../../Home/Navigation';
import Footer from '../../Home/Footer';
import ProgressStepper from '../Shared/ProgressStepper';
import InfoCard from './InfoCard';
import styles from './Confirmation.module.css';

interface ConfirmationProps {
  isAuthenticated: boolean;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const Confirmation: React.FC<ConfirmationProps> = ({ isAuthenticated, user }) => {
  // Generate confirmation number (GLM + 6 random digits)
  const generateConfirmationNumber = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `GLM${randomDigits}`;
  };

  // Generate transaction ID (TXN + timestamp)
  const generateTransactionId = () => {
    const timestamp = Date.now();
    return `TXN${timestamp}`;
  };

  // Sample booking data (would come from payment page in real app)
  const bookingData = {
    confirmationNumber: generateConfirmationNumber(),
    transactionId: generateTransactionId(),
    guestInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@glimmora.com',
      phone: '+971 50 123 4567',
      country: 'United Arab Emirates',
    },
    roomData: {
      name: 'Deluxe Ocean View Suite',
      rating: 4.8,
      reviewCount: 124,
    },
    bookingDates: {
      checkIn: new Date('2025-11-20'),
      checkOut: new Date('2025-11-23'),
      nights: 3,
    },
    guests: 2,
    pricing: {
      roomPrice: 299,
      nights: 3,
      roomTotal: 897,
      serviceFee: 45,
      taxes: 155,
      additionalOptions: {
        breakfast: 90,
        airportPickup: 50,
        lateCheckOut: 30,
      },
      total: 1267,
    },
    paymentMethod: 'Credit Card',
    cancellationDeadline: new Date('2025-11-19T14:00:00'),
    preCheckInAvailable: new Date('2025-11-19T00:00:00'),
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatCancellationDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const handleDownloadReceipt = () => {
    // Simulate PDF download
    alert('Receipt downloaded! (PDF generation will be implemented)');
  };

  const handleViewBooking = () => {
    // Navigate to bookings page
    console.log('Navigate to /bookings or /dashboard');
  };

  const handleBackToHome = () => {
    // Navigate to home
    console.log('Navigate to /');
  };

  const handleBookAnother = () => {
    // Navigate to rooms
    console.log('Navigate to /rooms');
  };

  // Save booking to account if logged in
  useEffect(() => {
    if (isAuthenticated && bookingData) {
      // In real app: saveBookingToAccount(bookingData);
      console.log('Booking saved to account:', bookingData);
    }
  }, [isAuthenticated]);

  // Calculate if pre check-in is available
  const isPreCheckInAvailable = new Date() >= bookingData.preCheckInAvailable;

  return (
    <div className={styles.pageWrapper}>
      {/* Navigation */}
      <Navigation
        isAuthenticated={isAuthenticated}
        userName={user ? `${user.firstName} ${user.lastName}` : undefined}
        userEmail={user?.email}
        userInitials={user ? `${user.firstName[0]}${user.lastName[0]}` : undefined}
        activeTab="booking"
      />

      {/* Progress Stepper - All Steps Completed */}
      <div className={styles.progressContainer}>
        <ProgressStepper currentStep={3} />
      </div>

      {/* Success Message Section */}
      <div className={styles.successSection}>
        <div className={styles.successIconContainer}>
          <Check size={40} strokeWidth={3} />
        </div>
        <h1 className={styles.successTitle}>Booking Confirmed! 🎉</h1>
        <p className={styles.successSubtitle}>Thank you for choosing Glimmora Hotel</p>
        <div className={styles.confirmationNumber}>
          Confirmation Number: {bookingData.confirmationNumber}
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.gridLayout}>
            {/* Left Column - Booking Details */}
            <div className={styles.leftColumn}>
              {/* Booking Details Card */}
              <div className={styles.card}>
                <h2 className={styles.sectionHeader}>Booking Details</h2>

                {/* Room Image */}
                <div className={styles.roomImage} />

                {/* Room Name */}
                <h3 className={styles.roomName}>{bookingData.roomData.name}</h3>

                {/* Rating */}
                <div className={styles.rating}>
                  <Star size={14} fill="#FFB800" strokeWidth={0} />
                  <span className={styles.ratingText}>{bookingData.roomData.rating}</span>
                  <span className={styles.reviewCount}>
                    ({bookingData.roomData.reviewCount} reviews)
                  </span>
                </div>

                {/* Booking Information */}
                <h4 className={styles.subsectionHeader}>Booking Information:</h4>
                <div className={styles.infoRows}>
                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>
                      <Calendar size={16} strokeWidth={2} />
                      <span>Check-in</span>
                    </div>
                    <div className={styles.infoValue}>
                      {formatDate(bookingData.bookingDates.checkIn)}
                    </div>
                  </div>

                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>
                      <Calendar size={16} strokeWidth={2} />
                      <span>Check-out</span>
                    </div>
                    <div className={styles.infoValue}>
                      {formatDate(bookingData.bookingDates.checkOut)}
                    </div>
                  </div>

                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>
                      <Users size={16} strokeWidth={2} />
                      <span>Guests</span>
                    </div>
                    <div className={styles.infoValue}>{bookingData.guests} Guests</div>
                  </div>

                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>
                      <Moon size={16} strokeWidth={2} />
                      <span>Nights</span>
                    </div>
                    <div className={styles.infoValue}>{bookingData.bookingDates.nights} Nights</div>
                  </div>
                </div>

                {/* Guest Information */}
                <h4 className={styles.subsectionHeader}>Guest Information:</h4>
                <div className={styles.infoRows}>
                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>
                      <span>Name</span>
                    </div>
                    <div className={styles.infoValue}>
                      {bookingData.guestInfo.firstName} {bookingData.guestInfo.lastName}
                    </div>
                  </div>

                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>
                      <span>Email</span>
                    </div>
                    <div className={styles.infoValue}>{bookingData.guestInfo.email}</div>
                  </div>

                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>
                      <span>Phone</span>
                    </div>
                    <div className={styles.infoValue}>{bookingData.guestInfo.phone}</div>
                  </div>

                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>
                      <span>Country</span>
                    </div>
                    <div className={styles.infoValue}>{bookingData.guestInfo.country}</div>
                  </div>
                </div>
              </div>

              {/* Payment Summary Card */}
              <div className={styles.card}>
                <h2 className={styles.sectionHeader}>Payment Summary</h2>

                {/* Price Breakdown */}
                <div className={styles.priceRows}>
                  <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>
                      Room Total - ${bookingData.pricing.roomPrice} × {bookingData.pricing.nights}{' '}
                      nights
                    </span>
                    <span className={styles.priceValue}>${bookingData.pricing.roomTotal}</span>
                  </div>

                  <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>Service fee</span>
                    <span className={styles.priceValue}>${bookingData.pricing.serviceFee}</span>
                  </div>

                  <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>Taxes (15%)</span>
                    <span className={styles.priceValue}>${bookingData.pricing.taxes}</span>
                  </div>

                  {bookingData.pricing.additionalOptions.breakfast && (
                    <div className={styles.priceRow}>
                      <span className={styles.priceLabel}>Breakfast</span>
                      <span className={styles.priceValue}>
                        ${bookingData.pricing.additionalOptions.breakfast}
                      </span>
                    </div>
                  )}

                  {bookingData.pricing.additionalOptions.airportPickup && (
                    <div className={styles.priceRow}>
                      <span className={styles.priceLabel}>Airport Pickup</span>
                      <span className={styles.priceValue}>
                        ${bookingData.pricing.additionalOptions.airportPickup}
                      </span>
                    </div>
                  )}

                  {bookingData.pricing.additionalOptions.lateCheckOut && (
                    <div className={styles.priceRow}>
                      <span className={styles.priceLabel}>Late Check-out</span>
                      <span className={styles.priceValue}>
                        ${bookingData.pricing.additionalOptions.lateCheckOut}
                      </span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className={styles.divider} />

                {/* Total */}
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Total Paid</span>
                  <span className={styles.totalValue}>${bookingData.pricing.total}</span>
                </div>

                {/* Payment Info */}
                <div className={styles.paymentInfo}>
                  <div className={styles.paymentRow}>
                    <span className={styles.paymentLabel}>Payment Method</span>
                    <span className={styles.paymentValue}>{bookingData.paymentMethod}</span>
                  </div>

                  <div className={styles.paymentRow}>
                    <span className={styles.paymentLabel}>Transaction ID</span>
                    <span className={styles.transactionId}>{bookingData.transactionId}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions */}
            <aside className={styles.rightColumn}>
              <div className={styles.quickActionsCard}>
                {/* What's Next Section */}
                <h3 className={styles.quickActionsHeader}>What's Next?</h3>

                {/* Email Confirmation Notice */}
                <div className={styles.emailNotice}>
                  <Mail size={20} strokeWidth={2} />
                  <span className={styles.emailText}>
                    Confirmation email sent to {bookingData.guestInfo.email}
                  </span>
                </div>

                {/* Download Receipt Button */}
                <button className={styles.downloadButton} onClick={handleDownloadReceipt}>
                  <Download size={18} strokeWidth={2} />
                  Download Receipt
                </button>

                {/* View Booking Button */}
                <button className={styles.viewBookingButton} onClick={handleViewBooking}>
                  <Calendar size={18} strokeWidth={2} />
                  View Booking
                </button>

                {/* Pre Check-in Section */}
                <div className={styles.sectionDivider} />

                <h4 className={styles.preCheckInHeader}>Save Time at Arrival</h4>
                <p className={styles.preCheckInDescription}>
                  Complete your pre check-in 24 hours before arrival and skip the front desk!
                </p>

                <button
                  className={styles.preCheckInButton}
                  disabled={!isPreCheckInAvailable}
                  onClick={() => console.log('Navigate to pre check-in')}
                >
                  Pre Check-in
                </button>

                {!isPreCheckInAvailable && (
                  <p className={styles.helperText}>Available 24 hours before check-in</p>
                )}

                {/* Help Section */}
                <div className={styles.sectionDivider} />

                <h4 className={styles.helpHeader}>Have Questions?</h4>

                <div className={styles.contactItems}>
                  <a href="tel:+97141234567" className={styles.contactItem}>
                    <Phone size={16} strokeWidth={2} />
                    <span>+971 4 123 4567</span>
                  </a>

                  <a href="mailto:support@glimmora.com" className={styles.contactItem}>
                    <Mail size={16} strokeWidth={2} />
                    <span>support@glimmora.com</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Important Information Section */}
      <section className={styles.importantInfoSection}>
        <div className={styles.container}>
          <h2 className={styles.importantInfoHeader}>Important Information</h2>

          <div className={styles.infoCardsGrid}>
            <InfoCard
              icon={Calendar}
              iconColor="#A57865"
              title="Check-in"
              text="Check-in starts at 2:00 PM. Please have your ID and confirmation number ready."
            />

            <InfoCard
              icon={Bell}
              iconColor="#A57865"
              title="Reminder"
              text="We'll send you a reminder 24 hours before your check-in date via email."
            />

            <InfoCard
              icon={XCircle}
              iconColor="#DC3545"
              title="Cancellation"
              text={`Free cancellation until ${formatCancellationDate(
                bookingData.cancellationDeadline
              )}. After that, cancellation charges may apply.`}
            />
          </div>
        </div>
      </section>

      {/* Action Buttons Section */}
      <section className={styles.actionButtonsSection}>
        <button className={styles.backToHomeButton} onClick={handleBackToHome}>
          <Home size={20} strokeWidth={2} />
          Back to Home
        </button>

        <button className={styles.bookAnotherButton} onClick={handleBookAnother}>
          <Plus size={20} strokeWidth={2} />
          Book Another Room
        </button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Confirmation;
