import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  sampleRooms,
  sampleUsers,
  sampleBookings,
  sampleServices,
  sampleReviews,
  sampleFAQs,
  generateConfirmationNumber,
  generateTransactionId,
  isEligibleForPreCheckIn
} from '../data/sampleData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // ============================================
  // STATE
  // ============================================

  // User authentication
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Rooms
  const [rooms, setRooms] = useState(sampleRooms);
  const [filteredRooms, setFilteredRooms] = useState(sampleRooms);

  // Bookings
  const [bookings, setBookings] = useState(sampleBookings);
  const [currentBooking, setCurrentBooking] = useState(null);

  // Services
  const [services, setServices] = useState(sampleServices);

  // Reviews
  const [reviews, setReviews] = useState(sampleReviews);

  // FAQs
  const [faqs, setFAqs] = useState(sampleFAQs);

  // Search filters
  const [searchFilters, setSearchFilters] = useState({
    checkIn: null,
    checkOut: null,
    guests: 2,
    priceRange: [0, 1000],
    roomType: 'all'
  });

  // Booking flow data
  const [bookingFlowData, setBookingFlowData] = useState({
    room: null,
    dates: null,
    guests: null,
    guestInfo: null,
    additionalOptions: null,
    paymentInfo: null
  });

  // ============================================
  // AUTHENTICATION FUNCTIONS
  // ============================================

  const login = (email, password) => {
    const user = sampleUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    }

    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const signup = (userData) => {
    const newUser = {
      id: sampleUsers.length + 1,
      ...userData,
      createdAt: new Date().toISOString(),
      bookings: []
    };

    sampleUsers.push(newUser);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    return { success: true, user: newUser };
  };

  // ============================================
  // ROOM FUNCTIONS
  // ============================================

  const getRoomById = (id) => {
    return rooms.find(room => room.id === parseInt(id));
  };

  const filterRooms = (filters) => {
    let filtered = rooms;

    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(
        room => room.price >= filters.priceRange[0] &&
                room.price <= filters.priceRange[1]
      );
    }

    // Filter by room type
    if (filters.roomType && filters.roomType !== 'all') {
      filtered = filtered.filter(
        room => room.type.toLowerCase() === filters.roomType.toLowerCase()
      );
    }

    // Filter by guests
    if (filters.guests) {
      filtered = filtered.filter(
        room => room.guests >= filters.guests
      );
    }

    setFilteredRooms(filtered);
    return filtered;
  };

  const searchRooms = (checkIn, checkOut, guests) => {
    setSearchFilters({ ...searchFilters, checkIn, checkOut, guests });
    // In a real app, check availability against bookings
    return filterRooms({ ...searchFilters, guests });
  };

  // ============================================
  // BOOKING FUNCTIONS
  // ============================================

  const createBooking = (bookingData) => {
    const newBooking = {
      id: bookings.length + 1,
      bookingId: `unique-booking-${bookings.length + 1}`,
      confirmationNumber: generateConfirmationNumber(),
      transactionId: generateTransactionId(),
      userId: currentUser?.id || null,
      status: 'Confirmed',
      bookingDate: new Date().toISOString(),
      preCheckInCompleted: false,
      preCheckInData: null,
      preCheckInEligible: isEligibleForPreCheckIn(bookingData.bookingDates.checkIn),
      ...bookingData
    };

    setBookings([...bookings, newBooking]);
    setCurrentBooking(newBooking);

    // Add to user's bookings if logged in
    if (currentUser) {
      currentUser.bookings.push(newBooking.id);
    }

    return newBooking;
  };

  const getBookingByConfirmation = (confirmationNumber, email) => {
    const booking = bookings.find(
      b => b.confirmationNumber === confirmationNumber &&
           b.guestInfo.email.toLowerCase() === email.toLowerCase()
    );
    return booking;
  };

  const getUserBookings = (userId) => {
    return bookings.filter(b => b.userId === userId);
  };

  const getEligiblePreCheckInBookings = (userId) => {
    const userBookings = getUserBookings(userId);
    return userBookings.filter(b => {
      const eligible = isEligibleForPreCheckIn(b.bookingDates.checkIn);
      return eligible && !b.preCheckInCompleted && b.status === 'Confirmed';
    });
  };

  const completePreCheckIn = (bookingId, preCheckInData) => {
    const updatedBookings = bookings.map(b => {
      if (b.id === bookingId || b.confirmationNumber === bookingId) {
        return {
          ...b,
          preCheckInCompleted: true,
          preCheckInData,
          preCheckInDate: new Date().toISOString()
        };
      }
      return b;
    });

    setBookings(updatedBookings);
    return true;
  };

  // ============================================
  // BOOKING FLOW FUNCTIONS
  // ============================================

  const startBookingFlow = (room, dates, guests) => {
    setBookingFlowData({
      room,
      dates,
      guests,
      guestInfo: null,
      additionalOptions: null,
      paymentInfo: null
    });
  };

  const updateBookingFlow = (step, data) => {
    setBookingFlowData({
      ...bookingFlowData,
      [step]: data
    });
  };

  const clearBookingFlow = () => {
    setBookingFlowData({
      room: null,
      dates: null,
      guests: null,
      guestInfo: null,
      additionalOptions: null,
      paymentInfo: null
    });
  };

  // ============================================
  // CONTACT FORM
  // ============================================

  const submitContactForm = (formData) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Contact form submitted:', formData);
        resolve({ success: true, message: 'Message sent successfully!' });
      }, 1500);
    });
  };

  // ============================================
  // REVIEWS
  // ============================================

  const getReviewsForRoom = (roomId) => {
    return reviews[roomId] || [];
  };

  // ============================================
  // LOAD USER FROM LOCAL STORAGE
  // ============================================

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  // ============================================
  // CONTEXT VALUE
  // ============================================

  const value = {
    // User
    currentUser,
    isAuthenticated,
    login,
    logout,
    signup,

    // Rooms
    rooms,
    filteredRooms,
    getRoomById,
    filterRooms,
    searchRooms,

    // Bookings
    bookings,
    currentBooking,
    setCurrentBooking,
    createBooking,
    getBookingByConfirmation,
    getUserBookings,
    getEligiblePreCheckInBookings,
    completePreCheckIn,

    // Booking Flow
    bookingFlowData,
    startBookingFlow,
    updateBookingFlow,
    clearBookingFlow,

    // Services
    services,

    // Reviews
    reviews,
    getReviewsForRoom,

    // FAQs
    faqs,

    // Contact
    submitContactForm,

    // Filters
    searchFilters,
    setSearchFilters
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
