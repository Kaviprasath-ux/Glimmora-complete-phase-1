// ============================================
// USER JOURNEY SCENARIOS
// ============================================

export const userJourneys = {
  // Journey 1: New User Books a Room
  newUserBooking: {
    name: "New User Complete Booking",
    steps: [
      {
        step: 1,
        page: "Home",
        action: "Land on homepage",
        description: "User arrives at Glimmora Hotel website"
      },
      {
        step: 2,
        page: "Home",
        action: "Use search widget",
        description: "Select dates: Dec 20-22, 2024, 2 guests"
      },
      {
        step: 3,
        page: "Rooms",
        action: "Browse rooms",
        description: "View available rooms, use filters"
      },
      {
        step: 4,
        page: "Rooms",
        action: "Click room card",
        description: "Click 'View Details' on Deluxe Suite"
      },
      {
        step: 5,
        page: "Room Details",
        action: "Review room",
        description: "View images, amenities, reviews"
      },
      {
        step: 6,
        page: "Room Details",
        action: "Click 'Book Now'",
        description: "Proceed to booking flow"
      },
      {
        step: 7,
        page: "Booking - Guest Details",
        action: "Fill form",
        description: "Enter: John Doe, john.doe@email.com, +971 50 123 4567"
      },
      {
        step: 8,
        page: "Booking - Guest Details",
        action: "Select options",
        description: "Add breakfast ($100)"
      },
      {
        step: 9,
        page: "Booking - Guest Details",
        action: "Accept terms",
        description: "Check terms & conditions"
      },
      {
        step: 10,
        page: "Booking - Guest Details",
        action: "Continue",
        description: "Click 'Continue to Payment'"
      },
      {
        step: 11,
        page: "Booking - Payment",
        action: "Select payment",
        description: "Choose Credit Card payment method"
      },
      {
        step: 12,
        page: "Booking - Payment",
        action: "Enter card details",
        description: "Card: 4111 1111 1111 1111, Exp: 12/25, CVV: 123"
      },
      {
        step: 13,
        page: "Booking - Payment",
        action: "Complete",
        description: "Click 'Complete Booking'"
      },
      {
        step: 14,
        page: "Booking - Confirmation",
        action: "View confirmation",
        description: "See confirmation: GLM123456, Total: $725"
      }
    ],
    expectedData: {
      confirmationNumber: "GLM123456",
      roomName: "Deluxe Suite",
      checkIn: "2024-12-20",
      checkOut: "2024-12-22",
      guests: 2,
      total: 725
    }
  },

  // Journey 2: Returning User Pre Check-in
  returningUserPreCheckIn: {
    name: "Logged User Pre Check-in",
    steps: [
      {
        step: 1,
        page: "Home",
        action: "Sign in",
        description: "Click 'Sign In', enter: john.doe@email.com / demo123"
      },
      {
        step: 2,
        page: "Home",
        action: "Navigate",
        description: "Click 'Pre Check-in' in navigation"
      },
      {
        step: 3,
        page: "Pre Check-in",
        action: "View bookings",
        description: "See upcoming eligible bookings list"
      },
      {
        step: 4,
        page: "Pre Check-in",
        action: "Select booking",
        description: "Click 'Start Pre Check-in' for GLM123456"
      },
      {
        step: 5,
        page: "Pre Check-in Form",
        action: "Fill details",
        description: "Select arrival time: 2PM-4PM, Keys: 2"
      },
      {
        step: 6,
        page: "Pre Check-in Form",
        action: "Add requests",
        description: "Special request: High floor, extra pillows"
      },
      {
        step: 7,
        page: "Pre Check-in Form",
        action: "Accept terms",
        description: "Check terms confirmation"
      },
      {
        step: 8,
        page: "Pre Check-in Form",
        action: "Submit",
        description: "Click 'Complete Pre Check-in'"
      },
      {
        step: 9,
        page: "Pre Check-in Success",
        action: "View success",
        description: "See confirmation and next steps"
      }
    ]
  },

  // Journey 3: Guest Pre Check-in (No Account)
  guestPreCheckIn: {
    name: "Non-logged User Pre Check-in",
    steps: [
      {
        step: 1,
        page: "Home",
        action: "Navigate",
        description: "Click 'Pre Check-in' in navigation"
      },
      {
        step: 2,
        page: "Pre Check-in",
        action: "Enter details",
        description: "Confirmation: GLM123456, Email: john.doe@email.com"
      },
      {
        step: 3,
        page: "Pre Check-in",
        action: "Find booking",
        description: "Click 'Find My Booking'"
      },
      {
        step: 4,
        page: "Pre Check-in Form",
        action: "Fill form",
        description: "Complete pre check-in form"
      },
      {
        step: 5,
        page: "Pre Check-in Form",
        action: "Submit",
        description: "Complete pre check-in"
      },
      {
        step: 6,
        page: "Pre Check-in Success",
        action: "View confirmation",
        description: "See success message"
      }
    ]
  },

  // Journey 4: Browse and Contact
  browseAndContact: {
    name: "Browse Services and Contact",
    steps: [
      {
        step: 1,
        page: "Home",
        action: "Navigate",
        description: "Click 'Services' in navigation"
      },
      {
        step: 2,
        page: "Services",
        action: "Browse",
        description: "View all services, filter by category"
      },
      {
        step: 3,
        page: "Services",
        action: "Navigate",
        description: "Click 'Contact' in navigation"
      },
      {
        step: 4,
        page: "Contact",
        action: "Fill form",
        description: "Enter name, email, subject: 'Spa Inquiry'"
      },
      {
        step: 5,
        page: "Contact",
        action: "Send",
        description: "Submit contact form"
      },
      {
        step: 6,
        page: "Contact",
        action: "View success",
        description: "See success message"
      }
    ]
  }
};

// ============================================
// DEMO MODES
// ============================================

export const demoModes = {
  // Auto-fill forms for quick demo
  autoFill: {
    enabled: true,
    guestDetails: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      phone: "+971 50 123 4567",
      country: "United Arab Emirates",
      specialRequests: "High floor preferred, extra pillows"
    },
    paymentDetails: {
      cardNumber: "4111 1111 1111 1111",
      cardholderName: "JOHN DOE",
      expiryDate: "12 / 25",
      cvv: "123",
      billingAddress: "123 Luxury Ave",
      city: "Dubai",
      postalCode: "12345",
      country: "United Arab Emirates"
    },
    preCheckInDetails: {
      arrivalTime: "2:00 PM - 4:00 PM",
      numberOfKeys: "2",
      preferredFloor: "High Floor (8+)",
      specialRequests: "High floor preferred, extra pillows"
    },
    contactForm: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+971 50 123 4567",
      subject: "General Inquiry",
      message: "I would like to know more about your spa services and packages. Are there any special offers available?"
    },
    loginDetails: {
      email: "john.doe@email.com",
      password: "demo123"
    }
  },

  // Skip delays for instant demo
  instantMode: {
    enabled: false,
    skipAnimations: true,
    skipLoadingStates: true
  },

  // Show helper tooltips
  guidedMode: {
    enabled: false,
    showTooltips: true,
    highlightActiveElements: true
  }
};
