import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Lightbox.module.css';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelectImage: (index: number) => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
  onSelectImage,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    // Handle keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrevious, onNext]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      {/* Close Button */}
      <button className={styles.closeButton} onClick={onClose} aria-label="Close lightbox">
        <X size={24} strokeWidth={2} />
      </button>

      {/* Main Image */}
      <div className={styles.mainImageContainer}>
        <div
          className={styles.mainImage}
          data-index={currentIndex + 1}
        />
      </div>

      {/* Navigation Arrows */}
      <button
        className={`${styles.navArrow} ${styles.leftArrow}`}
        onClick={onPrevious}
        disabled={currentIndex === 0}
        aria-label="Previous image"
      >
        <ChevronLeft size={28} strokeWidth={2} />
      </button>

      <button
        className={`${styles.navArrow} ${styles.rightArrow}`}
        onClick={onNext}
        disabled={currentIndex === images.length - 1}
        aria-label="Next image"
      >
        <ChevronRight size={28} strokeWidth={2} />
      </button>

      {/* Thumbnail Strip */}
      <div className={styles.thumbnailStrip}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${
              index === currentIndex ? styles.activeThumbnail : ''
            }`}
            onClick={() => onSelectImage(index)}
            data-index={index + 1}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className={styles.imageCounter}>
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default Lightbox;
