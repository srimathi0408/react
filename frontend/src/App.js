import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Homepage from './components/Pages/Home';
import ProductPage from './components/Pages/Product';
import TypesOfHandicrafts from './components/Types of Handicraft';
import HomeDecor from './components/HomeDecor';
import StatuesAndSculptures from './components/Statues';
import ContactPage from './components/Pages/Contact';
import AboutPage from './components/About';
import AddProduct from './components/AdminPage';
import Signup from './components/Pages/SignUp';
import Login from './components/Pages/Login';
import CartPage from './components/CartPage';
import './App.css';
import { CartProvider } from './components/CartContext';


// Auth Context to manage user state
const AuthContext = createContext();

// Auth reducer for user state management
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.user, isAdmin: action.isAdmin };
    case 'LOGOUT':
      return { ...state, user: null, isAdmin: false };
    default:
      return state;
  }
};

// Auth Provider component
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAdmin: false,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedIsAdmin = JSON.parse(localStorage.getItem('isAdmin'));

    if (storedUser) {
      dispatch({ type: 'LOGIN', user: storedUser, isAdmin: storedIsAdmin });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hooks to use Auth context
export const useAuth = () => useContext(AuthContext);

// Header Component
function Header() {
  const { state, dispatch } = useAuth();
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const handleAdminClick = () => {
    const adminUsername = prompt('Enter Admin Username:');
    const adminPassword = prompt('Enter Admin Password:');

    const isAdminValid = adminUsername === 'admin' && adminPassword === 'admin123';

    if (isAdminValid) {
      dispatch({ type: 'LOGIN', user: { username: adminUsername }, isAdmin: true });
      localStorage.setItem('user', JSON.stringify({ username: adminUsername }));
      localStorage.setItem('isAdmin', JSON.stringify(true));
      alert('Admin login successful!');
      navigate('/Admin');
    } else {
      alert('Invalid admin credentials!');
    }
  };

  return (
    <header className="header">
      <h1 className="header-title">Handmade & Craft Marketplace</h1>
      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <div className="nav-link dropdown">
          <span className="dropdown-toggle">Categories</span>
          <div className="dropdown-menu">
            <Link to="/types-of-handicrafts" className="dropdown-item">Types of Handicrafts</Link>
            <Link to="/home-decor" className="dropdown-item">Home Decor</Link>
            <Link to="/statues-and-sculptures" className="dropdown-item">Statues and Sculptures</Link>
          </div>
        </div>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>

        {state.isAdmin && (
          <Link to="/Admin" className="nav-link">Admin</Link>
        )}

        <Link to="/cart" className="nav-link">Cart</Link>

        {state.user ? (
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/signup" className="nav-link">SignUp</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <button className="admin-login-button" onClick={handleAdminClick}>Admin Login</button>
          </>
        )}
      </nav>
    </header>
  );
}

// Main App Component
function App() {
  return (
    <AuthProvider>
     
        <Router>
        <CartProvider>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/types-of-handicrafts" element={<TypesOfHandicrafts />} />
              <Route path="/home-decor" element={<HomeDecor />} />
              <Route path="/statues-and-sculptures" element={<StatuesAndSculptures />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/admin" element={<AddProduct />} />
            </Routes>
          </div>
          </CartProvider>
        </Router>
     
    </AuthProvider>
  );
}

export default App;
