import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './Dashboard.module.css';

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ icon: Icon, title, onClick }) => {
  return (
    <div className={styles.quickActionCard} onClick={onClick}>
      <div className={styles.iconContainer}>
        <Icon size={16} strokeWidth={2} />
      </div>
      <p className={styles.cardTitle}>{title}</p>
    </div>
  );
};

export default QuickActionCard;
