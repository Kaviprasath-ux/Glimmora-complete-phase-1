import React, { useState, useRef } from 'react';
import {
  ChevronRight,
  UtensilsCrossed,
  Waves,
  Sparkles,
  Dumbbell,
  Wine,
  Briefcase,
  Bell,
  Car,
  Plane,
  Shirt,
  Users,
  Baby,
  Wifi,
  ParkingSquare,
  Clock,
  ConciergeBell,
  Wind,
  Lock,
  Dog,
  Check,
  Calendar,
} from 'lucide-react';
import Navigation from '../../components/Home/Navigation';
import Footer from '../../components/Home/Footer';
import ServiceCard from '../../components/Services/ServiceCard';
import AmenityCard from '../../components/Services/AmenityCard';
import CategoryTabs from '../../components/Services/CategoryTabs';
import styles from './Services.module.css';

interface ServicesProps {
  isAuthenticated: boolean;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface Service {
  id: string;
  title: string;
  description: string;
  availability: string;
  icon: typeof UtensilsCrossed;
  category: string[];
}

const Services: React.FC<ServicesProps> = ({ isAuthenticated, user }) => {
  const [activeCategory, setActiveCategory] = useState('All Services');
  const servicesGridRef = useRef<HTMLDivElement>(null);

  // Categories
  const categories = [
    'All Services',
    'Hotel Facilities',
    'Dining',
    'Wellness & Spa',
    'Business Services',
    'Concierge',
    'Recreation',
  ];

  // All services data
  const allServices: Service[] = [
    {
      id: '1',
      title: '24/7 Room Service',
      description: 'In-room dining with gourmet selections from our award-winning chefs',
      availability: 'Available 24/7',
      icon: UtensilsCrossed,
      category: ['dining', 'all'],
    },
    {
      id: '2',
      title: 'Swimming Pool',
      description: 'Enjoy our heated infinity pool with stunning city views',
      availability: '6AM - 10PM',
      icon: Waves,
      category: ['recreation', 'hotel-facilities', 'all'],
    },
    {
      id: '3',
      title: 'Spa & Wellness',
      description: 'Relax and rejuvenate with our signature spa treatments',
      availability: '9AM - 9PM',
      icon: Sparkles,
      category: ['wellness-spa', 'all'],
    },
    {
      id: '4',
      title: 'Fitness Center',
      description: 'State-of-the-art equipment and personal training available',
      availability: 'Available 24/7',
      icon: Dumbbell,
      category: ['hotel-facilities', 'recreation', 'all'],
    },
    {
      id: '5',
      title: 'Restaurant & Bar',
      description: 'Fine dining experience with international and local cuisine',
      availability: '7AM - 11PM',
      icon: Wine,
      category: ['dining', 'all'],
    },
    {
      id: '6',
      title: 'Business Center',
      description: 'Fully equipped workspace with high-speed internet',
      availability: 'Available 24/7',
      icon: Briefcase,
      category: ['business-services', 'hotel-facilities', 'all'],
    },
    {
      id: '7',
      title: 'Concierge Service',
      description: 'Personalized assistance for all your needs and reservations',
      availability: 'Available 24/7',
      icon: Bell,
      category: ['concierge', 'all'],
    },
    {
      id: '8',
      title: 'Valet Parking',
      description: 'Complimentary valet parking for all guests',
      availability: 'Available 24/7',
      icon: Car,
      category: ['concierge', 'all'],
    },
    {
      id: '9',
      title: 'Airport Transfer',
      description: 'Luxury transportation to and from the airport',
      availability: 'On Request',
      icon: Plane,
      category: ['concierge', 'all'],
    },
    {
      id: '10',
      title: 'Laundry Service',
      description: 'Same-day laundry and dry cleaning services',
      availability: '7AM - 8PM',
      icon: Shirt,
      category: ['hotel-facilities', 'all'],
    },
    {
      id: '11',
      title: 'Meeting Rooms',
      description: 'Professional meeting spaces with modern AV equipment',
      availability: 'On Request',
      icon: Users,
      category: ['business-services', 'all'],
    },
    {
      id: '12',
      title: 'Kids Club',
      description: 'Supervised activities and entertainment for children',
      availability: '9AM - 6PM',
      icon: Baby,
      category: ['recreation', 'all'],
    },
  ];

  // Category mapping
  const categoryMap: { [key: string]: string[] } = {
    'All Services': ['all'],
    'Hotel Facilities': ['hotel-facilities'],
    Dining: ['dining'],
    'Wellness & Spa': ['wellness-spa'],
    'Business Services': ['business-services'],
    Concierge: ['concierge'],
    Recreation: ['recreation'],
  };

  // Filter services based on active category
  const filteredServices =
    activeCategory === 'All Services'
      ? allServices
      : allServices.filter((service) =>
          categoryMap[activeCategory]?.some((cat) => service.category.includes(cat))
        );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Smooth scroll to services grid
    setTimeout(() => {
      servicesGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleExploreRooms = () => {
    console.log('Navigate to /rooms');
  };

  const handleBookSpa = () => {
    console.log('Navigate to spa booking');
  };

  const handleBrowseRooms = () => {
    console.log('Navigate to /rooms');
  };

  const handleContactUs = () => {
    console.log('Navigate to /contact');
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Navigation */}
      <Navigation
        isAuthenticated={isAuthenticated}
        userName={user ? `${user.firstName} ${user.lastName}` : undefined}
        userEmail={user?.email}
        userInitials={user ? `${user.firstName[0]}${user.lastName[0]}` : undefined}
        activeTab="services"
      />

      {/* Breadcrumb */}
      <div className={styles.breadcrumbContainer}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbLink}>Home</span>
          <ChevronRight size={16} strokeWidth={2} />
          <span className={styles.breadcrumbCurrent}>Services</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Our Services & Amenities</h1>
          <p className={styles.heroSubtitle}>
            Experience world-class hospitality with our comprehensive range of luxury services and
            amenities
          </p>
          <button className={styles.heroCTA} onClick={handleExploreRooms}>
            Explore Rooms
          </button>
        </div>
      </section>

      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Services Grid Section */}
      <section className={styles.servicesSection} ref={servicesGridRef}>
        <div className={styles.servicesGrid}>
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              availability={service.availability}
              icon={service.icon}
              category={service.category.join(', ')}
              onLearnMore={() => console.log(`Learn more about ${service.title}`)}
            />
          ))}
        </div>
      </section>

      {/* Featured Service Section */}
      <section className={styles.featuredSection}>
        <div className={styles.featuredContainer}>
          {/* Image */}
          <div className={styles.featuredImage} />

          {/* Content */}
          <div className={styles.featuredContent}>
            <div className={styles.featuredTag}>FEATURED SERVICE</div>
            <h2 className={styles.featuredTitle}>Glimmora Signature Spa</h2>
            <p className={styles.featuredDescription}>
              Indulge in ultimate luxury with our signature spa experience. Our expert therapists
              combine ancient healing techniques with modern wellness practices to create a truly
              transformative journey.
            </p>

            {/* Features List */}
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <Check size={18} strokeWidth={2} />
                <span>Deep tissue massage therapy</span>
              </div>
              <div className={styles.featureItem}>
                <Check size={18} strokeWidth={2} />
                <span>Aromatherapy sessions</span>
              </div>
              <div className={styles.featureItem}>
                <Check size={18} strokeWidth={2} />
                <span>Hydrotherapy pools</span>
              </div>
              <div className={styles.featureItem}>
                <Check size={18} strokeWidth={2} />
                <span>Couples treatment rooms</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className={styles.featuredCTA} onClick={handleBookSpa}>
              <Calendar size={20} strokeWidth={2} />
              Book Spa Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Amenities Quick View */}
      <section className={styles.amenitiesSection}>
        <div className={styles.amenitiesContainer}>
          <h2 className={styles.amenitiesHeader}>Quick Access Amenities</h2>
          <p className={styles.amenitiesSubtitle}>Essential services available to all guests</p>

          <div className={styles.amenitiesGrid}>
            <AmenityCard icon={Wifi} title="Free WiFi" />
            <AmenityCard icon={ParkingSquare} title="Free Parking" />
            <AmenityCard icon={Dumbbell} title="Fitness Center" />
            <AmenityCard icon={UtensilsCrossed} title="Restaurant & Bar" />
            <AmenityCard icon={Clock} title="24/7 Reception" />
            <AmenityCard icon={ConciergeBell} title="Room Service" />
            <AmenityCard icon={Shirt} title="Laundry" />
            <AmenityCard icon={Plane} title="Airport Shuttle" />
            <AmenityCard icon={Dog} title="Pet Friendly" />
            <AmenityCard icon={Wind} title="Air Conditioning" />
            <AmenityCard icon={Lock} title="Safe Deposit" />
            <AmenityCard icon={Waves} title="Swimming Pool" />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <h2 className={styles.ctaTitle}>Ready to Experience Glimmora?</h2>
        <p className={styles.ctaSubtitle}>Book your stay and enjoy all our premium services</p>

        <div className={styles.ctaButtons}>
          <button className={styles.browsRoomsButton} onClick={handleBrowseRooms}>
            Browse Rooms
          </button>
          <button className={styles.contactButton} onClick={handleContactUs}>
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Services;
