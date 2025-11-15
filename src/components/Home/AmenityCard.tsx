import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './Home.module.css';

interface AmenityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const AmenityCard: React.FC<AmenityCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className={styles.amenityCard}>
      <div className={styles.amenityIconContainer}>
        <Icon size={32} strokeWidth={2} />
      </div>
      <h3 className={styles.amenityTitle}>{title}</h3>
      <p className={styles.amenityDescription}>{description}</p>
    </div>
  );
};

export default AmenityCard;
