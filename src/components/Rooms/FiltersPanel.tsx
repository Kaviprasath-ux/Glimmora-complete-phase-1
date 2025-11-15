import React from 'react';
import PriceRangeSlider from './PriceRangeSlider';
import styles from './FiltersPanel.module.css';

export interface Filters {
  priceRange: [number, number];
  roomTypes: string[];
  guests: number[];
  amenities: string[];
  bedTypes: string[];
}

interface FiltersPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  availableCounts: {
    roomTypes: { [key: string]: number };
    guests: { [key: number]: number };
    amenities: { [key: string]: number };
    bedTypes: { [key: string]: number };
  };
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  onFiltersChange,
  availableCounts,
}) => {
  const handlePriceChange = (value: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: value });
  };

  const handleRoomTypeChange = (type: string) => {
    const newTypes = filters.roomTypes.includes(type)
      ? filters.roomTypes.filter((t) => t !== type)
      : [...filters.roomTypes, type];
    onFiltersChange({ ...filters, roomTypes: newTypes });
  };

  const handleGuestsChange = (guestCount: number) => {
    const newGuests = filters.guests.includes(guestCount)
      ? filters.guests.filter((g) => g !== guestCount)
      : [...filters.guests, guestCount];
    onFiltersChange({ ...filters, guests: newGuests });
  };

  const handleAmenityChange = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onFiltersChange({ ...filters, amenities: newAmenities });
  };

  const handleBedTypeChange = (bedType: string) => {
    const newBedTypes = filters.bedTypes.includes(bedType)
      ? filters.bedTypes.filter((b) => b !== bedType)
      : [...filters.bedTypes, bedType];
    onFiltersChange({ ...filters, bedTypes: newBedTypes });
  };

  const handleClearAll = () => {
    onFiltersChange({
      priceRange: [50, 500],
      roomTypes: [],
      guests: [],
      amenities: [],
      bedTypes: [],
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.priceRange[0] !== 50 ||
      filters.priceRange[1] !== 500 ||
      filters.roomTypes.length > 0 ||
      filters.guests.length > 0 ||
      filters.amenities.length > 0 ||
      filters.bedTypes.length > 0
    );
  };

  const roomTypeOptions = [
    { value: 'Deluxe', label: 'Deluxe' },
    { value: 'Suite', label: 'Suite' },
    { value: 'Standard', label: 'Standard' },
    { value: 'Premium', label: 'Premium' },
  ];

  const guestOptions = [
    { value: 1, label: '1 Guest' },
    { value: 2, label: '2 Guests' },
    { value: 3, label: '3 Guests' },
    { value: 4, label: '4+ Guests' },
  ];

  const amenityOptions = [
    { value: 'WiFi', label: 'WiFi' },
    { value: 'Pool', label: 'Pool' },
    { value: 'Gym', label: 'Gym' },
    { value: 'Spa', label: 'Spa' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Parking', label: 'Parking' },
  ];

  const bedTypeOptions = [
    { value: 'King', label: 'King' },
    { value: 'Queen', label: 'Queen' },
    { value: 'Twin', label: 'Twin' },
    { value: 'Double', label: 'Double' },
  ];

  return (
    <div className={styles.filtersPanel}>
      {/* Price Range Section */}
      <div className={styles.filterSection}>
        <div className={styles.sectionHeader}>Price Range</div>
        <PriceRangeSlider
          min={50}
          max={500}
          value={filters.priceRange}
          onChange={handlePriceChange}
        />
      </div>

      {/* Room Type Section */}
      <div className={styles.filterSection}>
        <div className={styles.sectionHeader}>Room Type</div>
        <div className={styles.checkboxList}>
          {roomTypeOptions.map((option) => (
            <label key={option.value} className={styles.checkboxItem}>
              <input
                type="checkbox"
                checked={filters.roomTypes.includes(option.value)}
                onChange={() => handleRoomTypeChange(option.value)}
                className={styles.checkbox}
              />
              <div className={styles.customCheckbox}>
                {filters.roomTypes.includes(option.value) && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className={styles.checkboxLabel}>{option.label}</span>
              <span className={styles.countBadge}>
                ({availableCounts.roomTypes[option.value] || 0})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Guests Section */}
      <div className={styles.filterSection}>
        <div className={styles.sectionHeader}>Guests</div>
        <div className={styles.checkboxList}>
          {guestOptions.map((option) => (
            <label key={option.value} className={styles.checkboxItem}>
              <input
                type="checkbox"
                checked={filters.guests.includes(option.value)}
                onChange={() => handleGuestsChange(option.value)}
                className={styles.checkbox}
              />
              <div className={styles.customCheckbox}>
                {filters.guests.includes(option.value) && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className={styles.checkboxLabel}>{option.label}</span>
              <span className={styles.countBadge}>
                ({availableCounts.guests[option.value] || 0})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities Section */}
      <div className={styles.filterSection}>
        <div className={styles.sectionHeader}>Amenities</div>
        <div className={styles.checkboxList}>
          {amenityOptions.map((option) => (
            <label key={option.value} className={styles.checkboxItem}>
              <input
                type="checkbox"
                checked={filters.amenities.includes(option.value)}
                onChange={() => handleAmenityChange(option.value)}
                className={styles.checkbox}
              />
              <div className={styles.customCheckbox}>
                {filters.amenities.includes(option.value) && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className={styles.checkboxLabel}>{option.label}</span>
              <span className={styles.countBadge}>
                ({availableCounts.amenities[option.value] || 0})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Bed Type Section */}
      <div className={styles.filterSection}>
        <div className={styles.sectionHeader}>Bed Type</div>
        <div className={styles.checkboxList}>
          {bedTypeOptions.map((option) => (
            <label key={option.value} className={styles.checkboxItem}>
              <input
                type="checkbox"
                checked={filters.bedTypes.includes(option.value)}
                onChange={() => handleBedTypeChange(option.value)}
                className={styles.checkbox}
              />
              <div className={styles.customCheckbox}>
                {filters.bedTypes.includes(option.value) && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className={styles.checkboxLabel}>{option.label}</span>
              <span className={styles.countBadge}>
                ({availableCounts.bedTypes[option.value] || 0})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear All Button */}
      {hasActiveFilters() && (
        <button className={styles.clearAllButton} onClick={handleClearAll}>
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default FiltersPanel;
