import React from 'react';
import { Bell } from 'lucide-react';
import styles from './Home.module.css';

interface NavigationProps {
  isAuthenticated: boolean;
  userName?: string;
  userInitials?: string;
  notificationCount?: number;
  activeTab?: string;
  onSignOut?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  isAuthenticated,
  userName = 'Guest',
  userInitials = 'G',
  notificationCount = 0,
  activeTab = 'home',
  onSignOut,
}) => {
  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    }
    // Redirect to home
    window.location.href = '/';
  };

  const handleBookNow = () => {
    window.location.href = '/rooms';
  };

  return (
    <nav className={styles.topNav}>
      <div className={styles.navContent}>
        {/* Left Side - Logo */}
        <div className={styles.navLeft}>
          <a href="/" className={styles.logo}>
            GLIMMORA
          </a>

          {/* Middle - Nav Items (Dynamic based on auth) */}
          <div className={styles.navItems}>
            {!isAuthenticated ? (
              <>
                <a
                  href="/rooms"
                  className={`${styles.navItem} ${
                    activeTab === 'rooms' ? styles.navItemActive : ''
                  }`}
                >
                  Rooms
                </a>
                <a
                  href="/services"
                  className={`${styles.navItem} ${
                    activeTab === 'services' ? styles.navItemActive : ''
                  }`}
                >
                  Services
                </a>
                <a
                  href="/about"
                  className={`${styles.navItem} ${
                    activeTab === 'about' ? styles.navItemActive : ''
                  }`}
                >
                  About
                </a>
                <a
                  href="/contact"
                  className={`${styles.navItem} ${
                    activeTab === 'contact' ? styles.navItemActive : ''
                  }`}
                >
                  Contact
                </a>
              </>
            ) : (
              <>
                <a
                  href="/"
                  className={`${styles.navItem} ${
                    activeTab === 'home' ? styles.navItemActive : ''
                  }`}
                >
                  Home
                </a>
                <a
                  href="/rooms"
                  className={`${styles.navItem} ${
                    activeTab === 'rooms' ? styles.navItemActive : ''
                  }`}
                >
                  Rooms
                </a>
                <a
                  href="/services"
                  className={`${styles.navItem} ${
                    activeTab === 'services' ? styles.navItemActive : ''
                  }`}
                >
                  Services
                </a>
                <a
                  href="/bookings"
                  className={`${styles.navItem} ${
                    activeTab === 'bookings' ? styles.navItemActive : ''
                  }`}
                >
                  Bookings
                </a>
                <a
                  href="/profile"
                  className={`${styles.navItem} ${
                    activeTab === 'profile' ? styles.navItemActive : ''
                  }`}
                >
                  Profile
                </a>
              </>
            )}
          </div>
        </div>

        {/* Right Side - Auth Actions (Dynamic based on auth) */}
        <div className={styles.navRight}>
          {!isAuthenticated ? (
            <>
              <a href="/login" className={styles.signInLink}>
                Sign In
              </a>
              <button className={styles.bookNowButton} onClick={handleBookNow}>
                Book Now
              </button>
            </>
          ) : (
            <>
              <div className={styles.notificationIcon}>
                <Bell size={20} strokeWidth={2} />
                {notificationCount > 0 && (
                  <span className={styles.notificationBadge}>{notificationCount}</span>
                )}
              </div>
              <span className={styles.userGreeting}>Hi, {userName}</span>
              <a href="/profile" className={styles.userAvatar}>
                {userInitials}
              </a>
              <button className={styles.signOutLink} onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
