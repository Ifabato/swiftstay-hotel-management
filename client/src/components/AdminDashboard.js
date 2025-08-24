import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Badge,
} from '@mui/material';
import {
  Dashboard,
  Hotel,
  Menu,
  Notifications,
  TrendingUp,
  Home,
  Close,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';
import GuestManagement from './GuestManagement';
import DailyRates from './DailyRates';
import OnSiteReservation from './OnSiteReservation';
import ArrivalsManagement from './ArrivalsManagement';
import DeparturesManagement from './DeparturesManagement';
import VIPGuestsManagement from './VIPGuestsManagement';
import PendingRequestsManagement from './PendingRequestsManagement';
import AvailableRooms from './AvailableRooms';
import Revenue from './Revenue';
import NotificationsPage from './Notifications';

const drawerWidth = 240;

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('hotelToken');
      const storedUser = localStorage.getItem('hotelUser');
      
      if (!storedToken || !storedUser) {
        navigate('/admin/login');
        return;
      }
      
      // Verify token is still valid
      if (!user) {
        // If user is not in context but token exists, try to restore session
        try {
          // You could verify the token with the server here
          // For now, we'll assume it's valid if it exists
        } catch (error) {
          localStorage.removeItem('hotelToken');
          localStorage.removeItem('hotelUser');
          navigate('/admin/login');
        }
      }
    };
    
    checkAuth();
  }, [user, navigate]);

  useEffect(() => {
    // Handle location state for activeTab
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    // Only proceed if user is authenticated
    if (!user) return;

    // Load initial data
    fetchData();

    // Listen for localStorage updates
    const handleStorageUpdate = () => {
      fetchData();
    };

    // Listen for custom events from other components
    const handleInHouseUpdate = () => {
      fetchData();
    };

    const handleArrivalsUpdate = () => {
      fetchData();
    };

    const handlePendingRequestsUpdate = () => {
      fetchData();
    };

    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('inHouseUpdated', handleInHouseUpdate);
    window.addEventListener('arrivalsUpdated', handleArrivalsUpdate);
    window.addEventListener('pendingRequestsUpdated', handlePendingRequestsUpdate);
    window.addEventListener('adminBackToDashboard', () => setActiveTab('dashboard'));

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('inHouseUpdated', handleInHouseUpdate);
      window.removeEventListener('arrivalsUpdated', handleArrivalsUpdate);
      window.removeEventListener('pendingRequestsUpdate', handlePendingRequestsUpdate);
      window.removeEventListener('adminBackToDashboard', () => setActiveTab('dashboard'));
    };
  }, [user]);

  const fetchData = async () => {
    try {
      // Data is loaded by individual components
      setLoading(false);
    } catch (err) {
      console.error('Error loading data from localStorage:', err);
      setLoading(false);
    }
  };



  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, value: 'dashboard' },
    { text: 'Daily Rates', icon: <TrendingUp />, value: 'daily-rates' },
    { text: 'On-Site Reservation', icon: <Hotel />, value: 'on-site-reservation' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', background: 'linear-gradient(180deg, #2c3e50 0%, #34495e 100%)' }}>
      <Toolbar sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
          Admin Portal
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => setActiveTab(item.value)}
            selected={activeTab === item.value}
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: 2,
              '&.Mui-selected': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                }
              },
              '&:hover': {
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
              }
            }}
          >
            <ListItemIcon sx={{ 
              color: activeTab === item.value ? 'white' : 'rgba(255,255,255,0.7)',
              minWidth: 40
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                color: activeTab === item.value ? 'white' : 'rgba(255,255,255,0.9)',
                '& .MuiTypography-root': {
                  fontWeight: activeTab === item.value ? 600 : 400
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleCardClick = (cardType) => {
    switch (cardType) {
      case 'in-house':
        setActiveTab('guests');
        break;
      case 'arrivals':
        setActiveTab('arrivals');
        break;
      case 'departures':
        setActiveTab('departures');
        break;
      case 'vip':
        setActiveTab('vip');
        break;
      case 'pending-requests':
        setActiveTab('pending-requests');
        break;
      case 'available-rooms':
        setActiveTab('available-rooms');
        break;
      case 'revenue':
        setActiveTab('revenue');
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography>Loading...</Typography>
        </Box>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview onCardClick={handleCardClick} />;
      case 'guests':
        return <GuestManagement />;
      case 'daily-rates':
        return <DailyRates />;
      case 'on-site-reservation':
        return <OnSiteReservation />;
      case 'arrivals':
        return <ArrivalsManagement />;
      case 'departures':
        return <DeparturesManagement />;
      case 'vip':
        return <VIPGuestsManagement />;
      case 'pending-requests':
        return <PendingRequestsManagement />;
      case 'available-rooms':
        return <AvailableRooms />;
      case 'revenue':
        return <Revenue />;
      case 'notifications':
        return <NotificationsPage />;
      default:
        return <DashboardOverview onCardClick={handleCardClick} />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.15)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleSidebarToggle}
            sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
          >
            {sidebarOpen ? <Close /> : <Menu />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600, flexGrow: 1 }}>
            Admin Portal
          </Typography>
          <IconButton color="inherit" onClick={() => setActiveTab('notifications')}>
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Button 
            color="inherit" 
            startIcon={<Home />}
            onClick={() => navigate('/')}
            sx={{ 
              mr: 1,
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
              },
            }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            onClick={handleLogout}
            sx={{
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ 
          width: { sm: sidebarOpen ? drawerWidth : 0 }, 
          flexShrink: { sm: 0 },
          transition: 'width 0.3s ease'
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              background: 'linear-gradient(180deg, #2c3e50 0%, #34495e 100%)',
              border: 'none',
              boxShadow: '4px 0 20px rgba(0,0,0,0.2)'
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: sidebarOpen ? 'block' : 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              background: 'linear-gradient(180deg, #2c3e50 0%, #34495e 100%)',
              border: 'none',
              boxShadow: '4px 0 20px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s ease'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
          mt: 8,
          minHeight: 'calc(100vh - 64px)',
          background: '#fafbfc',
          transition: 'width 0.3s ease'
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AdminDashboard; 