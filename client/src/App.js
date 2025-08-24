import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './styles/mobile.css';
import HomePage from './components/HomePage';
import GuestInterface from './components/GuestInterface';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import HotelSearch from './components/HotelSearch';
import MyStay from './components/MyStay';
import NoStay from './components/NoStay';
import FindMyStay from './components/FindMyStay';
import TripPlanner from './components/TripPlanner';
import AvailableRooms from './components/AvailableRooms';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Revenue from './components/Revenue';
import CheckoutSuccess from './components/CheckoutSuccess';
import GuestProfile from './components/GuestProfile';
import ScrollToTop from './components/ScrollToTop';
import MobileNavigation from './components/MobileNavigation';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#667eea',
      light: '#8b9df0',
      dark: '#5a6fd8',
    },
    secondary: {
      main: '#764ba2',
      light: '#8f5bb8',
      dark: '#6a4190',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
      '@media (max-width:400px)': {
        fontSize: '1.75rem',
      },
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
      '@media (max-width:400px)': {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      fontSize: '1.75rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
      '@media (max-width:400px)': {
        fontSize: '1.25rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          '@media (max-width:768px)': {
            paddingBottom: '80px', // Account for mobile navigation
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '12px 28px',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.25)',
          },
          '@media (max-width:600px)': {
            padding: '10px 20px',
            fontSize: '0.9rem',
            minHeight: '44px', // Touch target size
          },
          '@media (max-width:400px)': {
            padding: '8px 16px',
            fontSize: '0.85rem',
          },
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-2px)',
            transition: 'transform 0.2s ease-in-out',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          '@media (max-width:600px)': {
            borderRadius: 16,
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            '& .MuiInputBase-root': {
              minHeight: '48px', // Touch target size
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            minWidth: '44px',
            minHeight: '44px', // Touch target size
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#667eea',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#667eea',
              borderWidth: 2,
            },
          },
        },
      },
    },

  },
});

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkin" element={<GuestInterface />} />
            <Route path="/hotels" element={<HotelSearch />} />
            <Route path="/trip-planner" element={<TripPlanner />} />
            <Route path="/my-stay" element={<MyStay />} />
            <Route path="/no-stay" element={<NoStay />} />
            <Route path="/find-my-stay" element={<FindMyStay />} />
                <Route path="/available-rooms" element={<AvailableRooms />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/revenue" element={<Revenue />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/guest-profile/:guestId" 
              element={
                <PrivateRoute>
                  <GuestProfile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/*" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
          <MobileNavigation />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
