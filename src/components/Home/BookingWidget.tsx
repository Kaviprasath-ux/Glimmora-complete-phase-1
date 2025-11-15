import React, { useState } from 'react';
import { Calendar, Users, Search } from 'lucide-react';
import styles from './Home.module.css';

const BookingWidget: React.FC = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [errors, setErrors] = useState({
    checkIn: '',
    checkOut: '',
  });

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMinCheckOutDate = () => {
    if (!checkIn) return getTodayDate();
    const checkInDate = new Date(checkIn);
    checkInDate.setDate(checkInDate.setDate(checkInDate.getDate() + 1));
    return checkInDate.toISOString().split('T')[0];
  };

  const validateDates = () => {
    const newErrors = {
      checkIn: '',
      checkOut: '',
    };

    if (!checkIn) {
      newErrors.checkIn = 'Check-in date is required';
    } else {
      const today = new Date(getTodayDate());
      const checkInDate = new Date(checkIn);
      if (checkInDate < today) {
        newErrors.checkIn = 'Check-in must be today or later';
      }
    }

    if (!checkOut) {
      newErrors.checkOut = 'Check-out date is required';
    } else if (checkIn) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = 'Check-out must be after check-in';
      }
    }

    setErrors(newErrors);
    return !newErrors.checkIn && !newErrors.checkOut;
  };

  const handleSearch = () => {
    if (validateDates()) {
      // Navigate to rooms with query params
      const params = new URLSearchParams({
        checkin: checkIn,
        checkout: checkOut,
        guests: guests,
      });
      window.location.href = `/rooms?${params.toString()}`;
    }
  };

  const isFormValid = () => {
    return checkIn && checkOut && guests && !errors.checkIn && !errors.checkOut;
  };

  return (
    <div className={styles.bookingWidget}>
      {/* Check-in Date */}
      <div className={styles.widgetField}>
        <label htmlFor="checkin" className={styles.widgetLabel}>
          Check-in
        </label>
        <div className={styles.widgetInputWrapper}>
          <Calendar size={16} className={styles.widgetIcon} />
          <input
            type="date"
            id="checkin"
            value={checkIn}
            min={getTodayDate()}
            onChange={(e) => {
              setCheckIn(e.target.value);
              setErrors({ ...errors, checkIn: '' });
            }}
            onBlur={validateDates}
            className={styles.widgetInput}
          />
        </div>
        {errors.checkIn && (
          <span className={styles.widgetError}>{errors.checkIn}</span>
        )}
      </div>

      {/* Check-out Date */}
      <div className={styles.widgetField}>
        <label htmlFor="checkout" className={styles.widgetLabel}>
          Check-out
        </label>
        <div className={styles.widgetInputWrapper}>
          <Calendar size={16} className={styles.widgetIcon} />
          <input
            type="date"
            id="checkout"
            value={checkOut}
            min={getMinCheckOutDate()}
            onChange={(e) => {
              setCheckOut(e.target.value);
              setErrors({ ...errors, checkOut: '' });
            }}
            onBlur={validateDates}
            className={styles.widgetInput}
          />
        </div>
        {errors.checkOut && (
          <span className={styles.widgetError}>{errors.checkOut}</span>
        )}
      </div>

      {/* Guests */}
      <div className={styles.widgetField}>
        <label htmlFor="guests" className={styles.widgetLabel}>
          Guests
        </label>
        <div className={styles.widgetInputWrapper}>
          <Users size={16} className={styles.widgetIcon} />
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={styles.widgetSelect}
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5+ Guests</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button
        className={styles.searchButton}
        onClick={handleSearch}
        disabled={!checkIn || !checkOut}
      >
        <Search size={20} strokeWidth={2} />
        <span>Search</span>
      </button>
    </div>
  );
};

export default BookingWidget;
