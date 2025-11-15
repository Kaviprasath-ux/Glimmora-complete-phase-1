import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './ContactCard.module.css';

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  mainInfo: string;
  secondaryInfo: string;
  isClickable?: boolean;
  onClick?: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon: Icon,
  title,
  mainInfo,
  secondaryInfo,
  isClickable = false,
  onClick,
}) => {
  return (
    <div className={styles.contactCard}>
      <div className={styles.iconContainer}>
        <Icon size={28} strokeWidth={2} />
      </div>

      <h3 className={styles.title}>{title}</h3>

      <div
        className={`${styles.mainInfo} ${isClickable ? styles.clickable : ''}`}
        onClick={isClickable ? onClick : undefined}
      >
        {mainInfo}
      </div>

      <div className={styles.secondaryInfo}>{secondaryInfo}</div>
    </div>
  );
};

export default ContactCard;
