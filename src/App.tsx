// import Login from './components/Login';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
// import SignUp from './components/SignUp';
// import Dashboard from './components/Dashboard';
import Home from './components/Home';
import './App.css';

function App() {
  // Showing Home page
  // Toggle isAuthenticated to test both states

  // UNLOGGED STATE (DEFAULT):
  return <Home isAuthenticated={false} />;

  // LOGGED-IN STATE (Uncomment to test):
  // return <Home isAuthenticated={true} user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@glimmora.com' }} />;
}

export default App;
