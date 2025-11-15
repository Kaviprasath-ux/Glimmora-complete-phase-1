import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import styles from './BookingCard.module.css';

interface BookingCardProps {
  roomPrice: number;
  roomId: number;
  roomName: string;
}

const BookingCard: React.FC<BookingCardProps> = ({
  roomPrice,
  roomId,
  roomName,
}) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMinCheckOutDate = () => {
    if (!checkIn) return getTodayDate();
    const checkInDate = new Date(checkIn);
    checkInDate.setDate(checkInDate.getDate() + 1);
    return checkInDate.toISOString().split('T')[0];
  };

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights();
  const roomTotal = roomPrice * nights;
  const serviceFee = 50;
  const taxes = Math.round(roomTotal * 0.15);
  const total = roomTotal + serviceFee + taxes;

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    // Navigate to booking page with data
    const bookingData = {
      roomId,
      roomName,
      checkIn,
      checkOut,
      guests,
      nights,
      roomPrice,
      total,
    };

    console.log('Booking data:', bookingData);
    // TODO: Navigate to /booking/guest-details with booking data
    alert(`Booking ${roomName}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\nTotal: $${total}`);
  };

  const handleContactSupport = () => {
    alert('Contact Support: support@glimmora.com\nPhone: +971-4-123-4567');
  };

  return (
    <div className={styles.bookingCard}>
      {/* Price Display */}
      <div className={styles.priceDisplay}>
        <span className={styles.price}>From ${roomPrice}</span>
        <span className={styles.perNight}>/night</span>
      </div>

      {/* Select Dates Section */}
      <div className={styles.selectDatesHeader}>Select Dates</div>

      {/* Check-in Date */}
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Check-in</label>
        <input
          type="date"
          className={styles.dateInput}
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          min={getTodayDate()}
        />
      </div>

      {/* Check-out Date */}
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Check-out</label>
        <input
          type="date"
          className={styles.dateInput}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          min={getMinCheckOutDate()}
          disabled={!checkIn}
        />
      </div>

      {/* Guests Select */}
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Guests</label>
        <select
          className={styles.guestsSelect}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        >
          <option value={1}>1 Guest</option>
          <option value={2}>2 Guests</option>
          <option value={3}>3 Guests</option>
          <option value={4}>4+ Guests</option>
        </select>
      </div>

      {/* Price Breakdown */}
      {nights > 0 && (
        <>
          <div className={styles.priceBreakdownHeader}>Price Breakdown</div>

          <div className={styles.priceItems}>
            <div className={styles.priceItem}>
              <span>${roomPrice} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
              <span>${roomTotal}</span>
            </div>
            <div className={styles.priceItem}>
              <span>Service fee</span>
              <span>${serviceFee}</span>
            </div>
            <div className={styles.priceItem}>
              <span>Taxes</span>
              <span>${taxes}</span>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.totalRow}>
            <span>Total</span>
            <span>${total}</span>
          </div>
        </>
      )}

      {/* Book Now Button */}
      <button className={styles.bookNowButton} onClick={handleBookNow}>
        BOOK NOW
      </button>

      {/* Free Cancellation Notice */}
      <div className={styles.freeCancellation}>
        <Check size={14} strokeWidth={2} />
        Free cancellation until 24 hours before
      </div>

      {/* Contact Support */}
      <div className={styles.contactSupport} onClick={handleContactSupport}>
        Contact Support
      </div>
    </div>
  );
};

export default BookingCard;
