import React from 'react';
import { Star, Calendar, Users, Check, Phone, Mail } from 'lucide-react';
import styles from './BookingSummary.module.css';

interface BookingSummaryProps {
  roomName: string;
  roomImage: string;
  rating: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomPrice: number;
  nights: number;
  serviceFee: number;
  taxes: number;
  additionalOptions?: {
    breakfast?: number;
    airportPickup?: number;
    earlyCheckIn?: number;
    lateCheckOut?: number;
  };
  freeCancellationDate: string;
  guestDetails?: {
    name: string;
    email: string;
    phone: string;
  };
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  roomName,
  roomImage,
  rating,
  checkIn,
  checkOut,
  guests,
  roomPrice,
  nights,
  serviceFee,
  taxes,
  additionalOptions = {},
  freeCancellationDate,
  guestDetails,
}) => {
  const roomTotal = roomPrice * nights;
  const additionalTotal = Object.values(additionalOptions).reduce((sum, val) => sum + (val || 0), 0);
  const total = roomTotal + serviceFee + taxes + additionalTotal;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={styles.summaryCard}>
      {/* Header */}
      <h2 className={styles.summaryHeader}>Your Booking</h2>

      {/* Room Image */}
      <div className={styles.roomImage} />

      {/* Room Name */}
      <h3 className={styles.roomName}>{roomName}</h3>

      {/* Rating */}
      <div className={styles.rating}>
        <Star size={14} fill="#FFB800" stroke="#FFB800" strokeWidth={2} />
        <span className={styles.ratingText}>{rating.toFixed(1)}</span>
      </div>

      {/* Booking Details */}
      <div className={styles.bookingDetails}>
        <div className={styles.detailRow}>
          <Calendar size={16} strokeWidth={2} />
          <span>Check-in: {formatDate(checkIn)}</span>
        </div>
        <div className={styles.detailRow}>
          <Calendar size={16} strokeWidth={2} />
          <span>Check-out: {formatDate(checkOut)}</span>
        </div>
        <div className={styles.detailRow}>
          <Users size={16} strokeWidth={2} />
          <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
        </div>
      </div>

      {/* Guest Details (if provided) */}
      {guestDetails && (
        <>
          <h4 className={styles.guestDetailsHeader}>Guest Details</h4>
          <div className={styles.guestInfo}>
            <div className={styles.guestInfoItem}>{guestDetails.name}</div>
            <div className={styles.guestInfoItem}>{guestDetails.email}</div>
            <div className={styles.guestInfoItem}>{guestDetails.phone}</div>
          </div>
          <div className={styles.guestDivider} />
        </>
      )}

      {/* Price Breakdown */}
      <div className={styles.priceSection}>
        <h4 className={styles.priceSectionHeader}>Price Details</h4>

        <div className={styles.priceBreakdown}>
          <div className={styles.priceRow}>
            <span>${roomPrice} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
            <span>${roomTotal}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Service fee</span>
            <span>${serviceFee}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Taxes (15%)</span>
            <span>${taxes}</span>
          </div>

          {/* Additional Options */}
          {additionalOptions.breakfast && additionalOptions.breakfast > 0 && (
            <div className={styles.priceRow}>
              <span>Breakfast ({guests} guests × {nights} days)</span>
              <span>${additionalOptions.breakfast}</span>
            </div>
          )}
          {additionalOptions.airportPickup && additionalOptions.airportPickup > 0 && (
            <div className={styles.priceRow}>
              <span>Airport Pickup</span>
              <span>${additionalOptions.airportPickup}</span>
            </div>
          )}
          {additionalOptions.earlyCheckIn && additionalOptions.earlyCheckIn > 0 && (
            <div className={styles.priceRow}>
              <span>Early Check-in</span>
              <span>${additionalOptions.earlyCheckIn}</span>
            </div>
          )}
          {additionalOptions.lateCheckOut && additionalOptions.lateCheckOut > 0 && (
            <div className={styles.priceRow}>
              <span>Late Check-out</span>
              <span>${additionalOptions.lateCheckOut}</span>
            </div>
          )}
        </div>

        <div className={styles.divider} />

        <div className={styles.totalRow}>
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      {/* Free Cancellation */}
      <div className={styles.freeCancellation}>
        <Check size={16} strokeWidth={2} />
        <span>Free cancellation until {formatDate(freeCancellationDate)}</span>
      </div>

      {/* Help Section */}
      <div className={styles.helpSection}>
        <h4 className={styles.helpHeader}>Need Help?</h4>
        <div className={styles.contactItem}>
          <Phone size={16} strokeWidth={2} />
          <span>+971 4 123 4567</span>
        </div>
        <div className={styles.contactItem}>
          <Mail size={16} strokeWidth={2} />
          <span>support@glimmora.com</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
