import React, { useState } from 'react';
import { Send, Loader, CheckCircle, AlertCircle, Check, ChevronDown } from 'lucide-react';
import styles from './ContactForm.module.css';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    privacyAccepted: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false,
    privacyAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Validation functions
  const validateName = (value: string) => {
    if (!value) return 'Name is required';
    if (value.length < 2) return 'Name must be at least 2 characters';
    return '';
  };

  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  };

  const validateSubject = (value: string) => {
    if (!value) return 'Please select a subject';
    return '';
  };

  const validateMessage = (value: string) => {
    if (!value) return 'Message is required';
    if (value.length < 10) return 'Message must be at least 10 characters';
    return '';
  };

  const validatePrivacy = (value: boolean) => {
    if (!value) return 'You must accept the privacy policy';
    return '';
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear submit status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  // Handle blur (validation trigger)
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    let error = '';
    switch (field) {
      case 'name':
        error = validateName(formData.name);
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'subject':
        error = validateSubject(formData.subject);
        break;
      case 'message':
        error = validateMessage(formData.message);
        break;
      case 'privacyAccepted':
        error = validatePrivacy(formData.privacyAccepted);
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      !validateName(formData.name) &&
      !validateEmail(formData.email) &&
      !validateSubject(formData.subject) &&
      !validateMessage(formData.message) &&
      !validatePrivacy(formData.privacyAccepted)
    );
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
      privacyAccepted: true,
    });

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const subjectError = validateSubject(formData.subject);
    const messageError = validateMessage(formData.message);
    const privacyError = validatePrivacy(formData.privacyAccepted);

    setErrors({
      name: nameError,
      email: emailError,
      subject: subjectError,
      message: messageError,
      privacyAccepted: privacyError,
    });

    // Check if form is valid
    if (nameError || emailError || subjectError || messageError || privacyError) {
      return;
    }

    // Submit form
    setIsSubmitting(true);

    // Simulate API call (2 seconds)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success
      setSubmitStatus('success');
      setIsSubmitting(false);

      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacyAccepted: false,
      });

      setTouched({
        name: false,
        email: false,
        phone: false,
        subject: false,
        message: false,
        privacyAccepted: false,
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactFormContainer}>
      <h2 className={styles.formTitle}>Send Us a Message</h2>
      <p className={styles.formSubtitle}>We'll get back to you within 24 hours</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Name Field */}
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ''}`}
            placeholder="John Doe"
          />
          {touched.name && errors.name && <div className={styles.errorText}>{errors.name}</div>}
        </div>

        {/* Email Field */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`}
            placeholder="john@example.com"
          />
          {touched.email && errors.email && <div className={styles.errorText}>{errors.email}</div>}
        </div>

        {/* Phone Field */}
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={() => handleBlur('phone')}
            className={styles.input}
            placeholder="+971 50 123 4567"
          />
        </div>

        {/* Subject Field */}
        <div className={styles.formGroup}>
          <label htmlFor="subject" className={styles.label}>
            Subject *
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onBlur={() => handleBlur('subject')}
              className={`${styles.select} ${
                touched.subject && errors.subject ? styles.inputError : ''
              }`}
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="reservation">Reservation</option>
              <option value="feedback">Feedback</option>
              <option value="support">Support</option>
              <option value="other">Other</option>
            </select>
            <ChevronDown size={18} className={styles.selectIcon} />
          </div>
          {touched.subject && errors.subject && (
            <div className={styles.errorText}>{errors.subject}</div>
          )}
        </div>

        {/* Message Field */}
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={() => handleBlur('message')}
            className={`${styles.textarea} ${
              touched.message && errors.message ? styles.inputError : ''
            }`}
            placeholder="How can we help you?"
            rows={6}
          />
          {touched.message && errors.message && (
            <div className={styles.errorText}>{errors.message}</div>
          )}
        </div>

        {/* Privacy Policy Checkbox */}
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="privacyAccepted"
              checked={formData.privacyAccepted}
              onChange={handleChange}
              onBlur={() => handleBlur('privacyAccepted')}
              className={styles.hiddenCheckbox}
            />
            <div className={styles.customCheckbox}>
              {formData.privacyAccepted && <Check size={12} strokeWidth={3} />}
            </div>
            <span className={styles.checkboxText}>
              I agree to the{' '}
              <a href="/privacy-policy" className={styles.privacyLink}>
                Privacy Policy
              </a>{' '}
              *
            </span>
          </label>
          {touched.privacyAccepted && errors.privacyAccepted && (
            <div className={styles.errorText}>{errors.privacyAccepted}</div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!isFormValid() || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader className={styles.spinner} size={20} strokeWidth={2} />
              Sending...
            </>
          ) : (
            <>
              <Send size={20} strokeWidth={2} />
              Send Message
            </>
          )}
        </button>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className={styles.successMessage}>
            <CheckCircle size={20} strokeWidth={2} />
            <span>Message sent successfully! We'll get back to you soon.</span>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className={styles.errorMessage}>
            <AlertCircle size={20} strokeWidth={2} />
            <span>Failed to send message. Please try again.</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
