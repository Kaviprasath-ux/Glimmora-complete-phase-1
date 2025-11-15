import React from 'react';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import styles from './Home.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Footer Grid */}
        <div className={styles.footerGrid}>
          {/* Column 1 - Brand */}
          <div className={styles.footerColumn}>
            <div className={styles.footerLogo}>GLIMMORA</div>
            <p className={styles.footerBrandDescription}>
              Experience luxury and comfort at Glimmora Hotel. Your perfect stay awaits.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Quick Links</h4>
            <div className={styles.footerLinks}>
              <a href="/" className={styles.footerLink}>Home</a>
              <a href="/rooms" className={styles.footerLink}>Rooms</a>
              <a href="/services" className={styles.footerLink}>Services</a>
              <a href="/pre-check-in" className={styles.footerLink}>Pre Check-in</a>
              <a href="/about" className={styles.footerLink}>About</a>
              <a href="/contact" className={styles.footerLink}>Contact</a>
            </div>
          </div>

          {/* Column 3 - Contact */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Contact Us</h4>
            <div className={styles.footerContactItems}>
              <div className={styles.footerContactItem}>
                <MapPin size={16} strokeWidth={2} />
                <span>123 Luxury Ave, Dubai, UAE</span>
              </div>
              <div className={styles.footerContactItem}>
                <Mail size={16} strokeWidth={2} />
                <span>info@glimmora.com</span>
              </div>
              <div className={styles.footerContactItem}>
                <Phone size={16} strokeWidth={2} />
                <span>+971 4 123 4567</span>
              </div>
            </div>
          </div>

          {/* Column 4 - Social */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Follow Us</h4>
            <div className={styles.footerSocialIcons}>
              <a href="https://facebook.com" className={styles.footerSocialIcon} target="_blank" rel="noopener noreferrer">
                <Facebook size={24} strokeWidth={2} />
              </a>
              <a href="https://twitter.com" className={styles.footerSocialIcon} target="_blank" rel="noopener noreferrer">
                <Twitter size={24} strokeWidth={2} />
              </a>
              <a href="https://instagram.com" className={styles.footerSocialIcon} target="_blank" rel="noopener noreferrer">
                <Instagram size={24} strokeWidth={2} />
              </a>
              <a href="https://linkedin.com" className={styles.footerSocialIcon} target="_blank" rel="noopener noreferrer">
                <Linkedin size={24} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>
            © 2024 Glimmora Hotel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
