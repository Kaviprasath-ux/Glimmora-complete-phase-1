import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Clock, ArrowRight } from 'lucide-react';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  title: string;
  description: string;
  availability: string;
  icon: LucideIcon;
  category: string;
  onLearnMore?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  availability,
  icon: Icon,
  onLearnMore,
}) => {
  return (
    <div className={styles.serviceCard}>
      {/* Image Placeholder */}
      <div className={styles.serviceImage} />

      {/* Content */}
      <div className={styles.content}>
        {/* Icon Container */}
        <div className={styles.iconContainer}>
          <Icon size={20} strokeWidth={2} />
        </div>

        {/* Title */}
        <h3 className={styles.title}>{title}</h3>

        {/* Description */}
        <p className={styles.description}>{description}</p>

        {/* Availability */}
        <div className={styles.availability}>
          <Clock size={14} strokeWidth={2} />
          <span>{availability}</span>
        </div>

        {/* Learn More Link */}
        <button className={styles.learnMoreLink} onClick={onLearnMore}>
          Learn More
          <ArrowRight size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
