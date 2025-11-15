// import Login from './components/Login';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
// import SignUp from './components/SignUp';
// import Dashboard from './components/Dashboard';
// import Home from './components/Home';
// import Rooms from './components/Rooms';
// import RoomDetails from './components/RoomDetails';
// import GuestDetails from './components/Booking/GuestDetails';
// import Payment from './components/Booking/Payment/Payment';
// import Confirmation from './components/Booking/Confirmation/Confirmation';
// import Services from './pages/Services';
// import Contact from './pages/Contact';
import PreCheckIn from './pages/PreCheckIn';
import { AppProvider } from './context/AppContext';
import DemoModeIndicator from './components/DemoHelpers/DemoModeIndicator';
import './App.css';

function App() {
  // Showing Pre Check-in page - Smart adaptive page with 4 different views
  // Toggle isAuthenticated to test both states

  return (
    <AppProvider>
      <DemoModeIndicator />

      {/* LOGGED-IN STATE (Shows booking list view): */}
      <PreCheckIn isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />

      {/* UNLOGGED STATE (Shows lookup form view - Uncomment to test): */}
      {/* <PreCheckIn isAuthenticated={false} /> */}

      {/* CONTACT PAGE (Uncomment to view): */}
      {/* <Contact isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} /> */}

      {/* SERVICES PAGE (Uncomment to view): */}
      {/* <Services isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} /> */}

      {/* CONFIRMATION PAGE (Uncomment to view): */}
      {/* <Confirmation isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} /> */}

      {/* PAYMENT PAGE (Uncomment to view): */}
      {/* <Payment isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} /> */}

      {/* GUEST DETAILS PAGE (Uncomment to view): */}
      {/* <GuestDetails isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} /> */}

      {/* ROOM DETAILS PAGE (Uncomment to view): */}
      {/* <RoomDetails isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} /> */}

      {/* ROOMS PAGE (Uncomment to view): */}
      {/* <Rooms isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} /> */}

      {/* HOME PAGE (Uncomment to view): */}
      {/* <Home isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} /> */}
    </AppProvider>
  );
}

export default App;
