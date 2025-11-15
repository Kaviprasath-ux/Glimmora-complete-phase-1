import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Hotel,
  Calendar,
  Ticket,
  CreditCard,
  MessageCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Navigation from '../Home/Navigation';
import Footer from '../Home/Footer';
import QuickActionCard from './QuickActionCard';
import BookingCard from './BookingCard';
import StatCard from './StatCard';
import styles from './Dashboard.module.css';

interface DashboardProps {
  isAuthenticated: boolean;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ isAuthenticated, user }) => {
  const { logout } = useApp();
  const navigate = useNavigate();
  const [hasNewMessages] = useState(true);

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  // Sample user data
  const userData = {
    firstName: user?.firstName || 'John',
    initials: user ? `${user.firstName[0]}${user.lastName[0]}` : 'JD',
  };

  // Sample bookings
  const upcomingBookings = [
    {
      bookingRef: 'Booking #GLM123456',
      status: 'confirmed' as const,
      roomName: 'Deluxe Suite Room',
      checkIn: 'Dec 25',
      checkOut: 'Dec 28, 2024',
      guests: 2,
      bedType: 'King Bed',
      daysAway: 3,
    },
    {
      bookingRef: 'Booking #GLM123457',
      status: 'confirmed' as const,
      roomName: 'Executive King Room',
      checkIn: 'Jan 5',
      checkOut: 'Jan 7, 2025',
      guests: 1,
      bedType: 'King Bed',
      daysAway: 14,
    },
  ];

  // Sample activity
  const recentActivity = [
    {
      text: 'Booking confirmed for Dec 25-28',
      timestamp: '2 hours ago',
    },
    {
      text: 'Payment processed successfully',
      timestamp: '1 day ago',
    },
    {
      text: 'Pre check-in completed for Jan booking',
      timestamp: '2 days ago',
    },
    {
      text: 'Reward points redeemed',
      timestamp: '5 days ago',
    },
  ];

  const handleQuickAction = (action: string) => {
    console.log('Quick action clicked:', action);
    switch (action) {
      case 'book-room':
        navigate('/rooms');
        break;
      case 'view-bookings':
      case 'pre-checkin':
        navigate('/pre-check-in');
        break;
      case 'payment-methods':
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  const handleChatOpen = () => {
    console.log('AI chat opened');
    // TODO: Implement chat interface
  };

  return (
    <div className={styles.dashboardContainer}>
      <Navigation
        isAuthenticated={isAuthenticated}
        userName={userData.firstName}
        userEmail={user?.email}
        userInitials={userData.initials}
        notificationCount={3}
        onSignOut={handleSignOut}
      />

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Welcome Section */}
        <section className={styles.welcomeSection}>
          <h1 className={styles.pageTitle}>Welcome back, {userData.firstName}!</h1>
          <p className={styles.pageSubtitle}>
            Here's what's happening with your stays today
          </p>
        </section>

        {/* Quick Actions Grid */}
        <section className={styles.quickActionsGrid}>
          <QuickActionCard
            icon={Hotel}
            title="Book Room"
            onClick={() => handleQuickAction('book-room')}
          />
          <QuickActionCard
            icon={Calendar}
            title="View Bookings"
            onClick={() => handleQuickAction('view-bookings')}
          />
          <QuickActionCard
            icon={Ticket}
            title="Pre Check-in"
            onClick={() => handleQuickAction('pre-checkin')}
          />
          <QuickActionCard
            icon={CreditCard}
            title="Payment Methods"
            onClick={() => handleQuickAction('payment-methods')}
          />
        </section>

        {/* Upcoming Stays Section */}
        <section className={styles.upcomingStays}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Your Upcoming Stays</h2>
            <button className={styles.viewAllLink} onClick={() => navigate('/pre-check-in')}>
              View All →
            </button>
          </div>
          <div className={styles.bookingsContainer}>
            {upcomingBookings.map((booking, index) => (
              <BookingCard key={index} {...booking} />
            ))}
          </div>
        </section>

        {/* Two Column Section */}
        <section className={styles.twoColumnSection}>
          {/* Recent Activity */}
          <div className={styles.recentActivityCard}>
            <h3 className={styles.subsectionTitle}>Recent Activity</h3>
            <div className={styles.activityList}>
              {recentActivity.map((activity, index) => (
                <div key={index} className={styles.activityItem}>
                  <p className={styles.activityText}>• {activity.text}</p>
                  <p className={styles.activityTimestamp}>{activity.timestamp}</p>
                </div>
              ))}
            </div>
            <button className={styles.showMoreLink} onClick={() => navigate('/pre-check-in')}>
              Show More
            </button>
          </div>

          {/* Quick Stats */}
          <div className={styles.quickStatsCard}>
            <h3 className={styles.subsectionTitle}>Your Stats</h3>
            <div className={styles.statsContainer}>
              <StatCard label="Total Bookings" value="12" />
              <StatCard label="Reward Points" value="2,450" />
              <StatCard label="Member Since" value="Jan 2023" />
            </div>
          </div>
        </section>
      </main>

      {/* AI Chat Bubble */}
      <button className={styles.aiChatBubble} onClick={handleChatOpen}>
        <MessageCircle size={28} strokeWidth={2} />
        {hasNewMessages && <span className={styles.chatNotificationDot} />}
      </button>

      <Footer />
    </div>
  );
};

export default Dashboard;
