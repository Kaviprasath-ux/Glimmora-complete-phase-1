import React, { useState } from 'react';
import {
  Bell,
  Hotel,
  Calendar,
  Ticket,
  CreditCard,
  MessageCircle,
} from 'lucide-react';
import QuickActionCard from './QuickActionCard';
import BookingCard from './BookingCard';
import StatCard from './StatCard';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notificationCount] = useState(3);
  const [hasNewMessages] = useState(true);

  // Sample user data
  const userData = {
    firstName: 'John',
    initials: 'JD',
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
    // TODO: Implement navigation or modal
  };

  const handleSignOut = () => {
    console.log('Sign out clicked');
    // TODO: Implement sign out logic
  };

  const handleChatOpen = () => {
    console.log('AI chat opened');
    // TODO: Implement chat interface
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Top Navigation Bar */}
      <header className={styles.topNav}>
        <div className={styles.navContent}>
          {/* Left Side */}
          <div className={styles.navLeft}>
            <div className={styles.logo}>GLIMMORA</div>
            <nav className={styles.navItems}>
              <a
                href="#dashboard"
                className={`${styles.navItem} ${
                  activeTab === 'dashboard' ? styles.navItemActive : ''
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </a>
              <a
                href="#bookings"
                className={`${styles.navItem} ${
                  activeTab === 'bookings' ? styles.navItemActive : ''
                }`}
                onClick={() => setActiveTab('bookings')}
              >
                Bookings
              </a>
              <a
                href="#profile"
                className={`${styles.navItem} ${
                  activeTab === 'profile' ? styles.navItemActive : ''
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </a>
              <a
                href="#services"
                className={`${styles.navItem} ${
                  activeTab === 'services' ? styles.navItemActive : ''
                }`}
                onClick={() => setActiveTab('services')}
              >
                Services
              </a>
            </nav>
          </div>

          {/* Right Side */}
          <div className={styles.navRight}>
            <div className={styles.notificationIcon}>
              <Bell size={20} strokeWidth={2} />
              {notificationCount > 0 && (
                <span className={styles.notificationBadge}>{notificationCount}</span>
              )}
            </div>
            <span className={styles.userGreeting}>Hi, {userData.firstName}</span>
            <div className={styles.userAvatar}>{userData.initials}</div>
            <a href="#signout" className={styles.signOutLink} onClick={handleSignOut}>
              Sign Out
            </a>
          </div>
        </div>
      </header>

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
            <a href="#view-all" className={styles.viewAllLink}>
              View All →
            </a>
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
            <a href="#show-more" className={styles.showMoreLink}>
              Show More
            </a>
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
    </div>
  );
};

export default Dashboard;
