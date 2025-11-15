import React from 'react';
import { Calendar, Users, CheckCircle, ArrowRight } from 'lucide-react';
import styles from './PreCheckIn.module.css';

interface Booking {
  id: string;
  confirmationNumber: string;
  roomName: string;
  roomImage: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  availableUntil: string;
}

interface BookingCardProps {
  booking: Booking;
  onStartPreCheckIn: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onStartPreCheckIn }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.bookingCard}>
      {/* Room Image */}
      <div className={styles.roomImage} />

      {/* Booking Details */}
      <div className={styles.bookingDetails}>
        <h3 className={styles.roomName}>{booking.roomName}</h3>

        <div className={styles.bookingInfoRows}>
          <div className={styles.infoRow}>
            <Calendar size={16} strokeWidth={2} />
            <span>Check-in: {formatDate(booking.checkIn)}</span>
          </div>

          <div className={styles.infoRow}>
            <Calendar size={16} strokeWidth={2} />
            <span>Check-out: {formatDate(booking.checkOut)}</span>
          </div>

          <div className={styles.infoRow}>
            <Users size={16} strokeWidth={2} />
            <span>{booking.guests} Guests</span>
          </div>
        </div>

        <div className={styles.confirmationNumber}>
          Confirmation: {booking.confirmationNumber}
        </div>

        <div className={styles.availabilityBadge}>
          <CheckCircle size={16} strokeWidth={2} />
          <div>
            <div className={styles.badgeTitle}>✅ Pre Check-in Available</div>
            <div className={styles.badgeText}>Available until {booking.availableUntil}</div>
          </div>
        </div>

        <button className={styles.startButton} onClick={onStartPreCheckIn}>
          Start Pre Check-in
          <ArrowRight size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
