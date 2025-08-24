import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
} from '@mui/material';
import {
  Home,
  Search,
  Hotel,
  Person,
  Menu,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getCurrentValue = () => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path === '/hotels') return 1;
    if (path === '/checkin') return 2;
    if (path === '/my-stay') return 3;
    return 0;
  };

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/hotels');
        break;
      case 2:
        navigate('/checkin');
        break;
      case 3:
        navigate('/my-stay');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: { xs: 'block', md: 'none' },
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        safeAreaBottom: true,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={getCurrentValue()}
        onChange={handleChange}
        showLabels
        sx={{
          height: 60,
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 12px 8px',
            '&.Mui-selected': {
              color: '#667eea',
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.75rem',
            marginTop: '4px',
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          sx={{
            '&.Mui-selected': {
              color: '#667eea',
            },
          }}
        />
        <BottomNavigationAction
          label="Hotels"
          icon={<Search />}
          sx={{
            '&.Mui-selected': {
              color: '#667eea',
            },
          }}
        />
        <BottomNavigationAction
          label="Check-in"
          icon={<Hotel />}
          sx={{
            '&.Mui-selected': {
              color: '#667eea',
            },
          }}
        />
        <BottomNavigationAction
          label="My Stay"
          icon={<Person />}
          sx={{
            '&.Mui-selected': {
              color: '#667eea',
            },
          }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileNavigation; 