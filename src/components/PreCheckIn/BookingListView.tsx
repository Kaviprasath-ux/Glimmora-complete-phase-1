import React from 'react';
import { CalendarX } from 'lucide-react';
import BookingCard from './BookingCard';
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

interface BookingListViewProps {
  userName: string;
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
}

const BookingListView: React.FC<BookingListViewProps> = ({
  userName,
  bookings,
  onSelectBooking,
}) => {
  return (
    <div className={styles.bookingListContainer}>
      <h2 className={styles.welcomeTitle}>Welcome back, {userName}! 👋</h2>
      <p className={styles.welcomeSubtitle}>Your upcoming stays eligible for pre check-in</p>

      {bookings.length > 0 ? (
        <div className={styles.bookingsList}>
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onStartPreCheckIn={() => onSelectBooking(booking)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <CalendarX size={48} strokeWidth={2} className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>No Bookings Available for Pre Check-in</h3>
          <p className={styles.emptyDescription}>
            Pre check-in is available 24 hours before your arrival.
            <br />
            You don't have any upcoming stays yet.
          </p>
          <button
            className={styles.browseRoomsButton}
            onClick={() => console.log('Navigate to /rooms')}
          >
            Browse Rooms
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingListView;
