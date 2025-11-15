import React, { useState } from 'react';
import { Check, Loader, ChevronDown, Calendar, Users, Phone, Mail } from 'lucide-react';
import styles from './PreCheckIn.module.css';

interface Booking {
  id: string;
  confirmationNumber: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights?: number;
  guestName: string;
  email: string;
  phone: string;
}

interface PreCheckInFormProps {
  booking: Booking;
  onComplete: () => void;
}

const PreCheckInForm: React.FC<PreCheckInFormProps> = ({ booking, onComplete }) => {
  const [formData, setFormData] = useState({
    arrivalTime: '',
    numberOfKeys: '2',
    preferredFloor: 'any',
    specialRequests: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.arrivalTime) {
      newErrors.arrivalTime = 'Please select your arrival time';
    }

    if (!formData.numberOfKeys) {
      newErrors.numberOfKeys = 'Please select number of room keys';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    onComplete();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isFormValid =
    formData.arrivalTime && formData.numberOfKeys && formData.termsAccepted;

  return (
    <div className={styles.formGridLayout}>
      {/* Left Column - Form */}
      <div className={styles.formColumn}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Complete Pre Check-in</h2>
          <p className={styles.formSubtitle}>Just a few more details to complete check-in</p>

          <form onSubmit={handleSubmit}>
            {/* Guest Information Section */}
            <h3 className={styles.sectionHeader}>Guest Information</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>Guest Name</label>
              <input
                type="text"
                value={booking.guestName}
                className={styles.inputReadOnly}
                disabled
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                value={booking.email}
                className={styles.inputReadOnly}
                disabled
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Phone</label>
              <input
                type="tel"
                value={booking.phone}
                className={styles.inputReadOnly}
                disabled
              />
            </div>

            {/* Arrival Details Section */}
            <h3 className={styles.sectionHeader} style={{ marginTop: '32px' }}>
              Arrival Details
            </h3>

            <div className={styles.formGroup}>
              <label htmlFor="arrivalTime" className={styles.label}>
                Expected Arrival Time *
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="arrivalTime"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Select arrival time</option>
                  <option value="12-2pm">12:00 PM - 2:00 PM</option>
                  <option value="2-4pm">2:00 PM - 4:00 PM</option>
                  <option value="4-6pm">4:00 PM - 6:00 PM</option>
                  <option value="6-8pm">6:00 PM - 8:00 PM</option>
                  <option value="8-10pm">8:00 PM - 10:00 PM</option>
                  <option value="after-10pm">After 10:00 PM</option>
                </select>
                <ChevronDown size={18} className={styles.selectIcon} />
              </div>
              {errors.arrivalTime && (
                <div className={styles.errorText}>{errors.arrivalTime}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="numberOfKeys" className={styles.label}>
                Number of Room Keys *
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="numberOfKeys"
                  name="numberOfKeys"
                  value={formData.numberOfKeys}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="1">1 Key</option>
                  <option value="2">2 Keys</option>
                  <option value="3">3 Keys</option>
                  <option value="4">4 Keys</option>
                </select>
                <ChevronDown size={18} className={styles.selectIcon} />
              </div>
            </div>

            {/* Preferences Section */}
            <h3 className={styles.sectionHeader} style={{ marginTop: '32px' }}>
              Preferences & Requests
            </h3>

            <div className={styles.formGroup}>
              <label htmlFor="preferredFloor" className={styles.label}>
                Preferred Floor
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="preferredFloor"
                  name="preferredFloor"
                  value={formData.preferredFloor}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="any">Any Floor</option>
                  <option value="low">Low Floor (1-3)</option>
                  <option value="mid">Mid Floor (4-7)</option>
                  <option value="high">High Floor (8+)</option>
                </select>
                <ChevronDown size={18} className={styles.selectIcon} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="specialRequests" className={styles.label}>
                Special Requests
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Any special requirements? (e.g., extra pillows, dietary needs, etc.)"
                rows={4}
              />
            </div>

            {/* Terms & Conditions */}
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className={styles.hiddenCheckbox}
                />
                <div className={styles.customCheckbox}>
                  {formData.termsAccepted && <Check size={12} strokeWidth={3} />}
                </div>
                <span className={styles.checkboxText}>
                  I confirm all information is accurate and I agree to the hotel's{' '}
                  <a href="/terms" className={styles.termsLink}>
                    Terms & Conditions
                  </a>{' '}
                  *
                </span>
              </label>
              {errors.termsAccepted && (
                <div className={styles.errorText}>{errors.termsAccepted}</div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.completeButton}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className={styles.spinner} size={20} strokeWidth={2} />
                  Processing...
                </>
              ) : (
                <>
                  <Check size={20} strokeWidth={2} />
                  Complete Pre Check-in
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Column - Booking Summary */}
      <aside className={styles.summaryColumn}>
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryHeader}>Booking Summary</h3>

          <div className={styles.summaryRoomImage} />

          <h4 className={styles.summaryRoomName}>{booking.roomName}</h4>

          <div className={styles.summaryDetails}>
            <div className={styles.summaryRow}>
              <div className={styles.summaryLabel}>
                <Calendar size={16} strokeWidth={2} />
                <span>Check-in</span>
              </div>
              <div className={styles.summaryValue}>{formatDate(booking.checkIn)}</div>
            </div>

            <div className={styles.summaryRow}>
              <div className={styles.summaryLabel}>
                <Calendar size={16} strokeWidth={2} />
                <span>Check-out</span>
              </div>
              <div className={styles.summaryValue}>{formatDate(booking.checkOut)}</div>
            </div>

            <div className={styles.summaryRow}>
              <div className={styles.summaryLabel}>
                <Users size={16} strokeWidth={2} />
                <span>Guests</span>
              </div>
              <div className={styles.summaryValue}>{booking.guests} Guests</div>
            </div>

            {booking.nights && (
              <div className={styles.summaryRow}>
                <div className={styles.summaryLabel}>
                  <span>Nights</span>
                </div>
                <div className={styles.summaryValue}>{booking.nights} Nights</div>
              </div>
            )}
          </div>

          <div className={styles.summaryConfirmation}>
            Confirmation Number: {booking.confirmationNumber}
          </div>

          <div className={styles.summaryDivider} />

          {/* Help Section */}
          <div className={styles.helpSection}>
            <h4 className={styles.helpHeader}>Need Help?</h4>
            <p className={styles.helpDescription}>
              Contact us if you need any assistance
            </p>

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
        </div>
      </aside>
    </div>
  );
};

export default PreCheckInForm;
