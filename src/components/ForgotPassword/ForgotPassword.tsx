import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Lock, Mail, ArrowLeft } from 'lucide-react';
import styles from './ForgotPassword.module.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const validateEmail = (email: string): string => {
    if (!email) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Validate on change if field was already touched
    if (touched) {
      setError(validateEmail(value));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateEmail(email));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark field as touched
    setTouched(true);

    // Validate email
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Password reset email sent to:', email);
      // Handle success state here (will be implemented next)
    } catch (err) {
      console.error('Failed to send reset email:', err);
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
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
            <Lock size={32} color="#A57865" strokeWidth={2} />
          </div>

          <h1 className={styles.title}>Forgot Your Password?</h1>
          <p className={styles.description}>
            No worries! Enter your email and we'll send you reset instructions.
          </p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address <span className={styles.required}>*</span>
              </label>
              <div className={styles.inputWrapper}>
                <Mail
                  size={20}
                  className={styles.inputIcon}
                  color="#808080"
                  strokeWidth={2}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleBlur}
                  className={`${styles.input} ${error && touched ? styles.inputError : ''}`}
                  placeholder="your.email@example.com"
                  aria-invalid={!!error && touched}
                  aria-describedby={error && touched ? 'email-error' : undefined}
                  disabled={isLoading}
                />
              </div>
              {error && touched && (
                <span id="email-error" className={styles.errorMessage} role="alert">
                  {error}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? 'SENDING...' : 'SEND RESET LINK'}
            </button>
          </form>

          <a href="/login" className={styles.backLink}>
            <ArrowLeft size={16} strokeWidth={2} />
            <span>Back to Sign In</span>
          </a>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
