import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import styles from './Login.module.css';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });

  const validateEmail = (email: string): string | undefined => {
    if (!email) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    return !emailError && !passwordError;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Validate on change if field was already touched
    if (touched[name as keyof typeof touched]) {
      if (name === 'email') {
        setErrors(prev => ({ ...prev, email: validateEmail(value) }));
      } else if (name === 'password') {
        setErrors(prev => ({ ...prev, password: validatePassword(value) }));
      }
    }
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched(prev => ({ ...prev, [field]: true }));

    if (field === 'email') {
      setErrors(prev => ({ ...prev, email: validateEmail(formData.email) }));
    } else if (field === 'password') {
      setErrors(prev => ({ ...prev, password: validatePassword(formData.password) }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ email: true, password: true });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Login successful:', formData);
      // Handle successful login here
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error here
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    console.log(`Login with ${provider}`);
    // Handle social login here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
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
          <button className={styles.skipButton} aria-label="Skip to content">
            Skip →
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.brandName}>GLIMMORA</div>

          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to your account</p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => handleBlur('email')}
                className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`}
                placeholder="Enter your email"
                aria-invalid={!!errors.email && touched.email}
                aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                disabled={isLoading}
              />
              {errors.email && touched.email && (
                <span id="email-error" className={styles.errorMessage} role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password <span className={styles.required}>*</span>
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('password')}
                  className={`${styles.input} ${errors.password && touched.password ? styles.inputError : ''}`}
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password && touched.password}
                  aria-describedby={errors.password && touched.password ? 'password-error' : undefined}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles.passwordToggle}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading}
                >
                  {showPassword ? '👁' : '👁'}
                </button>
              </div>
              {errors.password && touched.password && (
                <span id="password-error" className={styles.errorMessage} role="alert">
                  {errors.password}
                </span>
              )}
            </div>

            <div className={styles.formOptions}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className={styles.checkbox}
                  disabled={isLoading}
                />
                <span className={styles.checkboxText}>Remember me</span>
              </label>
              <a href="#forgot-password" className={styles.forgotPassword}>
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>

            <div className={styles.divider}>
              <span className={styles.dividerText}>or continue with</span>
            </div>

            <div className={styles.socialButtons}>
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className={styles.socialButton}
                disabled={isLoading}
                aria-label="Sign in with Google"
              >
                <span className={styles.socialIcon}>🔍</span>
                <span className={styles.socialButtonText}>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className={styles.socialButton}
                disabled={isLoading}
                aria-label="Sign in with Facebook"
              >
                <span className={styles.socialIcon}>📘</span>
                <span className={styles.socialButtonText}>Facebook</span>
              </button>
            </div>
          </form>

          <div className={styles.footer}>
            <span className={styles.footerText}>Don't have an account?</span>
            <a href="#signup" className={styles.signupLink}>Sign Up</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
