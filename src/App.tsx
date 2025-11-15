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
import './App.css';

function App() {
  // Showing Pre Check-in page - Smart adaptive page with 4 different views
  // Toggle isAuthenticated to test both states

  // LOGGED-IN STATE (Shows booking list view):
  return <PreCheckIn isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;

  // UNLOGGED STATE (Shows lookup form view - Uncomment to test):
  // return <PreCheckIn isAuthenticated={false} />;

  // CONTACT PAGE (Uncomment to view):
  // return <Contact isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;

  // SERVICES PAGE (Uncomment to view):
  // return <Services isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;

  // CONFIRMATION PAGE (Uncomment to view):
  // return <Confirmation isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;

  // PAYMENT PAGE (Uncomment to view):
  // return <Payment isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;

  // GUEST DETAILS PAGE (Uncomment to view):
  // return <GuestDetails isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;

  // ROOM DETAILS PAGE (Uncomment to view):
  // return <RoomDetails isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;

  // ROOMS PAGE (Uncomment to view):
  // return <Rooms isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;

  // HOME PAGE (Uncomment to view):
  // return <Home isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;
}

export default App;
