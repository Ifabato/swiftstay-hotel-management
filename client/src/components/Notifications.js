import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  Grid,
  Paper,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Schedule,
  Person,
  Hotel,
  TrendingUp,
  Warning,
  Info,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadNotifications();
    
    // Listen for updates
    const handleInHouseUpdate = () => loadNotifications();
    const handleArrivalsUpdate = () => loadNotifications();
    const handlePendingRequestsUpdate = () => loadNotifications();
    const handleCheckoutUpdated = () => loadNotifications();

    window.addEventListener('inHouseUpdated', handleInHouseUpdate);
    window.addEventListener('arrivalsUpdated', handleArrivalsUpdate);
    window.addEventListener('pendingRequestsUpdated', handlePendingRequestsUpdate);
    window.addEventListener('checkoutUpdated', handleCheckoutUpdated);

    return () => {
      window.removeEventListener('inHouseUpdated', handleInHouseUpdate);
      window.removeEventListener('arrivalsUpdated', handleArrivalsUpdate);
      window.removeEventListener('pendingRequestsUpdated', handlePendingRequestsUpdate);
      window.removeEventListener('checkoutUpdated', handleCheckoutUpdated);
    };
  }, []);

  const loadNotifications = () => {
    const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
    const todayArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
    const pendingRequestsData = JSON.parse(localStorage.getItem('pendingRequests') || '[]');
    const checkoutHistory = JSON.parse(localStorage.getItem('checkoutHistory') || '[]');

    // Generate notifications from current data
    const allNotifications = [];

    // Check-ins today
    const todayCheckIns = currentlyInHouse.filter(guest => {
      if (!guest.checkInTime) return false;
      const checkInDate = new Date(guest.checkInTime).toDateString();
      const today = new Date().toDateString();
      return checkInDate === today;
    });

    todayCheckIns.forEach(guest => {
      allNotifications.push({
        id: `checkin-${guest.id}`,
        type: 'checkin',
        title: 'Guest Checked In',
        message: `${guest.guestName} checked into ${guest.roomNumber || guest.roomType}`,
        time: guest.checkInTime,
        priority: 'high',
        guest: guest
      });
    });

    // Pending arrivals
    const pendingArrivals = todayArrivals.filter(arrival => !arrival.checkInTime && arrival.status !== 'cancelled');
    pendingArrivals.forEach(arrival => {
      allNotifications.push({
        id: `pending-${arrival.id}`,
        type: 'pending',
        title: 'Pending Arrival',
        message: `${arrival.guestName} is expected to arrive`,
        time: arrival.checkInDate || new Date().toISOString(),
        priority: 'medium',
        guest: arrival
      });
    });

    // Pending requests
    pendingRequestsData.forEach(request => {
      allNotifications.push({
        id: `request-${request.id}`,
        type: 'request',
        title: 'Service Request',
        message: `${request.guestName} requested: ${request.requestType}`,
        time: request.requestTime || new Date().toISOString(),
        priority: 'high',
        request: request
      });
    });

    // Recent checkouts
    const recentCheckouts = checkoutHistory.slice(-5); // Last 5 checkouts
    recentCheckouts.forEach(checkout => {
      allNotifications.push({
        id: `checkout-${checkout.id}`,
        type: 'checkout',
        title: 'Guest Checked Out',
        message: `${checkout.guestName} checked out from ${checkout.roomNumber || checkout.roomType}`,
        time: checkout.checkOutTime || new Date().toISOString(),
        priority: 'medium',
        guest: checkout
      });
    });

    // Sort by time (most recent first)
    allNotifications.sort((a, b) => new Date(b.time) - new Date(a.time));

    setNotifications(allNotifications);
    setPendingRequests(pendingRequestsData);
    setRecentActivity(allNotifications.slice(0, 10)); // Show last 10 activities
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'checkin':
        return <CheckCircle sx={{ color: '#4CAF50' }} />;
      case 'checkout':
        return <Cancel sx={{ color: '#f44336' }} />;
      case 'pending':
        return <Schedule sx={{ color: '#FF9800' }} />;
      case 'request':
        return <Warning sx={{ color: '#FF5722' }} />;
      default:
        return <Info sx={{ color: '#2196F3' }} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <NotificationsIcon sx={{ fontSize: 40, color: '#667eea', mr: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Notifications & Activity
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Activity
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle sx={{ color: '#4CAF50', mr: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#4CAF50' }}>
                  {notifications.filter(n => n.type === 'checkin').length}
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Check-ins
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Schedule sx={{ color: '#FF9800', mr: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF9800' }}>
                  {notifications.filter(n => n.type === 'pending').length}
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Pending Arrivals
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Warning sx={{ color: '#FF5722', mr: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF5722' }}>
                  {pendingRequests.length}
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Pending Requests
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                {recentActivity.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        {getNotificationIcon(notification.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {notification.title}
                            </Typography>
                            <Chip
                              label={notification.priority}
                              color={getPriorityColor(notification.priority)}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {notification.message}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatTime(notification.time)}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
                {recentActivity.length === 0 && (
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                          No recent activity
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Status */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Hotel Status
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#E8F5E8' }}>
                    <Person sx={{ fontSize: 40, color: '#4CAF50', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#4CAF50' }}>
                      {JSON.parse(localStorage.getItem('currentlyInHouse') || '[]').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Guests in House
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#FFF3E0' }}>
                    <Hotel sx={{ fontSize: 40, color: '#FF9800', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF9800' }}>
                      {100 - JSON.parse(localStorage.getItem('currentlyInHouse') || '[]').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Available Rooms
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#FFEBEE' }}>
                    <Warning sx={{ fontSize: 40, color: '#FF5722', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF5722' }}>
                      {pendingRequests.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending Requests
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#E3F2FD' }}>
                    <TrendingUp sx={{ fontSize: 40, color: '#2196F3', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2196F3' }}>
                      ${(() => {
                        const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
                        const today = new Date().toDateString();
                        return currentlyInHouse.reduce((total, guest) => {
                          if (!guest.checkInTime) return total;
                          const checkInDate = new Date(guest.checkInTime).toDateString();
                          if (checkInDate !== today) return total;
                          
                          let roomPrice = 299;
                          if (guest.roomType === 'King Bed Suite') roomPrice = 499;
                          else if (guest.roomType === '1 Double Bed Guest Room') roomPrice = 199;
                          else if (guest.roomType === '2 Double Bed') roomPrice = 349;
                          else if (guest.roomType === '1 Double Suite') roomPrice = 399;
                          
                          return total + roomPrice;
                        }, 0);
                      })()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Today's Revenue
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Notifications; 