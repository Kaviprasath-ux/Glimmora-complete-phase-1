// Pages and Components
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import Rooms from './components/Rooms/Rooms';
// import RoomDetails from './components/RoomDetails';
// import GuestDetails from './components/Booking/GuestDetails';
// import Payment from './components/Booking/Payment/Payment';
// import Confirmation from './components/Booking/Confirmation/Confirmation';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import PreCheckIn from './pages/PreCheckIn/PreCheckIn';
import { AppProvider, useApp } from './context/AppContext';
import DemoModeIndicator from './components/DemoHelpers/DemoModeIndicator';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function AppContent() {
  const { currentUser, isAuthenticated } = useApp();

  // Use context user if available, otherwise use demo user for testing
  const user = currentUser || {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@glimmora.com'
  };

  return (
    <>
      <DemoModeIndicator />
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Main App Routes */}
        <Route path="/dashboard" element={<Dashboard isAuthenticated={isAuthenticated} user={user} />} />
        <Route path="/rooms" element={<Rooms isAuthenticated={isAuthenticated} user={user} />} />
        <Route path="/services" element={<Services isAuthenticated={isAuthenticated} user={user} />} />
        <Route path="/contact" element={<Contact isAuthenticated={isAuthenticated} user={user} />} />
        <Route path="/pre-check-in" element={<PreCheckIn isAuthenticated={isAuthenticated} user={user} />} />

        {/* TODO: Uncomment these routes as pages are created */}
        {/* <Route path="/rooms/:id" element={<RoomDetails isAuthenticated={isAuthenticated} user={user} />} /> */}
        {/* <Route path="/booking/guest-details" element={<GuestDetails isAuthenticated={isAuthenticated} user={user} />} /> */}
        {/* <Route path="/booking/payment" element={<Payment isAuthenticated={isAuthenticated} user={user} />} /> */}
        {/* <Route path="/booking/confirmation" element={<Confirmation isAuthenticated={isAuthenticated} user={user} />} /> */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
