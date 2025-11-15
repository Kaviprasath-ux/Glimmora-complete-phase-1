import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, ChevronDown, Grid3x3 } from 'lucide-react';
import Navigation from '../Home/Navigation';
import Footer from '../Home/Footer';
import ChatBubble from '../Home/ChatBubble';
import FiltersPanel, { Filters } from './FiltersPanel';
import RoomCard from './RoomCard';
import Pagination from './Pagination';
import styles from './Rooms.module.css';

interface Room {
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
  type: string;
  amenities: string[];
  badge: string | null;
  isFavorite: boolean;
}

interface RoomsProps {
  isAuthenticated?: boolean;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

const ROOMS_PER_PAGE = 6;

// Sample room data (24 rooms with variety)
const sampleRooms: Room[] = [
  {
    id: 1,
    name: 'Deluxe Suite',
    description: 'Spacious suite with modern amenities and stunning city views',
    image: 'gradient-placeholder',
    price: 250,
    rating: 4.8,
    reviewCount: 124,
    guests: 2,
    bedType: 'King Bed',
    size: '45m²',
    type: 'Deluxe',
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Parking'],
    badge: 'POPULAR',
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Ocean View Room',
    description: 'Breathtaking ocean views with private balcony and luxury furnishings',
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
    id: 3,
    name: 'Presidential Suite',
    description: 'Ultimate luxury with separate living area and premium facilities',
    image: 'gradient-placeholder',
    price: 450,
    rating: 5.0,
    reviewCount: 67,
    guests: 4,
    bedType: '2 King Beds',
    size: '85m²',
    type: 'Premium',
    amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking'],
    badge: null,
    isFavorite: true,
  },
  {
    id: 4,
    name: 'Garden View Suite',
    description: 'Peaceful retreat overlooking lush gardens with spa-inspired bathroom',
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
    description: 'Perfect for business travelers with workspace and high-speed connectivity',
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
  {
    id: 6,
    name: 'Family Suite',
    description: 'Spacious accommodation ideal for families with connecting rooms',
    image: 'gradient-placeholder',
    price: 320,
    rating: 4.9,
    reviewCount: 76,
    guests: 4,
    bedType: '2 Queen Beds',
    size: '65m²',
    type: 'Suite',
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Parking'],
    badge: 'POPULAR',
    isFavorite: false,
  },
  {
    id: 7,
    name: 'Cozy Standard Room',
    description: 'Comfortable and affordable room with all essential amenities',
    image: 'gradient-placeholder',
    price: 150,
    rating: 4.5,
    reviewCount: 143,
    guests: 2,
    bedType: 'Double Bed',
    size: '28m²',
    type: 'Standard',
    amenities: ['WiFi', 'Restaurant', 'Parking'],
    badge: 'BEST VALUE',
    isFavorite: false,
  },
  {
    id: 8,
    name: 'Luxury Penthouse',
    description: 'Top-floor penthouse with panoramic views and private terrace',
    image: 'gradient-placeholder',
    price: 500,
    rating: 5.0,
    reviewCount: 45,
    guests: 4,
    bedType: '2 King Beds',
    size: '95m²',
    type: 'Premium',
    amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking'],
    badge: 'NEW',
    isFavorite: true,
  },
  {
    id: 9,
    name: 'Superior Twin Room',
    description: 'Perfect for friends or colleagues with two comfortable twin beds',
    image: 'gradient-placeholder',
    price: 180,
    rating: 4.6,
    reviewCount: 91,
    guests: 2,
    bedType: '2 Twin Beds',
    size: '32m²',
    type: 'Standard',
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Parking'],
    badge: null,
    isFavorite: false,
  },
  {
    id: 10,
    name: 'Honeymoon Suite',
    description: 'Romantic getaway with jacuzzi, champagne, and rose petals',
    image: 'gradient-placeholder',
    price: 380,
    rating: 5.0,
    reviewCount: 58,
    guests: 2,
    bedType: 'King Bed',
    size: '60m²',
    type: 'Premium',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Parking'],
    badge: 'POPULAR',
    isFavorite: false,
  },
  {
    id: 11,
    name: 'Business Deluxe',
    description: 'Enhanced workspace with ergonomic chair and premium amenities',
    image: 'gradient-placeholder',
    price: 240,
    rating: 4.7,
    reviewCount: 103,
    guests: 1,
    bedType: 'King Bed',
    size: '40m²',
    type: 'Deluxe',
    amenities: ['WiFi', 'Gym', 'Restaurant', 'Parking'],
    badge: null,
    isFavorite: false,
  },
  {
    id: 12,
    name: 'Accessible Suite',
    description: 'Fully accessible room with wide doorways and adapted bathroom',
    image: 'gradient-placeholder',
    price: 260,
    rating: 4.8,
    reviewCount: 67,
    guests: 2,
    bedType: 'Queen Bed',
    size: '48m²',
    type: 'Suite',
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Parking'],
    badge: null,
    isFavorite: false,
  },
  {
    id: 13,
    name: 'Corner King Room',
    description: 'Extra windows for natural light and city skyline views',
    image: 'gradient-placeholder',
    price: 230,
    rating: 4.7,
    reviewCount: 88,
    guests: 2,
    bedType: 'King Bed',
    size: '42m²',
    type: 'Deluxe',
    amenities: ['WiFi', 'Pool', 'Gym', 'Parking'],
    badge: null,
    isFavorite: false,
  },
  {
    id: 14,
    name: 'Studio Apartment',
    description: 'Extended stay option with kitchenette and living area',
    image: 'gradient-placeholder',
    price: 290,
    rating: 4.6,
    reviewCount: 72,
    guests: 3,
    bedType: 'King + Sofa Bed',
    size: '55m²',
    type: 'Suite',
    amenities: ['WiFi', 'Gym', 'Restaurant', 'Parking'],
    badge: null,
    isFavorite: false,
  },
  {
    id: 15,
    name: 'Budget Saver',
    description: 'Economical choice without compromising on cleanliness and comfort',
    image: 'gradient-placeholder',
    price: 120,
    rating: 4.5,
    reviewCount: 156,
    guests: 1,
    bedType: 'Double Bed',
    size: '24m²',
    type: 'Standard',
    amenities: ['WiFi', 'Parking'],
    badge: 'BEST VALUE',
    isFavorite: false,
  },
  {
    id: 16,
    name: 'Spa Wellness Suite',
    description: 'In-room spa amenities with aromatherapy and massage chair',
    image: 'gradient-placeholder',
    price: 350,
    rating: 4.9,
    reviewCount: 61,
    guests: 2,
    bedType: 'King Bed',
    size: '58m²',
    type: 'Premium',
    amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking'],
    badge: null,
    isFavorite: false,
  },
  {
    id: 17,
    name: 'Mountain View Room',
    description: 'Wake up to breathtaking mountain vistas from your private balcony',
    image: 'gradient-placeholder',
    price: 210,
    rating: 4.8,
    reviewCount: 94,
    guests: 2,
    bedType: 'Queen Bed',
    size: '36m²',
    type: 'Deluxe',
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Parking'],
    badge: null,
    isFavorite: false,
  },
  {
    id: 18,
    name: 'Triple Room',
    description: 'Accommodates three guests comfortably with flexible bedding',
    image: 'gradient-placeholder',
    price: 270,
    rating: 4.6,
    reviewCount: 79,
    guests: 3,
    bedType: '3 Twin Beds',
    size: '46m²',
    type: 'Suite',
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Parking'],
    badge: null,
    isFavorite: false,
  },
  {
    id: 19,
    name: 'Junior Suite',
    description: 'Compact luxury with sitting area and premium bedding',
    image: 'gradient-placeholder',
    price: 270,
    rating: 4.7,
    reviewCount: 86,
    guests: 2,
    bedType: 'King Bed',
    size: '48m²',
    type: 'Suite',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Parking'],
    badge: null,
    isFavorite: false,
  },
  {
    id: 20,
    name: 'Classic Double',
    description: 'Traditional elegance with contemporary comforts',
    image: 'gradient-placeholder',
    price: 170,
    rating: 4.6,
    reviewCount: 118,
    guests: 2,
    bedType: 'Double Bed',
    size: '30m²',
    type: 'Standard',
    amenities: ['WiFi', 'Restaurant', 'Parking'],
    badge: null,
    isFavorite: false,
  },
  {
    id: 21,
    name: 'Royal Suite',
    description: 'Fit for royalty with butler service and exclusive amenities',
    image: 'gradient-placeholder',
    price: 480,
    rating: 5.0,
    reviewCount: 42,
    guests: 4,
    bedType: '2 King Beds',
    size: '90m²',
    type: 'Premium',
    amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking'],
    badge: 'POPULAR',
    isFavorite: true,
  },
  {
    id: 22,
    name: 'Poolside Cabana',
    description: 'Direct pool access from your private patio',
    image: 'gradient-placeholder',
    price: 310,
    rating: 4.8,
    reviewCount: 73,
    guests: 2,
    bedType: 'Queen Bed',
    size: '44m²',
    type: 'Deluxe',
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Parking'],
    badge: null,
    isFavorite: false,
  },
  {
    id: 23,
    name: 'Single Traveler Room',
    description: 'Cozy space designed for solo adventurers',
    image: 'gradient-placeholder',
    price: 140,
    rating: 4.5,
    reviewCount: 127,
    guests: 1,
    bedType: 'Twin Bed',
    size: '26m²',
    type: 'Standard',
    amenities: ['WiFi', 'Gym', 'Parking'],
    badge: null,
    isFavorite: false,
  },
  {
    id: 24,
    name: 'Skyline Penthouse',
    description: 'Exclusive rooftop residence with 360-degree city views',
    image: 'gradient-placeholder',
    price: 500,
    rating: 5.0,
    reviewCount: 38,
    guests: 4,
    bedType: '2 King Beds',
    size: '100m²',
    type: 'Premium',
    amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking'],
    badge: 'NEW',
    isFavorite: false,
  },
];

const Rooms: React.FC<RoomsProps> = ({ isAuthenticated = false, user }) => {
  const userName = user?.firstName || 'Guest';
  const userEmail = user?.email || 'user@glimmora.com';
  const userInitials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : 'G';

  const [filters, setFilters] = useState<Filters>({
    priceRange: [50, 500],
    roomTypes: [],
    guests: [],
    amenities: [],
    bedTypes: [],
  });

  const [sortBy, setSortBy] = useState<string>('price-low');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Filter rooms based on active filters
  const filteredRooms = useMemo(() => {
    return sampleRooms.filter((room) => {
      // Price range filter
      if (room.price < filters.priceRange[0] || room.price > filters.priceRange[1]) {
        return false;
      }

      // Room type filter
      if (filters.roomTypes.length > 0 && !filters.roomTypes.includes(room.type)) {
        return false;
      }

      // Guests filter (4 means 4+)
      if (filters.guests.length > 0) {
        const guestMatch = filters.guests.some((g) => {
          if (g === 4) return room.guests >= 4;
          return room.guests === g;
        });
        if (!guestMatch) return false;
      }

      // Amenities filter (must have all selected amenities)
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) =>
          room.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Bed type filter (check if bedType contains any of the selected types)
      if (filters.bedTypes.length > 0) {
        const bedTypeMatch = filters.bedTypes.some((bedType) =>
          room.bedType.includes(bedType)
        );
        if (!bedTypeMatch) return false;
      }

      return true;
    });
  }, [filters]);

  // Sort rooms
  const sortedRooms = useMemo(() => {
    const rooms = [...filteredRooms];
    switch (sortBy) {
      case 'price-low':
        return rooms.sort((a, b) => a.price - b.price);
      case 'price-high':
        return rooms.sort((a, b) => b.price - a.price);
      case 'rating':
        return rooms.sort((a, b) => b.rating - a.rating);
      case 'name':
        return rooms.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return rooms.sort((a, b) => b.id - a.id);
      default:
        return rooms;
    }
  }, [filteredRooms, sortBy]);

  // Calculate available counts for filter badges
  const availableCounts = useMemo(() => {
    const counts = {
      roomTypes: {} as { [key: string]: number },
      guests: {} as { [key: number]: number },
      amenities: {} as { [key: string]: number },
      bedTypes: {} as { [key: string]: number },
    };

    filteredRooms.forEach((room) => {
      // Room types
      counts.roomTypes[room.type] = (counts.roomTypes[room.type] || 0) + 1;

      // Guests
      const guestKey = room.guests >= 4 ? 4 : room.guests;
      counts.guests[guestKey] = (counts.guests[guestKey] || 0) + 1;

      // Amenities
      room.amenities.forEach((amenity) => {
        counts.amenities[amenity] = (counts.amenities[amenity] || 0) + 1;
      });

      // Bed types
      ['King', 'Queen', 'Twin', 'Double'].forEach((bedType) => {
        if (room.bedType.includes(bedType)) {
          counts.bedTypes[bedType] = (counts.bedTypes[bedType] || 0) + 1;
        }
      });
    });

    return counts;
  }, [filteredRooms]);

  // Pagination
  const totalPages = Math.ceil(sortedRooms.length / ROOMS_PER_PAGE);
  const paginatedRooms = sortedRooms.slice(
    (currentPage - 1) * ROOMS_PER_PAGE,
    currentPage * ROOMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setShowSortDropdown(false);
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'price-low':
        return 'Price: Low to High';
      case 'price-high':
        return 'Price: High to Low';
      case 'rating':
        return 'Rating: High to Low';
      case 'name':
        return 'Name: A to Z';
      case 'newest':
        return 'Newest First';
      default:
        return 'Price: Low to High';
    }
  };

  return (
    <div className={styles.roomsContainer}>
      {/* Navigation */}
      <Navigation
        isAuthenticated={isAuthenticated}
        userName={userName}
        userEmail={userEmail}
        userInitials={userInitials}
        notificationCount={3}
        activeTab="rooms"
      />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Find Your Perfect Room</h1>
          <p className={styles.heroSubtitle}>
            Choose from our collection of luxury accommodations
          </p>

          {/* Inline Search Bar */}
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="📅 Check-in - Check-out"
              className={styles.searchInput}
            />
            <select className={styles.searchSelect}>
              <option>👥 Guests</option>
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
            <select className={styles.searchSelect}>
              <option>💰 Budget</option>
              <option>Any</option>
              <option>$0-$150</option>
              <option>$150-$300</option>
              <option>$300-$500</option>
              <option>$500+</option>
            </select>
            <button className={styles.searchButton}>
              <Search size={18} strokeWidth={2} />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Top Filters Bar */}
        <div className={styles.topFiltersBar}>
          <div className={styles.resultsCount}>
            {sortedRooms.length} Room{sortedRooms.length !== 1 ? 's' : ''} Available
          </div>

          <div className={styles.actions}>
            {/* Sort Dropdown */}
            <div className={styles.sortDropdown}>
              <button
                className={styles.sortButton}
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                <ArrowUpDown size={18} strokeWidth={2} />
                Sort: {getSortLabel()}
                <ChevronDown size={16} strokeWidth={2} />
              </button>
              {showSortDropdown && (
                <div className={styles.sortMenu}>
                  <button onClick={() => handleSortChange('price-low')}>
                    Price: Low to High
                  </button>
                  <button onClick={() => handleSortChange('price-high')}>
                    Price: High to Low
                  </button>
                  <button onClick={() => handleSortChange('rating')}>
                    Rating: High to Low
                  </button>
                  <button onClick={() => handleSortChange('name')}>
                    Name: A to Z
                  </button>
                  <button onClick={() => handleSortChange('newest')}>
                    Newest First
                  </button>
                </div>
              )}
            </div>

            {/* View Toggle */}
            <div className={styles.viewToggle}>
              <button className={styles.viewButtonActive}>
                <Grid3x3 size={20} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className={styles.twoColumnLayout}>
          {/* Filters Panel */}
          <FiltersPanel
            filters={filters}
            onFiltersChange={setFilters}
            availableCounts={availableCounts}
          />

          {/* Rooms Grid */}
          <div className={styles.roomsSection}>
            {paginatedRooms.length > 0 ? (
              <>
                <div className={styles.roomsGrid}>
                  {paginatedRooms.map((room) => (
                    <RoomCard key={room.id} {...room} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className={styles.noResults}>
                <p>No rooms match your criteria</p>
                <p className={styles.noResultsSubtext}>
                  Try adjusting your filters to see more options
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* AI Chat Bubble */}
      <ChatBubble hasUnreadMessages={isAuthenticated} />
    </div>
  );
};

export default Rooms;
