import React, { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { KeyRound, Eye, EyeOff, Check, Circle } from 'lucide-react';
import styles from './ResetPassword.module.css';

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

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({
    newPassword: false,
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

  // Calculate password requirements
  useEffect(() => {
    const newReqs: PasswordRequirements = {
      minLength: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    };
    setRequirements(newReqs);

    // Calculate password strength
    if (newPassword.length === 0) {
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
  }, [newPassword]);

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleNewPasswordBlur = () => {
    setTouched(prev => ({ ...prev, newPassword: true }));
  };

  const handleConfirmPasswordBlur = () => {
    setTouched(prev => ({ ...prev, confirmPassword: true }));
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
    return confirmPassword.length > 0 && newPassword === confirmPassword;
  };

  const isFormValid = () => {
    return isPasswordValid() && isConfirmPasswordValid();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      newPassword: true,
      confirmPassword: true,
    });

    if (!isFormValid()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Password reset successfully');
      // Show success screen (will be implemented next)
    } catch (error) {
      console.error('Failed to reset password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const RequirementItem: React.FC<{ met: boolean; text: string }> = ({ met, text }) => (
    <div className={styles.requirement}>
      {met ? (
        <Check size={12} color="#27AE60" strokeWidth={3} />
      ) : (
        <Circle size={12} color="#808080" strokeWidth={2} />
      )}
      <span className={met ? styles.requirementMet : styles.requirementUnmet}>
        {text}
      </span>
    </div>
  );

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
            <KeyRound size={32} color="#A57865" strokeWidth={2} />
          </div>

          <h1 className={styles.title}>Create New Password</h1>
          <p className={styles.description}>
            Your new password must be different from previously used passwords.
          </p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* New Password Field */}
            <div className={styles.formGroup}>
              <label htmlFor="newPassword" className={styles.label}>
                New Password <span className={styles.required}>*</span>
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  onBlur={handleNewPasswordBlur}
                  className={styles.input}
                  placeholder="Enter new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className={styles.passwordToggle}
                  aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading}
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {newPassword.length > 0 && (
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

            {/* Password Requirements */}
            {newPassword.length > 0 && (
              <div className={styles.requirementsContainer}>
                <p className={styles.requirementsTitle}>Password Requirements:</p>
                <RequirementItem met={requirements.minLength} text="At least 8 characters" />
                <RequirementItem met={requirements.hasUppercase} text="One uppercase letter" />
                <RequirementItem met={requirements.hasLowercase} text="One lowercase letter" />
                <RequirementItem met={requirements.hasNumber} text="One number" />
                <RequirementItem met={requirements.hasSpecial} text="One special character (optional)" />
              </div>
            )}

            {/* Confirm Password Field */}
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm New Password <span className={styles.required}>*</span>
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onBlur={handleConfirmPasswordBlur}
                  className={`${styles.input} ${
                    touched.confirmPassword && confirmPassword.length > 0 && !isConfirmPasswordValid()
                      ? styles.inputError
                      : ''
                  }`}
                  placeholder="Confirm new password"
                  disabled={isLoading}
                  aria-invalid={touched.confirmPassword && !isConfirmPasswordValid()}
                  aria-describedby={
                    touched.confirmPassword && !isConfirmPasswordValid()
                      ? 'confirm-error'
                      : undefined
                  }
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
                <span id="confirm-error" className={styles.errorMessage} role="alert">
                  Passwords do not match
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isFormValid() || isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? 'RESETTING PASSWORD...' : 'RESET PASSWORD'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
