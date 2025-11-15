// import Login from './components/Login';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
// import SignUp from './components/SignUp';
// import Dashboard from './components/Dashboard';
// import Home from './components/Home';
import Rooms from './components/Rooms';
import './App.css';

function App() {
  // Showing Rooms page
  // Toggle isAuthenticated to test both states

  // LOGGED-IN STATE (Shows new avatar dropdown design):
  return <Rooms isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;

  // UNLOGGED STATE (Uncomment to test):
  // return <Rooms isAuthenticated={false} />;

  // HOME PAGE (Uncomment to view):
  // return <Home isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;
}

export default App;
