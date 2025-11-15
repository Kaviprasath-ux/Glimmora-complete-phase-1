import React from 'react';
import { Calendar, Users, BedDouble } from 'lucide-react';
import styles from './Dashboard.module.css';

interface BookingCardProps {
  bookingRef: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  bedType: string;
  daysAway: number;
}

const BookingCard: React.FC<BookingCardProps> = ({
  bookingRef,
  status,
  roomName,
  checkIn,
  checkOut,
  guests,
  bedType,
  daysAway,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return '#27AE60';
      case 'pending':
        return '#FFA500';
      case 'cancelled':
        return '#DC3545';
      default:
        return '#808080';
    }
  };

  const getStatusText = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className={styles.bookingCard}>
      <div className={styles.bookingLeft}>
        <p className={styles.bookingRef}>{bookingRef}</p>
        <div className={styles.statusBadge}>
          <span
            className={styles.statusDot}
            style={{ backgroundColor: getStatusColor() }}
          />
          <span className={styles.statusText} style={{ color: getStatusColor() }}>
            {getStatusText()}
          </span>
        </div>
        <h3 className={styles.roomName}>{roomName}</h3>
        <div className={styles.detailsRow}>
          <div className={styles.detailItem}>
            <Calendar size={16} strokeWidth={2} />
            <span>{checkIn} - {checkOut}</span>
          </div>
          <div className={styles.detailItem}>
            <Users size={16} strokeWidth={2} />
            <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
          </div>
          <div className={styles.detailItem}>
            <BedDouble size={16} strokeWidth={2} />
            <span>{bedType}</span>
          </div>
        </div>
      </div>
      <div className={styles.bookingRight}>
        <div className={styles.countdownBadge}>
          {daysAway} {daysAway === 1 ? 'day' : 'days'} away
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.primaryButton}>Pre Check-in</button>
          <button className={styles.secondaryButton}>View Details</button>
          <button className={styles.secondaryButton}>Manage</button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
