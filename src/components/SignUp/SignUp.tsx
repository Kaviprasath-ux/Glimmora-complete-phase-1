import React, { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Eye, EyeOff, Chrome, Facebook } from 'lucide-react';
import styles from './SignUp.module.css';

interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

interface PasswordStrength {
  score: number;
  text: string;
  color: string;
}

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const [requirements, setRequirements] = useState<PasswordRequirements>({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    text: '',
    color: '#E8E4E0',
  });

  // Calculate password requirements and strength
  useEffect(() => {
    const newReqs: PasswordRequirements = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setRequirements(newReqs);

    // Calculate password strength
    if (password.length === 0) {
      setPasswordStrength({ score: 0, text: '', color: '#E8E4E0' });
      return;
    }

    let score = 0;
    if (newReqs.minLength) score += 25;
    if (newReqs.hasUppercase) score += 25;
    if (newReqs.hasLowercase) score += 25;
    if (newReqs.hasNumber) score += 25;
    if (newReqs.hasSpecial) score += 10; // Bonus points

    let text = '';
    let color = '';

    if (score <= 33) {
      text = 'Weak';
      color = '#DC3545';
    } else if (score <= 66) {
      text = 'Medium';
      color = '#FFA500';
    } else {
      text = 'Strong';
      color = '#27AE60';
    }

    setPasswordStrength({ score: Math.min(score, 100), text, color });
  }, [password]);

  // Format phone number as user types: +1 (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '');

    // Format based on length
    if (phoneNumber.length === 0) return '';
    if (phoneNumber.length <= 3) return `+1 (${phoneNumber}`;
    if (phoneNumber.length <= 6) return `+1 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `+1 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = () => {
    return (
      requirements.minLength &&
      requirements.hasUppercase &&
      requirements.hasLowercase &&
      requirements.hasNumber
    );
  };

  const isConfirmPasswordValid = () => {
    return confirmPassword.length > 0 && password === confirmPassword;
  };

  const isFormValid = () => {
    return (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      isValidEmail(email) &&
      isPasswordValid() &&
      isConfirmPasswordValid() &&
      termsAccepted
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    if (!isFormValid()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Account created successfully:', {
        firstName,
        lastName,
        email,
        phone,
        marketingAccepted,
      });
      // TODO: Navigate to email verification screen
    } catch (error) {
      console.error('Failed to create account:', error);
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
          <h1 className={styles.title}>Create Your Account</h1>
          <p className={styles.description}>
            Join Glimmora for exclusive member benefits
          </p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* First Name & Last Name (Side by Side) */}
            <div className={styles.nameRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  First Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  onBlur={() => handleBlur('firstName')}
                  className={`${styles.input} ${
                    touched.firstName && firstName.trim().length === 0 ? styles.inputError : ''
                  }`}
                  placeholder="John"
                  disabled={isLoading}
                  aria-invalid={touched.firstName && firstName.trim().length === 0}
                />
                {touched.firstName && firstName.trim().length === 0 && (
                  <span className={styles.errorMessage} role="alert">
                    First name is required
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                  onBlur={() => handleBlur('lastName')}
                  className={`${styles.input} ${
                    touched.lastName && lastName.trim().length === 0 ? styles.inputError : ''
                  }`}
                  placeholder="Doe"
                  disabled={isLoading}
                  aria-invalid={touched.lastName && lastName.trim().length === 0}
                />
                {touched.lastName && lastName.trim().length === 0 && (
                  <span className={styles.errorMessage} role="alert">
                    Last name is required
                  </span>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur('email')}
                className={`${styles.input} ${
                  touched.email && !isValidEmail(email) ? styles.inputError : ''
                }`}
                placeholder="john.doe@example.com"
                disabled={isLoading}
                aria-invalid={touched.email && !isValidEmail(email)}
              />
              {touched.email && !isValidEmail(email) && (
                <span className={styles.errorMessage} role="alert">
                  Please enter a valid email address
                </span>
              )}
            </div>

            {/* Phone Number (Optional) */}
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone Number <span className={styles.optional}>(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={() => handleBlur('phone')}
                className={styles.input}
                placeholder="+1 (___) ___-____"
                disabled={isLoading}
                maxLength={18}
              />
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password <span className={styles.required}>*</span>
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur('password')}
                  className={styles.input}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordToggle}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div className={styles.strengthContainer}>
                <div className={styles.strengthBar}>
                  <div
                    className={styles.strengthFill}
                    style={{
                      width: `${passwordStrength.score}%`,
                      backgroundColor: passwordStrength.color,
                    }}
                  />
                </div>
                <span
                  className={styles.strengthText}
                  style={{ color: passwordStrength.color }}
                >
                  {passwordStrength.text}
                </span>
              </div>
            )}

            {/* Confirm Password */}
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password <span className={styles.required}>*</span>
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onBlur={() => handleBlur('confirmPassword')}
                  className={`${styles.input} ${
                    touched.confirmPassword && confirmPassword.length > 0 && !isConfirmPasswordValid()
                      ? styles.inputError
                      : ''
                  }`}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                  aria-invalid={touched.confirmPassword && !isConfirmPasswordValid()}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={styles.passwordToggle}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {touched.confirmPassword && confirmPassword.length > 0 && !isConfirmPasswordValid() && (
                <span className={styles.errorMessage} role="alert">
                  Passwords do not match
                </span>
              )}
            </div>

            {/* Terms Checkbox (Required) */}
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className={styles.checkbox}
                  disabled={isLoading}
                  required
                />
                <span className={styles.checkboxText}>
                  I agree to the{' '}
                  <a href="#terms" className={styles.link}>Terms of Service</a>
                  {' '}and{' '}
                  <a href="#privacy" className={styles.link}>Privacy Policy</a>
                  <span className={styles.required}> *</span>
                </span>
              </label>
            </div>

            {/* Marketing Checkbox (Optional) */}
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={marketingAccepted}
                  onChange={(e) => setMarketingAccepted(e.target.checked)}
                  className={styles.checkbox}
                  disabled={isLoading}
                />
                <span className={styles.checkboxText}>
                  Send me exclusive offers and travel tips
                </span>
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isFormValid() || isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <span className={styles.dividerText}>or sign up with</span>
          </div>

          {/* Social Sign Up Buttons */}
          <div className={styles.socialButtons}>
            <button
              type="button"
              className={styles.socialButton}
              disabled={isLoading}
              aria-label="Sign up with Google"
            >
              <Chrome size={20} strokeWidth={2} />
              <span>Google</span>
            </button>
            <button
              type="button"
              className={styles.socialButton}
              disabled={isLoading}
              aria-label="Sign up with Facebook"
            >
              <Facebook size={20} strokeWidth={2} />
              <span>Facebook</span>
            </button>
          </div>

          {/* Sign In Link */}
          <div className={styles.signInLink}>
            Already have an account?{' '}
            <a href="#signin" className={styles.link}>Sign In</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
