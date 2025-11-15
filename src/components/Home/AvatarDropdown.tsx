import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Calendar, ClipboardCheck, Settings, LogOut } from 'lucide-react';
import styles from './AvatarDropdown.module.css';

interface AvatarDropdownProps {
  userName: string;
  userEmail?: string;
  userInitials: string;
  onSignOut: () => void;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({
  userName,
  userEmail = 'user@glimmora.com',
  userInitials,
  onSignOut,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    closeDropdown();
    navigate(path);
  };

  const handleSignOut = () => {
    closeDropdown();
    onSignOut();
  };

  return (
    <div className={styles.avatarDropdownContainer} ref={dropdownRef}>
      <button className={styles.avatarButton} onClick={toggleDropdown}>
        <div className={styles.avatarCircle}>{userInitials}</div>
        <ChevronDown
          size={16}
          className={`${styles.chevronIcon} ${isOpen ? styles.chevronOpen : ''}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {/* Dropdown Header */}
          <div className={styles.dropdownHeader}>
            <div className={styles.avatarSmall}>{userInitials}</div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{userName}</p>
              <p className={styles.userEmail}>{userEmail}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className={styles.menuItems}>
            <button
              className={styles.menuItem}
              onClick={() => handleNavigation('/pre-check-in')}
            >
              <Calendar size={18} />
              <span>My Bookings</span>
            </button>

            <button
              className={styles.menuItem}
              onClick={() => handleNavigation('/pre-check-in')}
            >
              <ClipboardCheck size={18} />
              <span>Pre Check-in</span>
            </button>

            <button
              className={styles.menuItem}
              onClick={() => handleNavigation('/profile')}
            >
              <Settings size={18} />
              <span>Profile Settings</span>
            </button>
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Sign Out */}
          <button
            className={`${styles.menuItem} ${styles.signOutItem}`}
            onClick={handleSignOut}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
