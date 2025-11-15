import React from 'react';
import { Users, BedDouble, Maximize } from 'lucide-react';
import styles from './Home.module.css';

interface RoomCardProps {
  name: string;
  description: string;
  guests: string;
  bed: string;
  size: string;
  price: string;
  imageUrl?: string;
  onViewDetails?: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  name,
  description,
  guests,
  bed,
  size,
  price,
  imageUrl,
  onViewDetails,
}) => {
  const handleClick = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      // Default: navigate to room details
      window.location.href = `/rooms/${name.toLowerCase().replace(/\s+/g, '-')}`;
    }
  };

  return (
    <div className={styles.roomCard}>
      {/* Room Image */}
      <div className={styles.roomImage} style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}>
        {!imageUrl && <div className={styles.roomImagePlaceholder} />}
      </div>

      {/* Room Content */}
      <div className={styles.roomContent}>
        <h3 className={styles.roomName}>{name}</h3>
        <p className={styles.roomDescription}>{description}</p>

        {/* Features */}
        <div className={styles.roomFeatures}>
          <div className={styles.roomFeature}>
            <Users size={16} strokeWidth={2} />
            <span>{guests}</span>
          </div>
          <div className={styles.roomFeature}>
            <BedDouble size={16} strokeWidth={2} />
            <span>{bed}</span>
          </div>
          <div className={styles.roomFeature}>
            <Maximize size={16} strokeWidth={2} />
            <span>{size}</span>
          </div>
        </div>

        {/* Price */}
        <p className={styles.roomPrice}>${price}/night</p>

        {/* View Details Button */}
        <button className={styles.viewDetailsButton} onClick={handleClick}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
