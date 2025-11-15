import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import styles from './ReviewCard.module.css';

interface ReviewCardProps {
  userName: string;
  userInitials: string;
  rating: number;
  stayDate: string;
  text: string;
  helpful: number;
  date: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  userName,
  userInitials,
  rating,
  stayDate,
  text,
  helpful: initialHelpful,
  date,
}) => {
  const [helpful, setHelpful] = useState(initialHelpful);
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpfulClick = () => {
    if (!hasVoted) {
      setHelpful(helpful + 1);
      setHasVoted(true);
    }
  };

  const handleReplyClick = () => {
    alert('Reply functionality coming soon!');
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
    <div className={styles.reviewCard}>
      {/* Header Row */}
      <div className={styles.headerRow}>
        {/* Avatar */}
        <div className={styles.avatar}>{userInitials}</div>

        {/* User Info */}
        <div className={styles.userInfo}>
          <div className={styles.userName}>{userName}</div>
          <div className={styles.stayDate}>Stayed in {stayDate}</div>
        </div>

        {/* Rating */}
        <div className={styles.ratingContainer}>
          <div className={styles.stars}>{renderStars()}</div>
          <span className={styles.ratingNumber}>{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Review Text */}
      <div className={styles.reviewText}>{text}</div>

      {/* Actions Row */}
      <div className={styles.actionsRow}>
        <button
          className={`${styles.helpfulButton} ${hasVoted ? styles.voted : ''}`}
          onClick={handleHelpfulClick}
          disabled={hasVoted}
        >
          <ThumbsUp size={14} strokeWidth={2} />
          Helpful ({helpful})
        </button>
        <button className={styles.replyLink} onClick={handleReplyClick}>
          Reply
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
