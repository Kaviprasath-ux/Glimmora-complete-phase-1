import React, { useState } from 'react';
import { Heart, Share2, Check, Star, Users, BedDouble, Maximize, MapPin } from 'lucide-react';
import Navigation from '../Home/Navigation';
import Footer from '../Home/Footer';
import ChatBubble from '../Home/ChatBubble';
import ImageGallery from './ImageGallery';
import Lightbox from './Lightbox';
import BookingCard from './BookingCard';
import ReviewCard from './ReviewCard';
import RoomCard from '../Rooms/RoomCard';
import styles from './RoomDetails.module.css';

interface RoomDetailsProps {
  isAuthenticated?: boolean;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

// Sample room data
const sampleRoom = {
  id: 1,
  name: 'Deluxe Suite',
  description:
    'Experience luxury and comfort in our spacious Deluxe Suite. This beautifully appointed room features modern amenities, stunning city views, and elegant furnishings designed for your ultimate relaxation. Perfect for couples or business travelers seeking a premium stay.',
  images: Array(8).fill('gradient-placeholder'),
  price: 250,
  rating: 4.8,
  reviewCount: 124,
  guests: 2,
  bedType: 'King Bed',
  size: '45m²',
  floor: 'Floor 5',
  type: 'Deluxe',
  amenities: [
    'Free WiFi',
    'Air Conditioning',
    'Mini Bar',
    'Safe Box',
    'Coffee Maker',
    'Flat Screen TV',
    'Work Desk',
    'Bathrobe & Slippers',
    'Hair Dryer',
    'Iron & Ironing Board',
    'Telephone',
    'Room Service',
  ],
  policies: [
    'Check-in: 2:00 PM',
    'Check-out: 12:00 PM',
    'No smoking',
    'No pets allowed',
    'Extra bed available: $50/night',
    'Breakfast available: $25/person',
  ],
  location: {
    address: 'Floor 5, Glimmora Hotel',
    city: '123 Luxury Ave, Dubai, UAE',
  },
  ratingBreakdown: {
    cleanliness: 4.9,
    location: 4.8,
    service: 4.9,
    comfort: 4.7,
    value: 4.6,
  },
  reviews: [
    {
      id: 1,
      userName: 'John Doe',
      userInitials: 'JD',
      rating: 5.0,
      stayDate: 'November 2024',
      text: 'Amazing room! The view was spectacular and the amenities were top-notch. Would definitely stay again. Staff was very helpful and friendly.',
      helpful: 24,
      date: '2024-11-20',
    },
    {
      id: 2,
      userName: 'Sarah Johnson',
      userInitials: 'SJ',
      rating: 4.5,
      stayDate: 'October 2024',
      text: 'Great experience overall. The room was clean and comfortable. Only minor issue was the AC was a bit loud, but staff fixed it promptly.',
      helpful: 18,
      date: '2024-10-15',
    },
    {
      id: 3,
      userName: 'Michael Chen',
      userInitials: 'MC',
      rating: 5.0,
      stayDate: 'October 2024',
      text: 'Absolutely perfect! The bed was incredibly comfortable, and the city views from the room were breathtaking. Highly recommend for a luxury stay.',
      helpful: 31,
      date: '2024-10-08',
    },
    {
      id: 4,
      userName: 'Emily Rodriguez',
      userInitials: 'ER',
      rating: 4.8,
      stayDate: 'September 2024',
      text: 'Excellent value for money. The room exceeded our expectations. Loved the modern design and attention to detail.',
      helpful: 15,
      date: '2024-09-22',
    },
  ],
  isFavorite: false,
};

// Similar rooms (sample data - should filter out current room)
const similarRooms = [
  {
    id: 2,
    name: 'Ocean View Room',
    description: 'Breathtaking ocean views with private balcony',
    image: 'gradient-placeholder',
    price: 200,
    rating: 4.9,
    reviewCount: 98,
    guests: 2,
    bedType: 'Queen Bed',
    size: '38m²',
    type: 'Standard',
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Parking'],
    badge: 'BEST VALUE',
    isFavorite: false,
  },
  {
    id: 4,
    name: 'Garden View Suite',
    description: 'Peaceful retreat overlooking lush gardens',
    image: 'gradient-placeholder',
    price: 280,
    rating: 4.7,
    reviewCount: 89,
    guests: 2,
    bedType: 'King Bed',
    size: '50m²',
    type: 'Suite',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Parking'],
    badge: null,
    isFavorite: false,
  },
  {
    id: 5,
    name: 'Executive Room',
    description: 'Perfect for business travelers with workspace',
    image: 'gradient-placeholder',
    price: 220,
    rating: 4.6,
    reviewCount: 112,
    guests: 2,
    bedType: 'Queen Bed',
    size: '35m²',
    type: 'Deluxe',
    amenities: ['WiFi', 'Gym', 'Restaurant', 'Parking'],
    badge: null,
    isFavorite: false,
  },
];

const RoomDetails: React.FC<RoomDetailsProps> = ({ isAuthenticated = false, user }) => {
  const userName = user?.firstName || 'Guest';
  const userEmail = user?.email || 'user@glimmora.com';
  const userInitials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : 'G';

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(sampleRoom.isFavorite);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayedReviews = showAllReviews ? sampleRoom.reviews : sampleRoom.reviews.slice(0, 2);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  const handleLightboxPrevious = () => {
    setLightboxIndex((prev) => Math.max(0, prev - 1));
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => Math.min(sampleRoom.images.length - 1, prev + 1));
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: sampleRoom.name,
        text: sampleRoom.description,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const renderStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={i < Math.floor(count) ? '#FFB800' : 'none'}
          stroke={i < Math.floor(count) ? '#FFB800' : '#E8E4E0'}
          strokeWidth={2}
        />
      );
    }
    return stars;
  };

  return (
    <div className={styles.roomDetailsContainer}>
      {/* Navigation */}
      <Navigation
        isAuthenticated={isAuthenticated}
        userName={userName}
        userEmail={userEmail}
        userInitials={userInitials}
        notificationCount={3}
        activeTab="rooms"
      />

      {/* Breadcrumb */}
      <div className={styles.breadcrumbContainer}>
        <div className={styles.breadcrumb}>
          <a href="/" className={styles.breadcrumbLink}>
            Home
          </a>
          <span className={styles.breadcrumbSeparator}>&gt;</span>
          <a href="/rooms" className={styles.breadcrumbLink}>
            Rooms
          </a>
          <span className={styles.breadcrumbSeparator}>&gt;</span>
          <span className={styles.breadcrumbCurrent}>{sampleRoom.name}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery
        images={sampleRoom.images}
        onImageClick={handleImageClick}
        onViewAllClick={() => handleImageClick(0)}
      />

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={sampleRoom.images}
          currentIndex={lightboxIndex}
          onClose={handleLightboxClose}
          onPrevious={handleLightboxPrevious}
          onNext={handleLightboxNext}
          onSelectImage={setLightboxIndex}
        />
      )}

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Column - Room Details */}
        <div className={styles.leftColumn}>
          {/* Header Section */}
          <h1 className={styles.roomName}>{sampleRoom.name}</h1>

          {/* Rating Row */}
          <div className={styles.ratingRow}>
            <div className={styles.stars}>{renderStars(sampleRoom.rating)}</div>
            <span className={styles.ratingText}>{sampleRoom.rating.toFixed(1)}</span>
            <span className={styles.reviewCount}>({sampleRoom.reviewCount} reviews)</span>
          </div>

          {/* Meta Information */}
          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <Users size={16} strokeWidth={2} />
              <span>
                {sampleRoom.guests} {sampleRoom.guests === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>
            <div className={styles.metaItem}>
              <BedDouble size={16} strokeWidth={2} />
              <span>{sampleRoom.bedType}</span>
            </div>
            <div className={styles.metaItem}>
              <Maximize size={16} strokeWidth={2} />
              <span>{sampleRoom.size}</span>
            </div>
            <div className={styles.metaItem}>
              <MapPin size={16} strokeWidth={2} />
              <span>{sampleRoom.floor}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              className={`${styles.actionButton} ${isFavorite ? styles.favorited : ''}`}
              onClick={handleFavoriteToggle}
            >
              <Heart
                size={18}
                strokeWidth={2}
                fill={isFavorite ? '#DC3545' : 'none'}
                stroke={isFavorite ? '#DC3545' : 'currentColor'}
              />
              {isFavorite ? 'Saved' : 'Add to Favorites'}
            </button>
            <button className={styles.actionButton} onClick={handleShare}>
              <Share2 size={18} strokeWidth={2} />
              Share
            </button>
          </div>

          {/* Description Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionHeader}>About This Room</h2>
            <p className={styles.descriptionText}>{sampleRoom.description}</p>
          </div>

          {/* Amenities Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionHeader}>Room Amenities</h2>
            <div className={styles.amenitiesGrid}>
              {sampleRoom.amenities.map((amenity, index) => (
                <div key={index} className={styles.amenityItem}>
                  <Check size={16} strokeWidth={2} className={styles.checkIcon} />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policies Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionHeader}>Room Policies</h2>
            <ul className={styles.policiesList}>
              {sampleRoom.policies.map((policy, index) => (
                <li key={index}>{policy}</li>
              ))}
            </ul>
          </div>

          {/* Location Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionHeader}>Location</h2>
            <div className={styles.address}>
              {sampleRoom.location.address}
              <br />
              {sampleRoom.location.city}
            </div>
            <div className={styles.mapPlaceholder}>Map integration (Google Maps)</div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className={styles.rightColumn}>
          <BookingCard
            roomPrice={sampleRoom.price}
            roomId={sampleRoom.id}
            roomName={sampleRoom.name}
          />
        </div>
      </div>

      {/* Reviews Section */}
      <div className={styles.reviewsSection}>
        <div className={styles.reviewsHeader}>
          <h2 className={styles.reviewsTitle}>Guest Reviews</h2>
          <div className={styles.averageRating}>
            <Star size={20} fill="#FFB800" stroke="#FFB800" strokeWidth={2} />
            <span className={styles.avgRatingText}>{sampleRoom.rating.toFixed(1)} Average</span>
            <span className={styles.reviewsTotal}>({sampleRoom.reviewCount} Reviews)</span>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className={styles.ratingBreakdown}>
          {Object.entries(sampleRoom.ratingBreakdown).map(([category, rating]) => (
            <div key={category} className={styles.ratingCategory}>
              <div className={styles.categoryName}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
              <div className={styles.categoryRating}>{rating.toFixed(1)}</div>
              <div className={styles.categoryStars}>{renderStars(rating)}</div>
            </div>
          ))}
        </div>

        {/* Individual Reviews */}
        <div className={styles.reviewsList}>
          {displayedReviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>

        {/* Load More Button */}
        {!showAllReviews && sampleRoom.reviews.length > 2 && (
          <button
            className={styles.loadMoreButton}
            onClick={() => setShowAllReviews(true)}
          >
            Load More Reviews
          </button>
        )}
      </div>

      {/* Similar Rooms Section */}
      <div className={styles.similarRoomsSection}>
        <h2 className={styles.similarRoomsTitle}>You Might Also Like</h2>
        <div className={styles.similarRoomsGrid}>
          {similarRooms.map((room) => (
            <RoomCard key={room.id} {...room} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* AI Chat Bubble */}
      <ChatBubble hasUnreadMessages={isAuthenticated} />
    </div>
  );
};

export default RoomDetails;
