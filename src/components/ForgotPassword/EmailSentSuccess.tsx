import React, { useState, useEffect } from 'react';
import { MailCheck } from 'lucide-react';
import styles from './EmailSentSuccess.module.css';

interface EmailSentSuccessProps {
  email: string;
  onResend: () => void;
}

const EmailSentSuccess: React.FC<EmailSentSuccessProps> = ({ email, onResend }) => {
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (cooldownSeconds > 0) {
      const timer = setTimeout(() => {
        setCooldownSeconds(cooldownSeconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownSeconds]);

  const handleOpenEmail = () => {
    // Opens default email client
    window.location.href = 'mailto:';
  };

  const handleResend = async () => {
    if (cooldownSeconds > 0) return;

    setIsResending(true);

    try {
      // Call the parent's resend handler
      await onResend();

      // Start 60-second cooldown
      setCooldownSeconds(60);

      // Show success feedback (can be enhanced with a toast notification)
      console.log('Email sent again!');
    } catch (error) {
      console.error('Failed to resend email:', error);
    } finally {
      setIsResending(false);
    }
  };

  const getResendButtonText = () => {
    if (isResending) return 'SENDING...';
    if (cooldownSeconds > 0) return `RESEND AVAILABLE IN ${cooldownSeconds}S`;
    return 'RESEND EMAIL';
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>GLIMMORA</div>
          <nav className={styles.nav}>
            <a href="#home" className={styles.navLink}>Home</a>
            <a href="#rooms" className={styles.navLink}>Rooms</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <MailCheck size={32} color="#27AE60" strokeWidth={2} />
          </div>

          <h1 className={styles.title}>Check Your Email!</h1>

          <p className={styles.description}>
            We've sent password reset instructions to:
          </p>

          <div className={styles.emailDisplay}>
            {email}
          </div>

          <p className={styles.expiryNotice}>
            The link will expire in 30 minutes
          </p>

          <button
            type="button"
            onClick={handleOpenEmail}
            className={styles.primaryButton}
          >
            OPEN EMAIL APP
          </button>

          <button
            type="button"
            onClick={handleResend}
            className={styles.secondaryButton}
            disabled={cooldownSeconds > 0 || isResending}
          >
            {getResendButtonText()}
          </button>

          <div className={styles.divider}></div>

          <p className={styles.helpText}>Didn't receive the email?</p>

          <div className={styles.helpLinks}>
            <a href="#spam" className={styles.helpLink}>Check spam</a>
            <span className={styles.separator}>•</span>
            <a href="#contact" className={styles.helpLink}>Contact us</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmailSentSuccess;
