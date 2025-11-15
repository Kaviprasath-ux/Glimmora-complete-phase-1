import React, { useState } from 'react';
import { Search, Loader, AlertCircle, Clock, Info } from 'lucide-react';
import styles from './PreCheckIn.module.css';

interface LookupFormViewProps {
  onBookingFound: (booking: any) => void;
}

type ErrorType = 'not_found' | 'not_available' | 'already_completed' | null;

const LookupFormView: React.FC<LookupFormViewProps> = ({ onBookingFound }) => {
  const [formData, setFormData] = useState({
    confirmationNumber: '',
    email: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    type: ErrorType;
    message: string;
    availableDate?: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'confirmationNumber' ? value.toUpperCase() : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate validation
    // In real app, this would call an API
    const mockBooking = {
      id: '1',
      confirmationNumber: formData.confirmationNumber,
      roomName: 'Deluxe Ocean View Suite',
      checkIn: '2025-11-20',
      checkOut: '2025-11-23',
      guests: 2,
      guestName: 'John Doe',
      email: formData.email,
      phone: '+971 50 123 4567',
    };

    // Simulate different error states for demo
    if (formData.confirmationNumber !== 'GLM123456') {
      setError({
        type: 'not_found',
        message: 'Booking not found',
      });
      setIsLoading(false);
      return;
    }

    // Success - booking found
    setIsLoading(false);
    onBookingFound(mockBooking);
  };

  const isFormValid = formData.confirmationNumber.length >= 6 && formData.email.includes('@');

  return (
    <div className={styles.lookupContainer}>
      <div className={styles.lookupCard}>
        <h2 className={styles.lookupTitle}>Find Your Booking</h2>
        <p className={styles.lookupSubtitle}>
          Enter your confirmation number and email to continue
        </p>

        <form onSubmit={handleSubmit} className={styles.lookupForm}>
          {/* Confirmation Number */}
          <div className={styles.formGroup}>
            <label htmlFor="confirmationNumber" className={styles.label}>
              Confirmation Number *
            </label>
            <input
              type="text"
              id="confirmationNumber"
              name="confirmationNumber"
              value={formData.confirmationNumber}
              onChange={handleChange}
              className={styles.input}
              style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}
              placeholder="GLM123456"
            />
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="you@example.com"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.findButton}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <>
                <Loader className={styles.spinner} size={20} strokeWidth={2} />
                Searching...
              </>
            ) : (
              <>
                <Search size={20} strokeWidth={2} />
                Find My Booking
              </>
            )}
          </button>

          {/* Error Messages */}
          {error && error.type === 'not_found' && (
            <div className={styles.errorBox}>
              <div className={styles.errorHeader}>
                <AlertCircle size={20} strokeWidth={2} />
                <span>⚠️ Booking Not Found</span>
              </div>
              <p className={styles.errorMessage}>
                Please check your confirmation number and email address.
                <br />
                Make sure they match your booking details.
              </p>
            </div>
          )}

          {error && error.type === 'not_available' && (
            <div className={styles.warningBox}>
              <div className={styles.warningHeader}>
                <Clock size={20} strokeWidth={2} />
                <span>⏰ Pre Check-in Not Available Yet</span>
              </div>
              <p className={styles.warningMessage}>
                Pre check-in opens 24 hours before your arrival.
                <br />
                Available from: {error.availableDate}
              </p>
            </div>
          )}

          {error && error.type === 'already_completed' && (
            <div className={styles.infoBox}>
              <div className={styles.infoHeader}>
                <Info size={20} strokeWidth={2} />
                <span>✓ Pre Check-in Already Completed</span>
              </div>
              <p className={styles.infoMessage}>
                You've already completed pre check-in for this booking.
                <br />
                We'll see you on your check-in date!
              </p>
            </div>
          )}

          {/* Divider */}
          <div className={styles.divider}>
            <span className={styles.dividerText}>or</span>
          </div>

          {/* Sign In Link */}
          <div className={styles.signInSection}>
            <p className={styles.signInText}>Don't have an account?</p>
            <a href="/login" className={styles.signInLink}>
              Sign In to view all your bookings
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LookupFormView;
