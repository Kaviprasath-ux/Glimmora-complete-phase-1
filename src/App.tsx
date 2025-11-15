// import Login from './components/Login';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
// import SignUp from './components/SignUp';
// import Dashboard from './components/Dashboard';
// import Home from './components/Home';
// import Rooms from './components/Rooms';
// import RoomDetails from './components/RoomDetails';
// import GuestDetails from './components/Booking/GuestDetails';
import Payment from './components/Booking/Payment/Payment';
import './App.css';

function App() {
  // Showing Payment (Booking Step 2) page
  // Toggle isAuthenticated to test both states

  // LOGGED-IN STATE (Shows new avatar dropdown design):
  return <Payment isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;

  // UNLOGGED STATE (Uncomment to test):
  // return <Payment isAuthenticated={false} />;

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
