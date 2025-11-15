import React from 'react';
import { Check, Download, Home } from 'lucide-react';
import styles from './PreCheckIn.module.css';

interface SuccessViewProps {
  booking: {
    email: string;
    checkIn: string;
  };
}

const SuccessView: React.FC<SuccessViewProps> = ({ booking }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDownload = () => {
    console.log('Download confirmation');
  };

  const handleBackToHome = () => {
    console.log('Navigate to /');
  };

  return (
    <div className={styles.successContainer}>
      <div className={styles.successCard}>
        <div className={styles.successIcon}>
          <Check size={40} strokeWidth={3} />
        </div>

        <h2 className={styles.successTitle}>Pre Check-in Complete! 🎉</h2>
        <p className={styles.successSubtitle}>
          You're all set! We'll see you on {formatDate(booking.checkIn)}
        </p>

        <div className={styles.successDivider} />

        {/* What's Next Section */}
        <div className={styles.whatsNextSection}>
          <h3 className={styles.whatsNextHeader}>What's Next?</h3>

          <div className={styles.nextStepsList}>
            <div className={styles.nextStep}>
              <Check size={18} strokeWidth={2} className={styles.nextStepIcon} />
              <span>✓ Confirmation email sent to {booking.email}</span>
            </div>

            <div className={styles.nextStep}>
              <Check size={18} strokeWidth={2} className={styles.nextStepIcon} />
              <span>✓ Room will be ready by your arrival time</span>
            </div>

            <div className={styles.nextStep}>
              <Check size={18} strokeWidth={2} className={styles.nextStepIcon} />
              <span>✓ Skip the front desk - go directly to your room</span>
            </div>

            <div className={styles.nextStep}>
              <Check size={18} strokeWidth={2} className={styles.nextStepIcon} />
              <span>✓ Digital key sent to your mobile app</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.successButtons}>
          <button className={styles.downloadButton} onClick={handleDownload}>
            <Download size={18} strokeWidth={2} />
            Download Confirmation
          </button>

          <button className={styles.homeButton} onClick={handleBackToHome}>
            <Home size={18} strokeWidth={2} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessView;
