import React from 'react';
import { Grid } from 'lucide-react';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
  onImageClick: (index: number) => void;
  onViewAllClick: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
  onViewAllClick,
}) => {
  // Show main image and 2 secondary images
  const mainImage = images[0];
  const secondaryImages = images.slice(1, 3);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryGrid}>
        {/* Main Image */}
        <div className={styles.mainImage} onClick={() => onImageClick(0)}>
          <div className={styles.imagePlaceholder} data-index="1" />
          <button className={styles.viewAllButton} onClick={(e) => {
            e.stopPropagation();
            onViewAllClick();
          }}>
            <Grid size={18} strokeWidth={2} />
            View All Photos
          </button>
        </div>

        {/* Secondary Images */}
        {secondaryImages.map((image, index) => (
          <div
            key={index}
            className={styles.secondaryImage}
            onClick={() => onImageClick(index + 1)}
          >
            <div className={styles.imagePlaceholder} data-index={index + 2} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
