# Glimmora Hotel - Demo Guide

## Overview

This is a complete end-to-end prototype/demo for the Glimmora Hotel website with realistic sample data and full user journeys. The prototype demonstrates all key features and user flows without requiring a backend or database.

---

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Demo Features

### ✅ What's Included

- **Sample Data:** 6 rooms, 2 users, 2 bookings, 12 services, reviews, FAQs
- **User Authentication:** Demo login/logout with sample credentials
- **Context API:** Global state management for rooms, bookings, users
- **Demo Mode Indicator:** Visual indicator showing you're in demo mode
- **Auto-fill Buttons:** One-click form population for quick demos
- **Realistic Data:** All sample data mimics real-world scenarios

### 📋 Sample Data Available

**Rooms:**
- Deluxe Suite - $250/night
- Executive Suite - $350/night
- Premium Suite - $450/night
- Standard Room - $150/night
- Family Suite - $400/night
- Honeymoon Suite - $500/night

**Users:**
- john.doe@email.com / demo123 (has 2 bookings)
- sarah.miller@email.com / demo123 (no bookings)

**Bookings:**
- GLM123456 - Deluxe Suite (Dec 20-22, 2024)
- GLM789012 - Premium Suite (Nov 25-28, 2024)

---

## Quick Demo Scenarios

### Scenario 1: Pre Check-in - Logged User (3 minutes)

**Starting Point:** Pre Check-in page (currently displayed)

**Current Setup:** App.tsx is showing Pre Check-in page with logged-in state

**What You'll See:**

1. **Booking List View:**
   - User is logged in as "John Doe"
   - See eligible bookings for pre check-in
   - Two sample bookings displayed:
     - GLM123456 (Deluxe Suite, Dec 20-22)
     - GLM789012 (Premium Suite, Nov 25-28)

2. **Select a Booking:**
   - Click "Start Pre Check-in" on any booking
   - Form loads with booking details pre-filled

3. **Complete Pre Check-in Form:**
   - Read-only guest information (auto-populated)
   - Select arrival time from dropdown
   - Choose number of room keys
   - Select preferred floor
   - Add special requests (optional)
   - Accept terms and conditions
   - Click "Complete Pre Check-in"

4. **Success View:**
   - See success animation
   - View confirmation details
   - Digital key activation info
   - Next steps and important information

**To Test Non-Logged User:**
- Edit `src/App.tsx` line 28
- Change `isAuthenticated={true}` to `isAuthenticated={false}`
- Refresh browser
- See lookup form instead of booking list

---

### Scenario 2: View Other Pages

The app is set up to show one page at a time. To view different pages:

#### Contact Page

**Edit src/App.tsx:**
```typescript
// Comment out Pre Check-in:
{/* <PreCheckIn isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} /> */}

// Uncomment Contact:
<Contact isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />
```

**What You'll See:**
- Hero section with page title
- 3 contact info cards (Phone, Email, Visit) overlapping hero
- Contact form with validation
- Office hours and location info
- FAQ accordion with 7 questions
- Footer with all links

#### Services Page

**Edit src/App.tsx:**
```typescript
<Services isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />
```

**What You'll See:**
- Hero section
- Sticky category tabs (All, Dining, Wellness, Facilities, etc.)
- 12 service cards in grid layout
- Featured service spotlight (Spa & Wellness)
- Amenities quick view
- CTA banner

#### Payment Page

**Edit src/App.tsx:**
```typescript
<Payment isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />
```

**What You'll See:**
- Progress stepper (Step 2 of 3)
- Breadcrumb navigation
- Payment method selection (Credit Card, PayPal, Bank Transfer)
- Credit card form with auto-formatting
- Billing address section
- Security badges
- Sticky booking summary on right
- Form validation

#### Confirmation Page

**Edit src/App.tsx:**
```typescript
<Confirmation isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />
```

**What You'll See:**
- Progress stepper (all steps completed)
- Success animation with checkmark
- Booking confirmation details
- Payment summary breakdown
- Important information cards
- Action buttons (Download Receipt, View Booking, Back to Home)

---

## Navigation Features

### Top Navigation

**For Non-Logged Users:**
- Logo
- Nav items: Home | Rooms | Services | Contact | Pre Check-in
- Sign In link
- Book Now button

**For Logged Users:**
- Same nav items
- Notification bell icon (with badge if notifications exist)
- User greeting: "Hi, John"
- Avatar dropdown with:
  - User info (name, email)
  - My Dashboard
  - My Bookings
  - Pre Check-in
  - Profile Settings
  - Sign Out

### Footer

All pages include footer with:
- Brand section with logo and tagline
- Quick Links: Home | Rooms | Services | **Pre Check-in** | About | Contact
- Contact info (Phone, Email, Address)
- Social media icons
- Copyright info

---

## Demo Data Details

### Sample Rooms (6 total)

Each room includes:
- Name, type, description
- Price (current and original with discount)
- High-quality images (5 per room)
- Rating and review count
- Guest capacity and bed type
- Room size and floor location
- 12+ amenities
- Policies and rules
- Location details

### Sample Users (2 total)

**User 1: john.doe@email.com**
- Password: demo123
- Name: John Doe
- Has 2 bookings
- Use for testing logged-in features

**User 2: sarah.miller@email.com**
- Password: demo123
- Name: Sarah Miller
- No bookings
- Use for testing new user experience

### Sample Bookings (2 total)

**Booking 1:**
- Confirmation: GLM123456
- Email: john.doe@email.com
- Room: Deluxe Suite
- Check-in: Dec 20, 2024 2:00 PM
- Check-out: Dec 22, 2024 12:00 PM
- Guests: 2
- Nights: 2
- Price: $500 (room) + $100 (breakfast) + $75 (taxes) + $50 (service) = $725
- Pre check-in eligible: Yes
- Status: Confirmed

**Booking 2:**
- Confirmation: GLM789012
- Email: john.doe@email.com
- Room: Premium Suite
- Check-in: Nov 25, 2024
- Check-out: Nov 28, 2024
- Guests: 2
- Nights: 3
- Price: $1,350 (room) + $202.50 (taxes) + $50 (service) = $1,602.50
- Pre check-in eligible: Yes (within 24 hours)
- Status: Confirmed

### Sample Services (12 total)

Organized by categories:
- **Dining:** 24/7 Room Service, Restaurant & Bar
- **Wellness:** Spa & Wellness (Featured)
- **Facilities:** Swimming Pool, Fitness Center, Laundry Service
- **Business:** Business Center, Meeting Rooms
- **Concierge:** Concierge Service, Valet Parking, Airport Transfer
- **Recreation:** Kids Club

### Sample Reviews

- Deluxe Suite: 4 reviews (4.8 avg rating)
- Executive Suite: 2 reviews (4.9 avg rating)
- Premium Suite: 2 reviews (5.0 avg rating)

---

## Context API Usage

The `AppContext` provides global state for:

### Authentication
```javascript
const { currentUser, isAuthenticated, login, logout } = useApp();
```

### Rooms
```javascript
const { rooms, filteredRooms, getRoomById, filterRooms, searchRooms } = useApp();
```

### Bookings
```javascript
const {
  bookings,
  currentBooking,
  createBooking,
  getBookingByConfirmation,
  getUserBookings,
  getEligiblePreCheckInBookings,
  completePreCheckIn
} = useApp();
```

### Other Resources
```javascript
const { services, reviews, faqs, submitContactForm } = useApp();
```

---

## Auto-fill Functionality

### How to Add Auto-fill to a Form

1. **Import dependencies:**
```javascript
import AutoFillButton from '../../components/DemoHelpers/AutoFillButton';
import { demoModes } from '../../data/userJourneys';
```

2. **Create auto-fill handler:**
```javascript
const handleAutoFill = () => {
  const autoFillData = demoModes.autoFill.guestDetails;
  setFormData({
    firstName: autoFillData.firstName,
    lastName: autoFillData.lastName,
    email: autoFillData.email,
    phone: autoFillData.phone,
    country: autoFillData.country,
    specialRequests: autoFillData.specialRequests
  });
};
```

3. **Add button to component:**
```javascript
<AutoFillButton onClick={handleAutoFill} text="Auto-fill Demo Data" />
```

### Available Auto-fill Data

**Guest Details:**
- firstName: "John"
- lastName: "Doe"
- email: "john.doe@email.com"
- phone: "+971 50 123 4567"
- country: "United Arab Emirates"
- specialRequests: "High floor preferred, extra pillows"

**Payment Details:**
- cardNumber: "4111 1111 1111 1111"
- cardholderName: "JOHN DOE"
- expiryDate: "12 / 25"
- cvv: "123"
- billingAddress: "123 Luxury Ave"
- city: "Dubai"
- postalCode: "12345"
- country: "United Arab Emirates"

**Pre Check-in Details:**
- arrivalTime: "2:00 PM - 4:00 PM"
- numberOfKeys: "2"
- preferredFloor: "High Floor (8+)"
- specialRequests: "High floor preferred, extra pillows"

**Contact Form:**
- name: "John Doe"
- email: "john.doe@email.com"
- phone: "+971 50 123 4567"
- subject: "General Inquiry"
- message: "I would like to know more about your spa services..."

**Login:**
- email: "john.doe@email.com"
- password: "demo123"

---

## Testing Workflows

### Test Pre Check-in (Logged User)

1. ✅ App.tsx already set to logged-in state
2. ✅ See booking list with 2 eligible bookings
3. ✅ Click "Start Pre Check-in" on GLM123456
4. ✅ Form shows with booking details
5. ✅ Fill form (or use auto-fill if implemented)
6. ✅ Submit and see success view

### Test Pre Check-in (Guest - No Account)

1. Edit App.tsx: `isAuthenticated={false}`
2. Refresh browser
3. See lookup form
4. Enter: GLM123456 + john.doe@email.com
5. Click "Find My Booking"
6. Complete pre check-in form
7. See success view

### Test Contact Form

1. Uncomment Contact page in App.tsx
2. Scroll to contact form
3. Fill out all fields
4. Submit form
5. See success message

### Test Services Browsing

1. Uncomment Services page in App.tsx
2. Browse all services
3. Click category tabs to filter
4. View featured service section
5. Check amenities grid

### Test Payment Flow

1. Uncomment Payment page in App.tsx
2. Select payment method
3. Fill credit card details
4. Add billing address
5. Review booking summary (sticky on right)
6. Click "Complete Booking"

### Test Confirmation

1. Uncomment Confirmation page in App.tsx
2. View success animation
3. See all booking details
4. Check payment summary
5. Read important information cards
6. Test action buttons

---

## File Structure

```
src/
├── data/
│   ├── sampleData.js          # All sample data (rooms, users, bookings, etc.)
│   └── userJourneys.js        # Demo scenarios and auto-fill data
├── context/
│   └── AppContext.jsx         # Global state management
├── components/
│   ├── DemoHelpers/
│   │   ├── AutoFillButton.jsx
│   │   ├── DemoModeIndicator.jsx
│   │   └── DemoHelpers.module.css
│   ├── Home/
│   │   ├── Navigation.tsx     # Updated with Pre Check-in link
│   │   ├── Footer.tsx         # Updated with Pre Check-in link
│   │   └── AvatarDropdown.tsx # Updated with Pre Check-in menu item
│   ├── PreCheckIn/
│   │   ├── BookingCard.tsx
│   │   ├── BookingListView.tsx
│   │   ├── LookupFormView.tsx
│   │   ├── PreCheckInForm.tsx
│   │   └── SuccessView.tsx
│   ├── Booking/
│   │   ├── Payment/
│   │   └── Confirmation/
│   ├── Services/
│   └── Contact/
├── pages/
│   ├── PreCheckIn/
│   │   └── PreCheckIn.tsx     # Main pre check-in page
│   ├── Services/
│   │   └── Services.tsx
│   └── Contact/
│       └── Contact.tsx
└── App.tsx                     # Main app with AppProvider wrapper
```

---

## Known Limitations

### Current State

- ✅ All components built and functional
- ✅ Sample data loaded and accessible
- ✅ Context API implemented
- ✅ Demo mode indicator visible
- ✅ Pre Check-in page fully functional (4 views)
- ✅ Services page complete
- ✅ Contact page complete
- ✅ Payment page complete
- ✅ Confirmation page complete
- ✅ Navigation updated with Pre Check-in link
- ✅ Footer updated with Pre Check-in link
- ✅ Avatar dropdown updated

### Not Yet Implemented

- ❌ Full routing with react-router-dom (pages shown one at a time via App.tsx)
- ❌ Auto-fill buttons on all forms (helper components created but not integrated)
- ❌ Actual form submissions to backend (simulated with console.log)
- ❌ Real payment processing (demo only)
- ❌ Email notifications (simulated)
- ❌ Mobile responsive design (desktop only at 1440px)
- ❌ Login/Signup functionality (context supports it, but pages need integration)

### Demo Mode Only

- No actual API calls
- No database persistence (data in memory only)
- User state saved to localStorage only
- Sample data resets on page refresh
- Bookings are hard-coded
- Eligibility checking is date-based simulation

---

## Troubleshooting

### Server Won't Start

```bash
# Kill any running processes
pkill -f vite

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Start again
npm run dev
```

### Demo Mode Indicator Not Showing

- Check that `<DemoModeIndicator />` is in App.tsx (line 25)
- Check browser console for errors
- Verify CSS is loading

### Context Not Available

- Ensure component is wrapped in `<AppProvider>`
- Import useApp hook: `import { useApp } from '../context/AppContext';`
- Use hook: `const { currentUser, bookings } = useApp();`

### Page Not Displaying

- Check App.tsx for commented/uncommented components
- Only one page should be uncommented at a time
- Verify import paths are correct
- Check browser console for errors

### Auto-fill Not Working

- Verify AutoFillButton component is imported
- Check that handler function accesses correct data from demoModes
- Ensure state setter is being called

---

## Next Steps for Production

To convert this prototype to production:

1. **Backend Integration**
   - Set up REST API or GraphQL endpoints
   - Replace sample data with API calls
   - Implement real authentication (JWT, OAuth)
   - Add proper error handling

2. **Database**
   - Design schema for users, bookings, rooms, etc.
   - Implement data persistence
   - Add data validation

3. **Routing**
   - Implement full react-router-dom setup
   - Add route protection for authenticated pages
   - Handle 404 pages

4. **Payment Integration**
   - Integrate Stripe or PayPal
   - Add payment webhooks
   - Implement refund handling

5. **Email Notifications**
   - Set up email service (SendGrid, AWS SES)
   - Create email templates
   - Send confirmation emails

6. **Mobile Responsive**
   - Add mobile breakpoints to all CSS
   - Test on various devices
   - Optimize touch interactions

7. **Testing**
   - Add unit tests (Jest, Vitest)
   - Add integration tests
   - Add E2E tests (Cypress, Playwright)

8. **Performance**
   - Implement code splitting
   - Add lazy loading for images
   - Optimize bundle size
   - Add caching strategies

9. **SEO & Accessibility**
   - Add meta tags
   - Implement proper heading structure
   - Add ARIA labels
   - Test with screen readers

10. **Security**
    - Add CSRF protection
    - Implement rate limiting
    - Sanitize user inputs
    - Add proper CORS configuration

---

## Support

For questions or issues with this demo:
1. Check browser console for errors
2. Verify all dependencies are installed
3. Ensure you're using Node.js 18+ and npm 9+
4. Check that port 5173 is available

---

## Demo Checklist

Before presenting this demo, verify:

- [ ] Server is running (`npm run dev`)
- [ ] Browser is open to http://localhost:5173
- [ ] Demo Mode indicator is visible (top right)
- [ ] Pre Check-in page is showing booking list
- [ ] Navigation shows all links including Pre Check-in
- [ ] Footer shows all links including Pre Check-in
- [ ] You know the demo credentials (john.doe@email.com / demo123)
- [ ] You know the sample booking numbers (GLM123456, GLM789012)
- [ ] You can switch between logged/non-logged states
- [ ] You know how to view different pages (editing App.tsx)

---

**Last Updated:** November 15, 2024
**Version:** 1.0.0
**Status:** Demo/Prototype
