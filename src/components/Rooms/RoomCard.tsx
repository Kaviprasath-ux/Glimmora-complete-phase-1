import React, { useState } from 'react';
import { Heart, Star, Users, BedDouble, Maximize } from 'lucide-react';
import styles from './RoomCard.module.css';

interface RoomCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  guests: number;
  bedType: string;
  size: string;
  badge?: string | null;
  isFavorite: boolean;
  onViewDetails?: (id: number) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  name,
  description,
  image,
  price,
  rating,
  reviewCount,
  guests,
  bedType,
  size,
  badge,
  isFavorite: initialFavorite,
  onViewDetails,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(id);
    } else {
      window.location.href = `/rooms/${id}`;
    }
  };

  const handleCardClick = () => {
    handleViewDetails();
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          fill={i < Math.floor(rating) ? '#FFB800' : 'none'}
          stroke={i < Math.floor(rating) ? '#FFB800' : '#E8E4E0'}
          strokeWidth={2}
        />
      );
    }
    return stars;
  };

  return (
    <div className={styles.roomCard} onClick={handleCardClick}>
      {/* Image Section */}
      <div className={styles.imageSection}>
        <div className={styles.image}>
          {/* Gradient placeholder - replace with actual image */}
          <div className={styles.imagePlaceholder} />
        </div>

        {/* Favorite Button */}
        <button
          className={styles.favoriteButton}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={20}
            fill={isFavorite ? '#DC3545' : 'none'}
            stroke={isFavorite ? '#DC3545' : '#5C5C5C'}
            strokeWidth={2}
          />
        </button>

        {/* Badge */}
        {badge && <div className={styles.badge}>{badge}</div>}
      </div>

      {/* Content Section */}
      <div className={styles.contentSection}>
        {/* Room Name */}
        <h3 className={styles.roomName}>{name}</h3>

        {/* Rating Row */}
        <div className={styles.ratingRow}>
          <div className={styles.stars}>{renderStars()}</div>
          <span className={styles.ratingNumber}>{rating}</span>
          <span className={styles.reviewCount}>({reviewCount} reviews)</span>
        </div>

        {/* Description */}
        <p className={styles.description}>{description}</p>

        {/* Features Row */}
        <div className={styles.featuresRow}>
          <div className={styles.feature}>
            <Users size={16} strokeWidth={2} />
            <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
          </div>
          <div className={styles.feature}>
            <BedDouble size={16} strokeWidth={2} />
            <span>{bedType}</span>
          </div>
          <div className={styles.feature}>
            <Maximize size={16} strokeWidth={2} />
            <span>{size}</span>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom Row */}
        <div className={styles.bottomRow}>
          <div className={styles.priceSection}>
            <div className={styles.price}>${price}</div>
            <div className={styles.perNight}>/night</div>
          </div>
          <button
            className={styles.viewDetailsButton}
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
