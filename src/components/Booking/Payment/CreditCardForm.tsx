import React, { useState } from 'react';
import { AlertCircle, CreditCard, Lock, Check } from 'lucide-react';
import styles from './CreditCardForm.module.css';

interface CreditCardFormProps {
  onValidationChange: (isValid: boolean) => void;
  billingAddressSameAsGuest: boolean;
  onBillingAddressChange: (sameAsGuest: boolean) => void;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  onValidationChange,
  billingAddressSameAsGuest,
  onBillingAddressChange,
}) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    streetAddress: '',
    city: '',
    postalCode: '',
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  // Format card number: #### #### #### ####
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{1,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : '';
  };

  // Format expiry date: MM / YY
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + ' / ' + v.substring(2, 4);
    }
    return v;
  };

  // Validate card number (basic Luhn algorithm)
  const validateCardNumber = (value: string) => {
    const num = value.replace(/\s/g, '');
    if (!num) return 'Card number is required';
    if (num.length !== 16) return 'Card number must be 16 digits';
    return '';
  };

  // Validate cardholder name
  const validateCardholderName = (value: string) => {
    if (!value.trim()) return 'Cardholder name is required';
    if (value.trim().length < 3) return 'Name must be at least 3 characters';
    if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters and spaces allowed';
    return '';
  };

  // Validate expiry date
  const validateExpiry = (value: string) => {
    if (!value) return 'Expiry date is required';
    const parts = value.split(' / ');
    if (parts.length !== 2) return 'Invalid format (MM / YY)';

    const month = parseInt(parts[0], 10);
    const year = parseInt('20' + parts[1], 10);

    if (month < 1 || month > 12) return 'Invalid month';

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Card has expired';
    }

    return '';
  };

  // Validate CVV
  const validateCVV = (value: string) => {
    if (!value) return 'CVV is required';
    if (value.length < 3 || value.length > 4) return 'CVV must be 3-4 digits';
    if (!/^[0-9]+$/.test(value)) return 'CVV must be numeric';
    return '';
  };

  // Validate billing address fields
  const validateStreetAddress = (value: string) => {
    if (billingAddressSameAsGuest) return '';
    if (!value.trim()) return 'Street address is required';
    if (value.trim().length < 5) return 'Address must be at least 5 characters';
    return '';
  };

  const validateCity = (value: string) => {
    if (billingAddressSameAsGuest) return '';
    if (!value.trim()) return 'City is required';
    if (value.trim().length < 2) return 'City must be at least 2 characters';
    return '';
  };

  const validatePostalCode = (value: string) => {
    if (billingAddressSameAsGuest) return '';
    if (!value.trim()) return 'Postal code is required';
    return '';
  };

  // Validate field
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'cardNumber':
        return validateCardNumber(value);
      case 'cardholderName':
        return validateCardholderName(value);
      case 'expiryDate':
        return validateExpiry(value);
      case 'cvv':
        return validateCVV(value);
      case 'streetAddress':
        return validateStreetAddress(value);
      case 'city':
        return validateCity(value);
      case 'postalCode':
        return validatePostalCode(value);
      default:
        return '';
    }
  };

  // Check if form is valid
  const checkFormValid = (currentFormData = formData, currentErrors = errors) => {
    const requiredFields = ['cardNumber', 'cardholderName', 'expiryDate', 'cvv'];

    if (!billingAddressSameAsGuest) {
      requiredFields.push('streetAddress', 'city', 'postalCode');
    }

    const hasAllFields = requiredFields.every((field) => currentFormData[field as keyof typeof formData].trim() !== '');
    const hasNoErrors = Object.values(currentErrors).every((error) => error === '');

    return hasAllFields && hasNoErrors;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Apply formatting
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiry(value);
    } else if (name === 'cardholderName') {
      formattedValue = value.toUpperCase();
    } else if (name === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }

    const newFormData = { ...formData, [name]: formattedValue };
    setFormData(newFormData);

    // Clear error when user starts typing
    if (errors[name]) {
      const newErrors = { ...errors, [name]: '' };
      setErrors(newErrors);
      onValidationChange(checkFormValid(newFormData, newErrors));
    } else {
      onValidationChange(checkFormValid(newFormData, errors));
    }
  };

  // Handle blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    const newErrors = { ...errors, [name]: error };
    setErrors(newErrors);
    onValidationChange(checkFormValid(formData, newErrors));
  };

  // Handle billing address checkbox
  const handleBillingAddressCheckbox = () => {
    const newValue = !billingAddressSameAsGuest;
    onBillingAddressChange(newValue);

    // Clear billing address errors when checkbox is checked
    if (newValue) {
      const newErrors = { ...errors };
      delete newErrors.streetAddress;
      delete newErrors.city;
      delete newErrors.postalCode;
      setErrors(newErrors);
      onValidationChange(checkFormValid(formData, newErrors));
    }
  };

  return (
    <div className={styles.creditCardForm}>
      {/* Section Header */}
      <h3 className={styles.sectionHeader}>Card Information</h3>

      {/* Card Number */}
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Card Number *</label>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            name="cardNumber"
            className={`${styles.input} ${touched.cardNumber && errors.cardNumber ? styles.inputError : ''}`}
            value={formData.cardNumber}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
          <CreditCard className={styles.inputIcon} size={20} strokeWidth={2} />
        </div>
        {touched.cardNumber && errors.cardNumber && (
          <div className={styles.errorMessage}>
            <AlertCircle size={14} strokeWidth={2} />
            {errors.cardNumber}
          </div>
        )}
      </div>

      {/* Cardholder Name */}
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Cardholder Name *</label>
        <input
          type="text"
          name="cardholderName"
          className={`${styles.input} ${touched.cardholderName && errors.cardholderName ? styles.inputError : ''}`}
          value={formData.cardholderName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="JOHN DOE"
        />
        {touched.cardholderName && errors.cardholderName && (
          <div className={styles.errorMessage}>
            <AlertCircle size={14} strokeWidth={2} />
            {errors.cardholderName}
          </div>
        )}
      </div>

      {/* Expiry & CVV Row */}
      <div className={styles.expiryRow}>
        {/* Expiry Date */}
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Expiry Date *</label>
          <input
            type="text"
            name="expiryDate"
            className={`${styles.input} ${touched.expiryDate && errors.expiryDate ? styles.inputError : ''}`}
            value={formData.expiryDate}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="MM / YY"
            maxLength={7}
          />
          {touched.expiryDate && errors.expiryDate && (
            <div className={styles.errorMessage}>
              <AlertCircle size={14} strokeWidth={2} />
              {errors.expiryDate}
            </div>
          )}
        </div>

        {/* CVV */}
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>CVV *</label>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              name="cvv"
              className={`${styles.input} ${touched.cvv && errors.cvv ? styles.inputError : ''}`}
              value={formData.cvv}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="123"
              maxLength={4}
            />
            <Lock className={styles.inputIcon} size={16} strokeWidth={2} />
          </div>
          {touched.cvv && errors.cvv && (
            <div className={styles.errorMessage}>
              <AlertCircle size={14} strokeWidth={2} />
              {errors.cvv}
            </div>
          )}
        </div>
      </div>

      {/* Billing Address Section */}
      <h3 className={styles.sectionHeader}>Billing Address</h3>

      {/* Same as Guest Info Checkbox */}
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          className={styles.hiddenCheckbox}
          checked={billingAddressSameAsGuest}
          onChange={handleBillingAddressCheckbox}
        />
        <div className={styles.customCheckbox}>
          {billingAddressSameAsGuest && <Check size={12} strokeWidth={2} />}
        </div>
        <span>Same as guest information</span>
      </label>

      {/* Billing Address Fields (hidden when checkbox checked) */}
      {!billingAddressSameAsGuest && (
        <>
          {/* Street Address */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Street Address *</label>
            <input
              type="text"
              name="streetAddress"
              className={`${styles.input} ${touched.streetAddress && errors.streetAddress ? styles.inputError : ''}`}
              value={formData.streetAddress}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {touched.streetAddress && errors.streetAddress && (
              <div className={styles.errorMessage}>
                <AlertCircle size={14} strokeWidth={2} />
                {errors.streetAddress}
              </div>
            )}
          </div>

          {/* City & Postal Code Row */}
          <div className={styles.expiryRow}>
            {/* City */}
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>City *</label>
              <input
                type="text"
                name="city"
                className={`${styles.input} ${touched.city && errors.city ? styles.inputError : ''}`}
                value={formData.city}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {touched.city && errors.city && (
                <div className={styles.errorMessage}>
                  <AlertCircle size={14} strokeWidth={2} />
                  {errors.city}
                </div>
              )}
            </div>

            {/* Postal Code */}
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Postal Code *</label>
              <input
                type="text"
                name="postalCode"
                className={`${styles.input} ${touched.postalCode && errors.postalCode ? styles.inputError : ''}`}
                value={formData.postalCode}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {touched.postalCode && errors.postalCode && (
                <div className={styles.errorMessage}>
                  <AlertCircle size={14} strokeWidth={2} />
                  {errors.postalCode}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Security Badges */}
      <div className={styles.securityBadges}>
        <div className={styles.securityBadge}>
          <Lock size={18} strokeWidth={2} />
          <div className={styles.badgeText}>
            Secure Payment
            <br />
            256-bit SSL Encrypted
          </div>
        </div>
        <div className={styles.securityBadge}>
          <Lock size={18} strokeWidth={2} />
          <div className={styles.badgeText}>
            PCI DSS Compliant
            <br />
            Secure Processing
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
