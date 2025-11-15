import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './AmenityCard.module.css';

interface AmenityCardProps {
  icon: LucideIcon;
  title: string;
}

const AmenityCard: React.FC<AmenityCardProps> = ({ icon: Icon, title }) => {
  return (
    <div className={styles.amenityCard}>
      <Icon size={32} strokeWidth={2} className={styles.icon} />
      <h4 className={styles.title}>{title}</h4>
    </div>
  );
};

export default AmenityCard;
