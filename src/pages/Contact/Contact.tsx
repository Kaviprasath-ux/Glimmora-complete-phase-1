import React from 'react';
import { ChevronRight, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Navigation from '../../components/Home/Navigation';
import Footer from '../../components/Home/Footer';
import ContactCard from '../../components/Contact/ContactCard';
import ContactForm from '../../components/Contact/ContactForm';
import FAQAccordion from '../../components/Contact/FAQAccordion';
import styles from './Contact.module.css';

interface ContactProps {
  isAuthenticated: boolean;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const Contact: React.FC<ContactProps> = ({ isAuthenticated, user }) => {
  const handlePhoneClick = () => {
    window.location.href = 'tel:+97141234567';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@glimmora.com';
  };

  const handleSocialClick = (platform: string) => {
    console.log(`Navigate to ${platform}`);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Navigation */}
      <Navigation
        isAuthenticated={isAuthenticated}
        userName={user ? `${user.firstName} ${user.lastName}` : undefined}
        userEmail={user?.email}
        userInitials={user ? `${user.firstName[0]}${user.lastName[0]}` : undefined}
        activeTab="contact"
      />

      {/* Breadcrumb */}
      <div className={styles.breadcrumbContainer}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbLink}>Home</span>
          <ChevronRight size={16} strokeWidth={2} />
          <span className={styles.breadcrumbCurrent}>Contact</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Get in Touch</h1>
          <p className={styles.heroSubtitle}>
            We're here to help! Reach out to us for any inquiries, reservations, or assistance
          </p>
        </div>
      </section>

      {/* Contact Info Cards (Overlapping Hero) */}
      <section className={styles.contactCardsSection}>
        <div className={styles.contactCardsGrid}>
          <ContactCard
            icon={Phone}
            title="Call Us"
            mainInfo="+971 4 123 4567"
            secondaryInfo="Available 24/7"
            isClickable
            onClick={handlePhoneClick}
          />

          <ContactCard
            icon={Mail}
            title="Email Us"
            mainInfo="info@glimmora.com"
            secondaryInfo="Response within 24 hours"
            isClickable
            onClick={handleEmailClick}
          />

          <ContactCard
            icon={MapPin}
            title="Visit Us"
            mainInfo={'123 Luxury Avenue\nDowntown Dubai, UAE'}
            secondaryInfo="Hours: Mon-Sun 24/7 Reception"
          />
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className={styles.mainContent}>
        <div className={styles.contentGrid}>
          {/* Left Column - Contact Form */}
          <div className={styles.leftColumn}>
            <ContactForm />
          </div>

          {/* Right Column - Info & Map */}
          <div className={styles.rightColumn}>
            {/* Office Hours Card */}
            <div className={styles.infoCard}>
              <h3 className={styles.cardHeader}>Office Hours</h3>

              <div className={styles.hoursRows}>
                <div className={styles.hoursRow}>
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Sunday</span>
                  <span>10:00 AM - 2:00 PM</span>
                </div>
              </div>

              <div className={styles.emergencyLine}>
                <Phone size={16} strokeWidth={2} />
                <span>24/7 Emergency Line</span>
              </div>
            </div>

            {/* Location Map Card */}
            <div className={styles.mapCard}>
              <h3 className={styles.cardHeader}>Our Location</h3>

              <div className={styles.mapPlaceholder}>
                <span>Map integration (Google Maps)</span>
              </div>

              <div className={styles.mapAddress}>
                123 Luxury Avenue<br />
                Downtown Dubai, UAE
              </div>
            </div>

            {/* Social Media Card */}
            <div className={styles.socialCard}>
              <h3 className={styles.cardHeader}>Follow Us</h3>

              <div className={styles.socialIcons}>
                <div className={styles.socialIcon} onClick={() => handleSocialClick('Facebook')}>
                  <Facebook size={20} strokeWidth={2} />
                </div>
                <div className={styles.socialIcon} onClick={() => handleSocialClick('Instagram')}>
                  <Instagram size={20} strokeWidth={2} />
                </div>
                <div className={styles.socialIcon} onClick={() => handleSocialClick('Twitter')}>
                  <Twitter size={20} strokeWidth={2} />
                </div>
                <div className={styles.socialIcon} onClick={() => handleSocialClick('LinkedIn')}>
                  <Linkedin size={20} strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordion />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
