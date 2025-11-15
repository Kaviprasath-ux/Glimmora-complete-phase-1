import React, { useState } from 'react';
import { CreditCard, Loader, ChevronRight, Info, ShieldCheck } from 'lucide-react';
import Navigation from '../../Home/Navigation';
import Footer from '../../Home/Footer';
import ProgressStepper from '../Shared/ProgressStepper';
import BookingSummary from '../Shared/BookingSummary';
import CreditCardForm from './CreditCardForm';
import styles from './Payment.module.css';

interface PaymentProps {
  isAuthenticated: boolean;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

type PaymentMethod = 'credit-card' | 'paypal' | 'bank-transfer';

const Payment: React.FC<PaymentProps> = ({ isAuthenticated, user }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [isCreditCardValid, setIsCreditCardValid] = useState(false);
  const [billingAddressSameAsGuest, setBillingAddressSameAsGuest] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sample booking data (would come from booking context/state in real app)
  const bookingData = {
    roomName: 'Deluxe Ocean View Suite',
    roomImage: '/path/to/image.jpg',
    rating: 4.8,
    checkIn: '2025-11-20',
    checkOut: '2025-11-23',
    guests: 2,
    roomPrice: 299,
    nights: 3,
    serviceFee: 45,
    taxes: 155,
    additionalOptions: {
      breakfast: 90, // 15 per person per day × 2 guests × 3 days
      airportPickup: 50,
      earlyCheckIn: 0,
      lateCheckOut: 30,
    },
    freeCancellationDate: '2025-11-18',
    guestDetails: {
      name: 'John Doe',
      email: 'john.doe@glimmora.com',
      phone: '+971 50 123 4567',
    },
  };

  const handleBackClick = () => {
    // Navigate back to Guest Details (Step 1)
    console.log('Navigate to Guest Details');
  };

  const handleCompleteBooking = async () => {
    // Validate based on payment method
    if (selectedPaymentMethod === 'credit-card' && !isCreditCardValid) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing (2-3 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setIsProcessing(false);

    // Navigate to confirmation page
    console.log('Navigate to Confirmation');
  };

  const isFormValid = () => {
    if (selectedPaymentMethod === 'credit-card') {
      return isCreditCardValid;
    }
    // PayPal and Bank Transfer don't require form validation
    return true;
  };

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

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbLink}>Home</span>
            <ChevronRight size={16} strokeWidth={2} />
            <span className={styles.breadcrumbLink}>Rooms</span>
            <ChevronRight size={16} strokeWidth={2} />
            <span className={styles.breadcrumbLink}>Deluxe Ocean View Suite</span>
            <ChevronRight size={16} strokeWidth={2} />
            <span className={styles.breadcrumbCurrent}>Payment</span>
          </div>

          {/* Progress Stepper */}
          <ProgressStepper currentStep={2} />

          {/* Two-Column Layout */}
          <div className={styles.gridLayout}>
            {/* Left Column - Payment Form */}
            <div className={styles.paymentSection}>
              {/* Section Title */}
              <h2 className={styles.pageTitle}>Payment Information</h2>

              {/* Payment Method Selection */}
              <div className={styles.paymentMethodSection}>
                <h3 className={styles.sectionHeader}>Select Payment Method</h3>

                {/* Credit Card Option */}
                <label className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit-card"
                    checked={selectedPaymentMethod === 'credit-card'}
                    onChange={() => setSelectedPaymentMethod('credit-card')}
                    className={styles.hiddenRadio}
                  />
                  <div
                    className={`${styles.paymentMethodCard} ${
                      selectedPaymentMethod === 'credit-card' ? styles.selected : ''
                    }`}
                  >
                    <div className={styles.radioIndicator}>
                      <div className={styles.radioInner} />
                    </div>
                    <CreditCard size={24} strokeWidth={2} />
                    <div className={styles.paymentMethodText}>
                      <div className={styles.paymentMethodName}>Credit Card</div>
                      <div className={styles.paymentMethodDescription}>
                        Pay securely with your credit or debit card
                      </div>
                    </div>
                  </div>
                </label>

                {/* PayPal Option */}
                <label className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={selectedPaymentMethod === 'paypal'}
                    onChange={() => setSelectedPaymentMethod('paypal')}
                    className={styles.hiddenRadio}
                  />
                  <div
                    className={`${styles.paymentMethodCard} ${
                      selectedPaymentMethod === 'paypal' ? styles.selected : ''
                    }`}
                  >
                    <div className={styles.radioIndicator}>
                      <div className={styles.radioInner} />
                    </div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.5 20.5L10 13H6L7.5 5.5H15.5C18.5 5.5 20 7.5 19.5 10.5C19 13.5 16.5 15.5 13.5 15.5H11L9.5 20.5H8.5Z"
                        stroke="#003087"
                        strokeWidth="2"
                        fill="#009CDE"
                      />
                    </svg>
                    <div className={styles.paymentMethodText}>
                      <div className={styles.paymentMethodName}>PayPal</div>
                      <div className={styles.paymentMethodDescription}>
                        You'll be redirected to PayPal to complete payment
                      </div>
                    </div>
                  </div>
                </label>

                {/* Bank Transfer Option */}
                <label className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank-transfer"
                    checked={selectedPaymentMethod === 'bank-transfer'}
                    onChange={() => setSelectedPaymentMethod('bank-transfer')}
                    className={styles.hiddenRadio}
                  />
                  <div
                    className={`${styles.paymentMethodCard} ${
                      selectedPaymentMethod === 'bank-transfer' ? styles.selected : ''
                    }`}
                  >
                    <div className={styles.radioIndicator}>
                      <div className={styles.radioInner} />
                    </div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                        stroke="#A57865"
                        strokeWidth="2"
                      />
                      <path d="M9 22V12H15V22" stroke="#A57865" strokeWidth="2" />
                    </svg>
                    <div className={styles.paymentMethodText}>
                      <div className={styles.paymentMethodName}>Bank Transfer</div>
                      <div className={styles.paymentMethodDescription}>
                        Pay directly from your bank account
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Payment Method Details */}
              <div className={styles.paymentDetailsSection}>
                {/* Credit Card Form */}
                {selectedPaymentMethod === 'credit-card' && (
                  <CreditCardForm
                    onValidationChange={setIsCreditCardValid}
                    billingAddressSameAsGuest={billingAddressSameAsGuest}
                    onBillingAddressChange={setBillingAddressSameAsGuest}
                  />
                )}

                {/* PayPal Redirect Message */}
                {selectedPaymentMethod === 'paypal' && (
                  <div className={styles.infoBox}>
                    <Info size={20} strokeWidth={2} />
                    <div className={styles.infoBoxContent}>
                      <div className={styles.infoBoxTitle}>PayPal Redirect</div>
                      <div className={styles.infoBoxText}>
                        When you click "Complete Booking", you'll be securely redirected to PayPal
                        to log in and authorize the payment. You'll return to Glimmora to see your
                        booking confirmation.
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Instructions */}
                {selectedPaymentMethod === 'bank-transfer' && (
                  <div className={styles.instructionsBox}>
                    <div className={styles.instructionsHeader}>
                      <ShieldCheck size={20} strokeWidth={2} />
                      <span>Bank Transfer Instructions</span>
                    </div>
                    <div className={styles.instructionsContent}>
                      <ol className={styles.instructionsList}>
                        <li>
                          Your booking will be held for 24 hours pending payment confirmation
                        </li>
                        <li>
                          Transfer the total amount to the bank account details provided in your
                          confirmation email
                        </li>
                        <li>Include your booking reference number in the transfer notes</li>
                        <li>
                          Email your payment receipt to payments@glimmora.com for faster
                          confirmation
                        </li>
                      </ol>
                      <div className={styles.warningNote}>
                        <Info size={16} strokeWidth={2} />
                        <span>
                          Please note: Your room will be held for 24 hours. If payment is not
                          received within this time, your booking may be cancelled.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className={styles.buttonRow}>
                <button className={styles.backButton} onClick={handleBackClick}>
                  Back to Guest Details
                </button>
                <button
                  className={styles.completeButton}
                  onClick={handleCompleteBooking}
                  disabled={!isFormValid() || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader className={styles.spinner} size={20} strokeWidth={2} />
                      Processing...
                    </>
                  ) : (
                    'Complete Booking'
                  )}
                </button>
              </div>
            </div>

            {/* Right Column - Booking Summary */}
            <aside className={styles.summarySection}>
              <BookingSummary
                roomName={bookingData.roomName}
                roomImage={bookingData.roomImage}
                rating={bookingData.rating}
                checkIn={bookingData.checkIn}
                checkOut={bookingData.checkOut}
                guests={bookingData.guests}
                roomPrice={bookingData.roomPrice}
                nights={bookingData.nights}
                serviceFee={bookingData.serviceFee}
                taxes={bookingData.taxes}
                additionalOptions={bookingData.additionalOptions}
                freeCancellationDate={bookingData.freeCancellationDate}
                guestDetails={bookingData.guestDetails}
              />
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Payment;
