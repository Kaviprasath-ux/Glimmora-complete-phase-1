import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import logoImage from '../../assets/logo 1.png';
import styles from './ResetPasswordSuccess.module.css';

interface ResetPasswordSuccessProps {
  onContinue?: () => void;
}

const ResetPasswordSuccess: React.FC<ResetPasswordSuccessProps> = ({ onContinue }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleContinue = () => {
    if (isRedirecting) return;

    setIsRedirecting(true);

    if (onContinue) {
      onContinue();
    } else {
      // Default: navigate to login page
      navigate('/login');
    }
  };

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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logoLink}>
            <img src={logoImage} alt="Glimmora Hotel" className={styles.logo} />
          </Link>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/rooms" className={styles.navLink}>Rooms</Link>
            <Link to="/contact" className={styles.navLink}>Contact</Link>
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
