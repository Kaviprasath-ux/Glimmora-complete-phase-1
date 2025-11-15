// ============================================
// SAMPLE ROOMS DATA
// ============================================

export const sampleRooms = [
  {
    id: 1,
    name: "Deluxe Suite",
    type: "Deluxe",
    description: "Experience luxury and comfort in our spacious Deluxe Suite. This beautifully appointed room features modern amenities, stunning city views, and elegant furnishings designed for your ultimate relaxation.",
    price: 250,
    originalPrice: 300,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"
    ],
    rating: 4.8,
    reviewCount: 124,
    guests: 2,
    bedType: "King Bed",
    size: "45m²",
    floor: "Floor 5-8",
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Mini Bar",
      "Safe Box",
      "Coffee Maker",
      "Flat Screen TV",
      "Work Desk",
      "Bathrobe & Slippers",
      "Hair Dryer",
      "Iron & Ironing Board",
      "Telephone",
      "Room Service"
    ],
    policies: [
      "Check-in: 2:00 PM",
      "Check-out: 12:00 PM",
      "No smoking",
      "No pets allowed",
      "Extra bed available: $50/night",
      "Breakfast available: $25/person"
    ],
    location: {
      address: "Floor 5-8, Glimmora Hotel",
      city: "123 Luxury Ave, Dubai, UAE"
    },
    available: true,
    featured: true
  },
  {
    id: 2,
    name: "Executive Suite",
    type: "Executive",
    description: "Our Executive Suite offers the perfect blend of comfort and sophistication. Ideal for business travelers with a separate living area, work desk, and premium amenities.",
    price: 350,
    originalPrice: 420,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfb?w=800"
    ],
    rating: 4.9,
    reviewCount: 98,
    guests: 2,
    bedType: "King Bed",
    size: "60m²",
    floor: "Floor 9-12",
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Mini Bar",
      "Safe Box",
      "Nespresso Machine",
      "Smart TV",
      "Executive Lounge Access",
      "Premium Toiletries",
      "Hair Dryer",
      "Iron & Board",
      "Work Desk",
      "Room Service"
    ],
    policies: [
      "Check-in: 2:00 PM",
      "Check-out: 12:00 PM",
      "No smoking",
      "No pets allowed"
    ],
    location: {
      address: "Floor 9-12, Glimmora Hotel",
      city: "123 Luxury Ave, Dubai, UAE"
    },
    available: true,
    featured: true
  },
  {
    id: 3,
    name: "Premium Suite",
    type: "Premium",
    description: "Indulge in ultimate luxury with our Premium Suite featuring panoramic views, spacious living areas, and exclusive VIP services.",
    price: 450,
    originalPrice: 550,
    discount: 18,
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
    ],
    rating: 5.0,
    reviewCount: 67,
    guests: 3,
    bedType: "King Bed + Sofa Bed",
    size: "75m²",
    floor: "Floor 13-15",
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Premium Mini Bar",
      "Safe Box",
      "Nespresso Machine",
      "Smart TV",
      "VIP Lounge Access",
      "Butler Service",
      "Luxury Toiletries",
      "Jacuzzi",
      "Separate Living Area",
      "24/7 Room Service"
    ],
    policies: [
      "Check-in: 2:00 PM",
      "Check-out: 12:00 PM",
      "No smoking",
      "Pets allowed (fee applies)"
    ],
    location: {
      address: "Floor 13-15, Glimmora Hotel",
      city: "123 Luxury Ave, Dubai, UAE"
    },
    available: true,
    featured: true
  },
  {
    id: 4,
    name: "Standard Room",
    type: "Standard",
    description: "Comfortable and affordable accommodation with all essential amenities for a pleasant stay.",
    price: 150,
    originalPrice: 180,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800"
    ],
    rating: 4.5,
    reviewCount: 203,
    guests: 2,
    bedType: "Queen Bed",
    size: "30m²",
    floor: "Floor 2-4",
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Mini Fridge",
      "Safe Box",
      "Coffee Maker",
      "TV",
      "Work Desk",
      "Hair Dryer",
      "Room Service"
    ],
    policies: [
      "Check-in: 2:00 PM",
      "Check-out: 12:00 PM",
      "No smoking",
      "No pets allowed"
    ],
    location: {
      address: "Floor 2-4, Glimmora Hotel",
      city: "123 Luxury Ave, Dubai, UAE"
    },
    available: true,
    featured: false
  },
  {
    id: 5,
    name: "Family Suite",
    type: "Family",
    description: "Spacious suite perfect for families with separate bedrooms and kid-friendly amenities.",
    price: 400,
    originalPrice: 480,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800"
    ],
    rating: 4.7,
    reviewCount: 89,
    guests: 4,
    bedType: "2 Queen Beds",
    size: "70m²",
    floor: "Floor 6-8",
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Mini Bar",
      "Safe Box",
      "Coffee Maker",
      "Smart TV",
      "Kids Amenities",
      "Connecting Rooms Available",
      "Hair Dryer",
      "Iron & Board",
      "Sofa Bed",
      "Room Service"
    ],
    policies: [
      "Check-in: 2:00 PM",
      "Check-out: 12:00 PM",
      "No smoking",
      "No pets allowed",
      "Cribs available upon request"
    ],
    location: {
      address: "Floor 6-8, Glimmora Hotel",
      city: "123 Luxury Ave, Dubai, UAE"
    },
    available: true,
    featured: false
  },
  {
    id: 6,
    name: "Honeymoon Suite",
    type: "Deluxe",
    description: "Romantic suite with luxury amenities, perfect for couples celebrating special occasions.",
    price: 500,
    originalPrice: 600,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800"
    ],
    rating: 4.9,
    reviewCount: 156,
    guests: 2,
    bedType: "King Bed",
    size: "55m²",
    floor: "Floor 14",
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Champagne on Arrival",
      "Safe Box",
      "Nespresso Machine",
      "Smart TV",
      "Jacuzzi",
      "Rose Petal Turndown",
      "Premium Toiletries",
      "Balcony",
      "Romantic Lighting",
      "Room Service"
    ],
    policies: [
      "Check-in: 2:00 PM",
      "Check-out: 12:00 PM",
      "No smoking",
      "No pets allowed"
    ],
    location: {
      address: "Floor 14, Glimmora Hotel",
      city: "123 Luxury Ave, Dubai, UAE"
    },
    available: true,
    featured: true
  }
];

// ============================================
// SAMPLE REVIEWS DATA
// ============================================

export const sampleReviews = {
  1: [ // Deluxe Suite reviews
    {
      id: 1,
      userName: "John Doe",
      userInitials: "JD",
      rating: 5.0,
      stayDate: "November 2024",
      text: "Amazing room! The view was spectacular and the amenities were top-notch. Would definitely stay again. Staff was very helpful and friendly.",
      helpful: 24,
      date: "2024-11-20"
    },
    {
      id: 2,
      userName: "Sarah Miller",
      userInitials: "SM",
      rating: 4.5,
      stayDate: "October 2024",
      text: "Lovely suite with comfortable beds and excellent service. The only minor issue was the Wi-Fi speed, but everything else was perfect!",
      helpful: 18,
      date: "2024-10-15"
    },
    {
      id: 3,
      userName: "Michael Chen",
      userInitials: "MC",
      rating: 5.0,
      stayDate: "October 2024",
      text: "Exceeded expectations! The room was spotless, beautifully decorated, and had everything we needed. Breakfast was delicious too.",
      helpful: 31,
      date: "2024-10-08"
    },
    {
      id: 4,
      userName: "Emma Wilson",
      userInitials: "EW",
      rating: 4.8,
      stayDate: "September 2024",
      text: "Great value for money. The suite was spacious and well-maintained. Loved the city view from our room!",
      helpful: 15,
      date: "2024-09-22"
    }
  ],
  2: [ // Executive Suite reviews
    {
      id: 5,
      userName: "David Brown",
      userInitials: "DB",
      rating: 5.0,
      stayDate: "November 2024",
      text: "Perfect for my business trip. The work desk was spacious and the executive lounge access was a great perk.",
      helpful: 12,
      date: "2024-11-18"
    },
    {
      id: 6,
      userName: "Lisa Anderson",
      userInitials: "LA",
      rating: 4.7,
      stayDate: "October 2024",
      text: "Excellent suite with premium amenities. The Nespresso machine was a nice touch. Highly recommend!",
      helpful: 9,
      date: "2024-10-25"
    }
  ],
  3: [ // Premium Suite reviews
    {
      id: 7,
      userName: "Robert Taylor",
      userInitials: "RT",
      rating: 5.0,
      stayDate: "November 2024",
      text: "Absolutely stunning! The panoramic views were breathtaking and the butler service was impeccable. Worth every penny.",
      helpful: 45,
      date: "2024-11-12"
    },
    {
      id: 8,
      userName: "Jennifer Lee",
      userInitials: "JL",
      rating: 5.0,
      stayDate: "October 2024",
      text: "This was our anniversary trip and the Premium Suite made it unforgettable. The jacuzzi and VIP lounge access were amazing!",
      helpful: 38,
      date: "2024-10-20"
    }
  ]
};

// ============================================
// SAMPLE SERVICES DATA
// ============================================

export const sampleServices = [
  {
    id: 1,
    name: "24/7 Room Service",
    category: "dining",
    icon: "UtensilsCrossed",
    description: "In-room dining with gourmet selections from our award-winning chefs, available around the clock.",
    hours: "Available 24/7",
    featured: false
  },
  {
    id: 2,
    name: "Swimming Pool",
    category: "facilities",
    icon: "Waves",
    description: "Enjoy our heated infinity pool with stunning city views and poolside bar service.",
    hours: "6:00 AM - 10:00 PM",
    featured: false
  },
  {
    id: 3,
    name: "Spa & Wellness",
    category: "wellness",
    icon: "Sparkles",
    description: "Relax and rejuvenate with our signature spa treatments and wellness programs.",
    hours: "9:00 AM - 9:00 PM",
    featured: true
  },
  {
    id: 4,
    name: "Fitness Center",
    category: "facilities",
    icon: "Dumbbell",
    description: "State-of-the-art equipment and personal training available 24/7.",
    hours: "24/7",
    featured: false
  },
  {
    id: 5,
    name: "Restaurant & Bar",
    category: "dining",
    icon: "Wine",
    description: "Fine dining experience with international and local cuisine.",
    hours: "7:00 AM - 11:00 PM",
    featured: false
  },
  {
    id: 6,
    name: "Business Center",
    category: "business",
    icon: "Briefcase",
    description: "Fully equipped workspace with high-speed internet and meeting rooms.",
    hours: "24/7",
    featured: false
  },
  {
    id: 7,
    name: "Concierge Service",
    category: "concierge",
    icon: "Bell",
    description: "Personalized assistance for all your needs and reservations.",
    hours: "24/7",
    featured: false
  },
  {
    id: 8,
    name: "Valet Parking",
    category: "concierge",
    icon: "Car",
    description: "Complimentary valet parking for all guests with 24-hour access.",
    hours: "24/7",
    featured: false
  },
  {
    id: 9,
    name: "Airport Transfer",
    category: "concierge",
    icon: "Plane",
    description: "Luxury transportation to and from the airport in premium vehicles.",
    hours: "On Request",
    featured: false
  },
  {
    id: 10,
    name: "Laundry Service",
    category: "facilities",
    icon: "Shirt",
    description: "Same-day laundry and dry cleaning services available.",
    hours: "7:00 AM - 8:00 PM",
    featured: false
  },
  {
    id: 11,
    name: "Meeting Rooms",
    category: "business",
    icon: "Users",
    description: "Professional meeting spaces with modern AV equipment and catering.",
    hours: "On Request",
    featured: false
  },
  {
    id: 12,
    name: "Kids Club",
    category: "recreation",
    icon: "Baby",
    description: "Supervised activities and entertainment for children ages 4-12.",
    hours: "9:00 AM - 6:00 PM",
    featured: false
  }
];

// ============================================
// SAMPLE USER DATA
// ============================================

export const sampleUsers = [
  {
    id: 1,
    email: "john.doe@email.com",
    password: "demo123", // For demo purposes only
    firstName: "John",
    lastName: "Doe",
    phone: "+971 50 123 4567",
    country: "United Arab Emirates",
    createdAt: "2024-01-15",
    bookings: [1, 2] // Booking IDs
  },
  {
    id: 2,
    email: "sarah.miller@email.com",
    password: "demo123",
    firstName: "Sarah",
    lastName: "Miller",
    phone: "+971 50 987 6543",
    country: "United Arab Emirates",
    createdAt: "2024-03-20",
    bookings: []
  }
];

// ============================================
// SAMPLE BOOKINGS DATA
// ============================================

export const sampleBookings = [
  {
    id: 1,
    bookingId: "unique-booking-1",
    confirmationNumber: "GLM123456",
    transactionId: "TXN1234567890",
    userId: 1,
    roomId: 1,
    status: "Confirmed",
    bookingDate: "2024-11-10T10:30:00Z",
    guestInfo: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      phone: "+971 50 123 4567",
      country: "United Arab Emirates"
    },
    bookingDates: {
      checkIn: "2024-12-20T14:00:00Z",
      checkOut: "2024-12-22T12:00:00Z",
      nights: 2
    },
    guests: 2,
    pricing: {
      roomTotal: 500,
      serviceFee: 50,
      taxes: 75,
      additionalOptions: {
        breakfast: 100
      },
      total: 725
    },
    paymentMethod: "Credit Card",
    additionalOptions: {
      breakfast: true,
      airportPickup: false,
      earlyCheckIn: false,
      lateCheckOut: false
    },
    specialRequests: "High floor preferred, extra pillows",
    preCheckInCompleted: false,
    preCheckInData: null,
    preCheckInEligible: true
  },
  {
    id: 2,
    bookingId: "unique-booking-2",
    confirmationNumber: "GLM789012",
    transactionId: "TXN0987654321",
    userId: 1,
    roomId: 3,
    status: "Confirmed",
    bookingDate: "2024-11-12T15:45:00Z",
    guestInfo: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      phone: "+971 50 123 4567",
      country: "United Arab Emirates"
    },
    bookingDates: {
      checkIn: "2024-11-25T14:00:00Z",
      checkOut: "2024-11-28T12:00:00Z",
      nights: 3
    },
    guests: 2,
    pricing: {
      roomTotal: 1350,
      serviceFee: 50,
      taxes: 202.5,
      additionalOptions: {},
      total: 1602.5
    },
    paymentMethod: "Credit Card",
    additionalOptions: {
      breakfast: false,
      airportPickup: true,
      earlyCheckIn: false,
      lateCheckOut: true
    },
    specialRequests: "",
    preCheckInCompleted: false,
    preCheckInData: null,
    preCheckInEligible: true
  }
];

// ============================================
// SAMPLE FAQ DATA
// ============================================

export const sampleFAQs = [
  {
    id: 1,
    question: "What are your check-in and check-out times?",
    answer: "Check-in is at 2:00 PM and check-out is at 12:00 PM. Early check-in and late check-out are available upon request for an additional fee of $50 each, subject to availability."
  },
  {
    id: 2,
    question: "Do you offer airport transportation?",
    answer: "Yes, we offer luxury airport transfer services. You can book this during your reservation or contact our concierge team. The service costs $75 one-way and includes meet-and-greet service."
  },
  {
    id: 3,
    question: "Is parking available at the hotel?",
    answer: "Yes, we offer complimentary valet parking for all our guests. The parking facility is secure and available 24/7 with in-and-out privileges."
  },
  {
    id: 4,
    question: "What are your cancellation policies?",
    answer: "We offer free cancellation up to 24 hours before your check-in date. Cancellations made within 24 hours of arrival will be charged one night's stay. No-shows will be charged the full booking amount."
  },
  {
    id: 5,
    question: "Do you accept pets?",
    answer: "Pets are allowed in select room categories (Premium Suite and above) with prior notice. A pet fee of $50 per night applies. Please contact us before booking to ensure availability."
  },
  {
    id: 6,
    question: "Are there any additional fees I should know about?",
    answer: "Room rates include basic amenities and WiFi. Additional charges may apply for: breakfast ($25/person), minibar items, spa services, room service, and optional services like airport transfer or early check-in."
  },
  {
    id: 7,
    question: "How can I make a reservation?",
    answer: "You can book directly through our website, call our reservations team at +971 4 123 4567, or email us at reservations@glimmora.com. We recommend booking in advance to secure your preferred room type."
  }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Generate unique confirmation number
export const generateConfirmationNumber = () => {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `GLM${randomDigits}`;
};

// Generate transaction ID
export const generateTransactionId = () => {
  const timestamp = Date.now();
  return `TXN${timestamp}`;
};

// Calculate if booking is eligible for pre check-in
export const isEligibleForPreCheckIn = (checkInDate) => {
  const now = new Date();
  const checkIn = new Date(checkInDate);
  const hoursUntilCheckIn = (checkIn - now) / (1000 * 60 * 60);

  return hoursUntilCheckIn <= 24 && hoursUntilCheckIn > 0;
};

// Calculate nights between dates
export const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Format currency
export const formatCurrency = (amount) => {
  return `$${amount.toLocaleString('en-US')}`;
};
