// import Login from './components/Login';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
// import SignUp from './components/SignUp';
// import Dashboard from './components/Dashboard';
// import Home from './components/Home';
// import Rooms from './components/Rooms';
// import RoomDetails from './components/RoomDetails';
import GuestDetails from './components/Booking/GuestDetails';
import './App.css';

function App() {
  // Showing Guest Details (Booking Step 1) page
  // Toggle isAuthenticated to test both states

  // LOGGED-IN STATE (Shows new avatar dropdown design and auto-fills user data):
  return <GuestDetails isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;

  // UNLOGGED STATE (Uncomment to test):
  // return <GuestDetails isAuthenticated={false} />;

  // ROOM DETAILS PAGE (Uncomment to view):
  // return <RoomDetails isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;

  // ROOMS PAGE (Uncomment to view):
  // return <Rooms isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;

  // HOME PAGE (Uncomment to view):
  // return <Home isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;
}

export default App;
