import React, { useState, useEffect } from 'react';
import { AlertCircle, ChevronLeft, ChevronRight, Check, ChevronDown } from 'lucide-react';
import Navigation from '../../Home/Navigation';
import Footer from '../../Home/Footer';
import ChatBubble from '../../Home/ChatBubble';
import ProgressStepper from '../Shared/ProgressStepper';
import BookingSummary from '../Shared/BookingSummary';
import styles from './GuestDetails.module.css';

interface GuestDetailsProps {
  isAuthenticated?: boolean;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

// Sample booking data (would come from previous page/route params)
const sampleBookingData = {
  roomId: 1,
  roomName: 'Deluxe Suite',
  roomImage: 'gradient-placeholder',
  roomPrice: 250,
  rating: 4.8,
  checkIn: '2024-11-20',
  checkOut: '2024-11-22',
  guests: 2,
};

const GuestDetails: React.FC<GuestDetailsProps> = ({ isAuthenticated = false, user }) => {
  const userName = user?.firstName || 'Guest';
  const userEmail = user?.email || 'user@glimmora.com';
  const userInitials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : 'G';

  // Form state
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    country: '',
    specialRequests: '',
  });

  // Additional options state
  const [additionalOptions, setAdditionalOptions] = useState({
    breakfast: false,
    airportPickup: false,
    earlyCheckIn: false,
    lateCheckOut: false,
  });

  // Terms acceptance
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Touched fields (to show errors only after blur)
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  // Calculate booking details
  const calculateNights = () => {
    const checkIn = new Date(sampleBookingData.checkIn);
    const checkOut = new Date(sampleBookingData.checkOut);
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const roomTotal = sampleBookingData.roomPrice * nights;
  const serviceFee = 50;
  const taxes = Math.round(roomTotal * 0.15);

  // Calculate additional options total
  const calculateAdditionalOptions = () => {
    let total = 0;
    const options: {[key: string]: number} = {};

    if (additionalOptions.breakfast) {
      const cost = 25 * sampleBookingData.guests * nights;
      options.breakfast = cost;
      total += cost;
    }
    if (additionalOptions.airportPickup) {
      options.airportPickup = 75;
      total += 75;
    }
    if (additionalOptions.earlyCheckIn) {
      options.earlyCheckIn = 50;
      total += 50;
    }
    if (additionalOptions.lateCheckOut) {
      options.lateCheckOut = 50;
      total += 50;
    }

    return options;
  };

  // Calculate free cancellation date (24 hours before check-in)
  const getFreeCancellationDate = () => {
    const checkIn = new Date(sampleBookingData.checkIn);
    checkIn.setDate(checkIn.getDate() - 1);
    return checkIn.toISOString().split('T')[0];
  };

  // Validation functions
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        if (value.trim().length < 2) return 'Must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters allowed';
        return '';

      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';

      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[\d\s\+\-\(\)]+$/.test(value)) return 'Please enter a valid phone number';
        if (value.replace(/\D/g, '').length < 10) return 'Phone number must be at least 10 digits';
        return '';

      case 'country':
        if (!value) return 'Country is required';
        return '';

      default:
        return '';
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (option: keyof typeof additionalOptions) => {
    setAdditionalOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    Object.keys(formData).forEach((key) => {
      if (key !== 'specialRequests') {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) newErrors[key] = error;
      }
    });

    if (!termsAccepted) {
      newErrors.terms = 'You must agree to the terms to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid
  const isFormValid = () => {
    const hasRequiredFields =
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.country.trim() !== '' &&
      termsAccepted;

    const hasNoErrors = Object.values(errors).every((error) => error === '');

    return hasRequiredFields && hasNoErrors;
  };

  // Handle back
  const handleBack = () => {
    window.history.back();
    // OR: navigate to room details with room ID
  };

  // Handle continue
  const handleContinue = () => {
    if (validateForm()) {
      const bookingData = {
        guestInfo: formData,
        additionalOptions,
        termsAccepted,
        roomData: sampleBookingData,
        pricing: {
          roomTotal,
          serviceFee,
          taxes,
          additionalOptionsTotal: Object.values(calculateAdditionalOptions()).reduce((sum, val) => sum + val, 0),
          total: roomTotal + serviceFee + taxes + Object.values(calculateAdditionalOptions()).reduce((sum, val) => sum + val, 0),
        },
      };

      console.log('Booking data:', bookingData);
      alert('Proceeding to Payment...\n\nBooking Data:\n' + JSON.stringify(bookingData, null, 2));
      // TODO: Navigate to /booking/payment with booking data
    }
  };

  return (
    <div className={styles.guestDetailsContainer}>
      {/* Navigation */}
      <Navigation
        isAuthenticated={isAuthenticated}
        userName={userName}
        userEmail={userEmail}
        userInitials={userInitials}
        notificationCount={3}
        activeTab=""
      />

      {/* Breadcrumb */}
      <div className={styles.breadcrumbContainer}>
        <div className={styles.breadcrumb}>
          <a href="/" className={styles.breadcrumbLink}>
            Home
          </a>
          <span className={styles.breadcrumbSeparator}>&gt;</span>
          <a href="/rooms" className={styles.breadcrumbLink}>
            Rooms
          </a>
          <span className={styles.breadcrumbSeparator}>&gt;</span>
          <a href={`/rooms/${sampleBookingData.roomId}`} className={styles.breadcrumbLink}>
            {sampleBookingData.roomName}
          </a>
          <span className={styles.breadcrumbSeparator}>&gt;</span>
          <span className={styles.breadcrumbCurrent}>Booking</span>
        </div>
      </div>

      {/* Progress Stepper */}
      <ProgressStepper currentStep={1} />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Column - Guest Form */}
        <div className={styles.leftColumn}>
          <div className={styles.formContainer}>
            <h1 className={styles.pageTitle}>Guest Information</h1>
            <p className={styles.subtitle}>Please provide your details below</p>

            {/* Form Fields */}
            <form>
              {/* First Name */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  className={`${styles.input} ${touched.firstName && errors.firstName ? styles.inputError : ''}`}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                {touched.firstName && errors.firstName && (
                  <div className={styles.errorMessage}>
                    <AlertCircle size={14} strokeWidth={2} />
                    {errors.firstName}
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  className={`${styles.input} ${touched.lastName && errors.lastName ? styles.inputError : ''}`}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                {touched.lastName && errors.lastName && (
                  <div className={styles.errorMessage}>
                    <AlertCircle size={14} strokeWidth={2} />
                    {errors.lastName}
                  </div>
                )}
              </div>

              {/* Email Address */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`}
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                />
                {touched.email && errors.email && (
                  <div className={styles.errorMessage}>
                    <AlertCircle size={14} strokeWidth={2} />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className={`${styles.input} ${touched.phone && errors.phone ? styles.inputError : ''}`}
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="+971 50 123 4567"
                />
                {touched.phone && errors.phone && (
                  <div className={styles.errorMessage}>
                    <AlertCircle size={14} strokeWidth={2} />
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Country/Region */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Country/Region *</label>
                <div className={styles.selectWrapper}>
                  <select
                    name="country"
                    className={`${styles.select} ${touched.country && errors.country ? styles.inputError : ''}`}
                    value={formData.country}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select a country</option>
                    <option value="UAE">United Arab Emirates</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="QA">Qatar</option>
                    <option value="OM">Oman</option>
                    <option value="BH">Bahrain</option>
                    <option value="KW">Kuwait</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className={styles.selectIcon} size={18} strokeWidth={2} />
                </div>
                {touched.country && errors.country && (
                  <div className={styles.errorMessage}>
                    <AlertCircle size={14} strokeWidth={2} />
                    {errors.country}
                  </div>
                )}
              </div>

              {/* Special Requests */}
              <div className={styles.sectionHeader}>
                <h2>Special Requests</h2>
                <span className={styles.optionalLabel}>(Optional)</span>
              </div>
              <textarea
                name="specialRequests"
                className={styles.textarea}
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Any special requirements? (e.g., high floor, late check-in, etc.)"
              />

              {/* Additional Options */}
              <div className={styles.sectionHeader}>
                <h2>Additional Options</h2>
              </div>

              <div className={styles.checkboxOptions}>
                <label className={styles.checkboxOption}>
                  <input
                    type="checkbox"
                    className={styles.hiddenCheckbox}
                    checked={additionalOptions.breakfast}
                    onChange={() => handleCheckboxChange('breakfast')}
                  />
                  <div className={styles.customCheckbox}>
                    {additionalOptions.breakfast && <Check size={12} strokeWidth={2} />}
                  </div>
                  <span className={styles.checkboxLabel}>Add Breakfast</span>
                  <span className={styles.checkboxPrice}>$25/person/day</span>
                </label>

                <label className={styles.checkboxOption}>
                  <input
                    type="checkbox"
                    className={styles.hiddenCheckbox}
                    checked={additionalOptions.airportPickup}
                    onChange={() => handleCheckboxChange('airportPickup')}
                  />
                  <div className={styles.customCheckbox}>
                    {additionalOptions.airportPickup && <Check size={12} strokeWidth={2} />}
                  </div>
                  <span className={styles.checkboxLabel}>Airport Pickup</span>
                  <span className={styles.checkboxPrice}>$75 one-way</span>
                </label>

                <label className={styles.checkboxOption}>
                  <input
                    type="checkbox"
                    className={styles.hiddenCheckbox}
                    checked={additionalOptions.earlyCheckIn}
                    onChange={() => handleCheckboxChange('earlyCheckIn')}
                  />
                  <div className={styles.customCheckbox}>
                    {additionalOptions.earlyCheckIn && <Check size={12} strokeWidth={2} />}
                  </div>
                  <span className={styles.checkboxLabel}>Early Check-in</span>
                  <span className={styles.checkboxPrice}>$50</span>
                </label>

                <label className={styles.checkboxOption}>
                  <input
                    type="checkbox"
                    className={styles.hiddenCheckbox}
                    checked={additionalOptions.lateCheckOut}
                    onChange={() => handleCheckboxChange('lateCheckOut')}
                  />
                  <div className={styles.customCheckbox}>
                    {additionalOptions.lateCheckOut && <Check size={12} strokeWidth={2} />}
                  </div>
                  <span className={styles.checkboxLabel}>Late Check-out</span>
                  <span className={styles.checkboxPrice}>$50</span>
                </label>
              </div>

              {/* Terms & Conditions */}
              <div className={styles.termsContainer}>
                <label className={styles.termsLabel}>
                  <input
                    type="checkbox"
                    className={styles.hiddenCheckbox}
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <div className={styles.customCheckbox}>
                    {termsAccepted && <Check size={12} strokeWidth={2} />}
                  </div>
                  <span>
                    I agree to the{' '}
                    <a href="/terms" className={styles.termsLink}>
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className={styles.termsLink}>
                      Privacy Policy
                    </a>{' '}
                    *
                  </span>
                </label>
                {errors.terms && !termsAccepted && (
                  <div className={styles.errorMessage}>
                    <AlertCircle size={14} strokeWidth={2} />
                    {errors.terms}
                  </div>
                )}
              </div>

              {/* Buttons Row */}
              <div className={styles.buttonsRow}>
                <button type="button" className={styles.backButton} onClick={handleBack}>
                  <ChevronLeft size={20} strokeWidth={2} />
                  Back to Room
                </button>
                <button
                  type="button"
                  className={styles.continueButton}
                  onClick={handleContinue}
                  disabled={!isFormValid()}
                >
                  Continue to Payment
                  <ChevronRight size={20} strokeWidth={2} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Booking Summary */}
        <div className={styles.rightColumn}>
          <BookingSummary
            roomName={sampleBookingData.roomName}
            roomImage={sampleBookingData.roomImage}
            rating={sampleBookingData.rating}
            checkIn={sampleBookingData.checkIn}
            checkOut={sampleBookingData.checkOut}
            guests={sampleBookingData.guests}
            roomPrice={sampleBookingData.roomPrice}
            nights={nights}
            serviceFee={serviceFee}
            taxes={taxes}
            additionalOptions={calculateAdditionalOptions()}
            freeCancellationDate={getFreeCancellationDate()}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* AI Chat Bubble */}
      <ChatBubble hasUnreadMessages={isAuthenticated} />
    </div>
  );
};

export default GuestDetails;
