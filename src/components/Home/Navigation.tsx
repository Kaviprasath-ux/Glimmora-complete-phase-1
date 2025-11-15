import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import AvatarDropdown from './AvatarDropdown';
import logoImage from '../../assets/logo 1.png';
import styles from './Home.module.css';

interface NavigationProps {
  isAuthenticated: boolean;
  userName?: string;
  userEmail?: string;
  userInitials?: string;
  notificationCount?: number;
  activeTab?: string;
  onSignOut?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  isAuthenticated,
  userName = 'Guest',
  userEmail = 'user@glimmora.com',
  userInitials = 'G',
  notificationCount = 0,
  activeTab,
  onSignOut,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from URL if not provided via props
  const currentActiveTab = activeTab || (() => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/rooms')) return 'rooms';
    if (path.startsWith('/services')) return 'services';
    if (path.startsWith('/contact')) return 'contact';
    if (path.startsWith('/pre-check-in')) return 'pre-checkin';
    return 'home';
  })();

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    }
    // Navigate to home
    navigate('/');
  };

  const handleBookNow = () => {
    navigate('/rooms');
  };

  return (
    <nav className={styles.topNav}>
      <div className={styles.navContent}>
        {/* Left Side - Logo */}
        <div className={styles.navLeft}>
          <Link to="/" className={styles.logoLink}>
            <img src={logoImage} alt="Glimmora Hotel" className={styles.logo} />
          </Link>

          {/* Middle - Nav Items (Same for both logged and unlogged) */}
          <div className={styles.navItems}>
            <Link
              to="/"
              className={`${styles.navItem} ${
                currentActiveTab === 'home' ? styles.navItemActive : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/rooms"
              className={`${styles.navItem} ${
                currentActiveTab === 'rooms' ? styles.navItemActive : ''
              }`}
            >
              Rooms
            </Link>
            <Link
              to="/services"
              className={`${styles.navItem} ${
                currentActiveTab === 'services' ? styles.navItemActive : ''
              }`}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className={`${styles.navItem} ${
                currentActiveTab === 'contact' ? styles.navItemActive : ''
              }`}
            >
              Contact
            </Link>
            <Link
              to="/pre-check-in"
              className={`${styles.navItem} ${
                currentActiveTab === 'pre-checkin' ? styles.navItemActive : ''
              }`}
            >
              Pre Check-in
            </Link>
          </div>
        </div>

        {/* Right Side - Auth Actions (Dynamic based on auth) */}
        <div className={styles.navRight}>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className={styles.signInLink}>
                Sign In
              </Link>
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
              <AvatarDropdown
                userName={userName}
                userEmail={userEmail}
                userInitials={userInitials}
                onSignOut={handleSignOut}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
