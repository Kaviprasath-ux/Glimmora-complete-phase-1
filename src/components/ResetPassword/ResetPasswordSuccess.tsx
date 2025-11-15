import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import styles from './ResetPasswordSuccess.module.css';

interface ResetPasswordSuccessProps {
  onContinue?: () => void;
}

const ResetPasswordSuccess: React.FC<ResetPasswordSuccessProps> = ({ onContinue }) => {
  const [countdown, setCountdown] = useState(3);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto-redirect when countdown reaches 0
      handleContinue();
    }
  }, [countdown]);

  const handleContinue = () => {
    if (isRedirecting) return;

    setIsRedirecting(true);

    if (onContinue) {
      onContinue();
    } else {
      // Default: navigate to login page
      window.location.href = '/login';
    }
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
            <CheckCircle size={40} color="#27AE60" strokeWidth={2} />
          </div>

          <h1 className={styles.title}>Password Reset Successful!</h1>

          <p className={styles.description}>
            Your password has been successfully reset. You can now sign in with your new password.
          </p>

          <button
            type="button"
            onClick={handleContinue}
            className={styles.continueButton}
            disabled={isRedirecting}
          >
            {isRedirecting ? 'REDIRECTING...' : 'CONTINUE TO SIGN IN'}
          </button>

          {countdown > 0 && !isRedirecting && (
            <p className={styles.countdown}>
              Redirecting to sign in in {countdown}...
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResetPasswordSuccess;
