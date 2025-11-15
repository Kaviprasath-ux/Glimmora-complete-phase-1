import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './InfoCard.module.css';

interface InfoCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  text: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, iconColor, title, text }) => {
  return (
    <div className={styles.infoCard}>
      <Icon size={32} strokeWidth={2} style={{ color: iconColor }} className={styles.icon} />
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{text}</p>
    </div>
  );
};

export default InfoCard;
