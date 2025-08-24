import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Button,
} from '@mui/material';
import {
  Hotel,
  TrendingUp,
  Schedule,
  Refresh,
  FlightLand,
  FlightTakeoff,
  Diamond,
} from '@mui/icons-material';

const DashboardOverview = ({ onCardClick }) => {
  const [arrivals, setArrivals] = useState(0);
  const [inHouse, setInHouse] = useState(0);
  const [departures, setDepartures] = useState(0);
  const [vipGuests, setVipGuests] = useState(0);
  const [actualOccupancyRate, setActualOccupancyRate] = useState(0);
  const [roomTypeBreakdown, setRoomTypeBreakdown] = useState({
    'King Bed Guest Room': { occupied: 0, total: 40, percentage: 0 },
    'King Bed Suite': { occupied: 0, total: 20, percentage: 0 },
    '1 Double Bed Guest Room': { occupied: 0, total: 25, percentage: 0 },
    '2 Double Bed': { occupied: 0, total: 10, percentage: 0 },
    '1 Double Suite': { occupied: 0, total: 5, percentage: 0 },
  });
  const [pendingRequests, setPendingRequests] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(100);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [todaysRevenue, setTodaysRevenue] = useState(0);

  // Calculate total revenue from checked-in guests
  const calculateRevenue = (guests) => {
    return guests.reduce((total, guest) => {
      // Use actual payment amount if available, otherwise calculate based on room type
      if (guest.paymentAmount) {
        return total + guest.paymentAmount;
      }
      
      // Calculate based on room type and duration
      let roomPrice = 299; // Default price for King Bed Guest Room
      if (guest.roomType === 'King Bed Suite') roomPrice = 499;
      else if (guest.roomType === '1 Double Bed Guest Room') roomPrice = 199;
      else if (guest.roomType === '2 Double Bed') roomPrice = 349;
      else if (guest.roomType === '1 Double Suite') roomPrice = 399;
      
      // Calculate duration if check-in time is available
      let duration = 1; // Default to 1 day
      if (guest.checkInTime) {
        const checkInDate = new Date(guest.checkInTime);
        const today = new Date();
        const diffTime = Math.abs(today - checkInDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        duration = Math.max(1, diffDays);
      }
      
      return total + (roomPrice * duration);
    }, 0);
  };

  // Calculate today's revenue (guests who checked in today)
  const calculateTodaysRevenue = (guests) => {
    const today = new Date().toDateString();
    return guests.reduce((total, guest) => {
      if (!guest.checkInTime) return total;
      
      const checkInDate = new Date(guest.checkInTime).toDateString();
      if (checkInDate !== today) return total;
      
      // Use actual payment amount if available, otherwise use room price
      if (guest.paymentAmount) {
        return total + guest.paymentAmount;
      }
      
      let roomPrice = 299; // Default price for King Bed Guest Room
      if (guest.roomType === 'King Bed Suite') roomPrice = 499;
      else if (guest.roomType === '1 Double Bed Guest Room') roomPrice = 199;
      else if (guest.roomType === '2 Double Bed') roomPrice = 349;
      else if (guest.roomType === '1 Double Suite') roomPrice = 399;
      
      return total + roomPrice;
    }, 0);
  };

  useEffect(() => {
    // Load arrivals and in-house guests from localStorage
    const loadData = () => {
      const todayArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
      const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
      const pendingRequestsData = JSON.parse(localStorage.getItem('pendingRequests') || '[]');
      
      console.log('Dashboard - Loading arrivals from localStorage:', todayArrivals);
      console.log('Dashboard - Loading in-house from localStorage:', currentlyInHouse);
      console.log('Dashboard - Loading pending requests from localStorage:', pendingRequestsData);
      
      setArrivals(todayArrivals.length);
      setInHouse(currentlyInHouse.length);
      setPendingRequests(pendingRequestsData.length);
      
      // Calculate available rooms (100 total - occupied rooms)
      const occupiedRooms = currentlyInHouse.length;
      setAvailableRooms(100 - occupiedRooms);
      
      // Calculate revenue from checked-in guests
      const revenue = calculateRevenue(currentlyInHouse);
      const todayRevenue = calculateTodaysRevenue(currentlyInHouse);
      setTotalRevenue(revenue);
      setTodaysRevenue(todayRevenue);
      
      // Calculate occupancy rate
      const occupancyRate = Math.round((occupiedRooms / 100) * 100);
      setActualOccupancyRate(occupancyRate);
      
      // Calculate room type breakdown
      const breakdown = {
        'King Bed Guest Room': { occupied: 0, total: 40, percentage: 0 },
        'King Bed Suite': { occupied: 0, total: 20, percentage: 0 },
        '1 Double Bed Guest Room': { occupied: 0, total: 25, percentage: 0 },
        '2 Double Bed': { occupied: 0, total: 10, percentage: 0 },
        '1 Double Suite': { occupied: 0, total: 5, percentage: 0 },
      };
      
      // Count occupied rooms by type
      currentlyInHouse.forEach(guest => {
        if (breakdown[guest.roomType]) {
          breakdown[guest.roomType].occupied += 1;
        }
      });
      
      // Calculate percentages
      Object.keys(breakdown).forEach(roomType => {
        const roomData = breakdown[roomType];
        roomData.percentage = Math.round((roomData.occupied / roomData.total) * 100);
      });
      
      setRoomTypeBreakdown(breakdown);
      
      // Calculate real departures from checkoutHistory
      const checkoutHistory = JSON.parse(localStorage.getItem('checkoutHistory') || '[]');
      const today = new Date().toISOString().split('T')[0];
      const todayDepartures = checkoutHistory.filter(departure => 
        departure.checkOutDate === today
      );
      setDepartures(todayDepartures.length);
      
      // For demo purposes, set VIP guests to 0
      setVipGuests(0);
    };

    loadData();

    // Listen for arrivals updates
    const handleArrivalsUpdate = (event) => {
      const { arrivals: updatedArrivals } = event.detail;
      console.log('Dashboard - Received arrivals update:', updatedArrivals);
      setArrivals(updatedArrivals.length);
    };

    // Listen for in-house updates
    const handleInHouseUpdate = (event) => {
      const { inHouse: updatedInHouse } = event.detail;
      console.log('Dashboard - Received in-house update:', updatedInHouse);
      setInHouse(updatedInHouse.length);
      
      // Update available rooms when in-house changes
      setAvailableRooms(100 - updatedInHouse.length);
      
      // Update revenue when in-house changes
      const revenue = calculateRevenue(updatedInHouse);
      const todayRevenue = calculateTodaysRevenue(updatedInHouse);
      setTotalRevenue(revenue);
      setTodaysRevenue(todayRevenue);
      
      // Update occupancy rate
      const occupancyRate = Math.round((updatedInHouse.length / 100) * 100);
      setActualOccupancyRate(occupancyRate);
      
      // Update room type breakdown
      const breakdown = {
        'King Bed Guest Room': { occupied: 0, total: 40, percentage: 0 },
        'King Bed Suite': { occupied: 0, total: 20, percentage: 0 },
        '1 Double Bed Guest Room': { occupied: 0, total: 25, percentage: 0 },
        '2 Double Bed': { occupied: 0, total: 10, percentage: 0 },
        '1 Double Suite': { occupied: 0, total: 5, percentage: 0 },
      };
      
      // Count occupied rooms by type
      updatedInHouse.forEach(guest => {
        if (breakdown[guest.roomType]) {
          breakdown[guest.roomType].occupied += 1;
        }
      });
      
      // Calculate percentages
      Object.keys(breakdown).forEach(roomType => {
        const roomData = breakdown[roomType];
        roomData.percentage = Math.round((roomData.occupied / roomData.total) * 100);
      });
      
      setRoomTypeBreakdown(breakdown);
    };

    // Listen for pending requests updates
    const handlePendingRequestsUpdate = (event) => {
      const { requests: updatedRequests } = event.detail;
      console.log('Dashboard - Received pending requests update:', updatedRequests);
      setPendingRequests(updatedRequests.length);
    };

    // Listen for checkout updates
    const handleCheckoutUpdate = (event) => {
      const { checkouts: updatedCheckouts } = event.detail;
      console.log('Dashboard - Received checkout update:', updatedCheckouts);
      
      // Calculate today's departures
      const today = new Date().toISOString().split('T')[0];
      const todayDepartures = updatedCheckouts.filter(departure => 
        departure.checkOutDate === today
      );
      setDepartures(todayDepartures.length);
    };

    window.addEventListener('arrivalsUpdated', handleArrivalsUpdate);
    window.addEventListener('inHouseUpdated', handleInHouseUpdate);
    window.addEventListener('pendingRequestsUpdated', handlePendingRequestsUpdate);
    window.addEventListener('checkoutUpdated', handleCheckoutUpdate);

    return () => {
      window.removeEventListener('arrivalsUpdated', handleArrivalsUpdate);
      window.removeEventListener('inHouseUpdated', handleInHouseUpdate);
      window.removeEventListener('pendingRequestsUpdated', handlePendingRequestsUpdate);
      window.removeEventListener('checkoutUpdated', handleCheckoutUpdate);
    };
  }, []);

  // Remove the data dependency since we're loading data from localStorage
  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  // const { totalGuests, activeBookings, totalRevenue, occupancyRate } = data;

  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: '#fafbfc' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#2c3e50', mb: 1 }}>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here's your hotel's current status
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={() => {
            const todayArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
            console.log('Manual refresh - Current arrivals:', todayArrivals);
            alert(`Current arrivals in localStorage: ${todayArrivals.length}`);
          }}
          size="medium"
          sx={{ 
            borderColor: '#e0e0e0',
            color: '#666',
            '&:hover': {
              borderColor: '#999',
              backgroundColor: '#f5f5f5',
            }
          }}
        >
          Refresh Data
        </Button>
      </Box>
      
      {/* Main Status Cards - Left to Right: Arrivals, In House, Departures, VIP */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Arrivals */}
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              minHeight: 160,
              background: '#ffffff',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                border: '1px solid #4CAF50',
              }
            }}
            onClick={() => onCardClick && onCardClick('arrivals')}
          >
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: '50%', 
                  background: '#f0f8f0',
                  mr: 2 
                }}>
                  <FlightLand sx={{ fontSize: 32, color: '#4CAF50' }} />
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#2c3e50', mb: 0.5 }}>
                    {arrivals}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#666' }}>
                    Today's Arrivals
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip 
                  label="On Schedule" 
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: '0.9rem',
                    backgroundColor: '#e8f5e8',
                    color: '#2e7d32'
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Click to view details
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* In House */}
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              minHeight: 160,
              background: '#ffffff',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                border: '1px solid #667eea',
              }
            }}
            onClick={() => onCardClick && onCardClick('in-house')}
          >
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: '50%', 
                  background: '#f0f4ff',
                  mr: 2 
                }}>
                  <Hotel sx={{ fontSize: 32, color: '#667eea' }} />
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#2c3e50', mb: 0.5 }}>
                    {inHouse}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#666' }}>
                    Currently In House
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip 
                  label="Active" 
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: '0.9rem',
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2'
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Click to view details
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Departures */}
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              minHeight: 160,
              background: '#ffffff',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                border: '1px solid #FF9800',
              }
            }}
            onClick={() => onCardClick && onCardClick('departures')}
          >
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: '50%', 
                  background: '#fff8e1',
                  mr: 2 
                }}>
                  <FlightTakeoff sx={{ fontSize: 32, color: '#FF9800' }} />
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#2c3e50', mb: 0.5 }}>
                    {departures}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#666' }}>
                    Today's Departures
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip 
                  label="Scheduled" 
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: '0.9rem',
                    backgroundColor: '#fff3e0',
                    color: '#f57c00'
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Click to view details
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* VIP */}
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              minHeight: 160,
              background: '#ffffff',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                border: '1px solid #E91E63',
              }
            }}
            onClick={() => onCardClick && onCardClick('vip')}
          >
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: '50%', 
                  background: '#fce4ec',
                  mr: 2 
                }}>
                  <Diamond sx={{ fontSize: 32, color: '#E91E63' }} />
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#2c3e50', mb: 0.5 }}>
                    {vipGuests}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#666' }}>
                    VIP Guests
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip 
                  label="Premium" 
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: '0.9rem',
                    backgroundColor: '#f3e5f5',
                    color: '#7b1fa2'
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Click to view details
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Occupancy Information Section */}
      <Card sx={{ 
        mb: 4, 
        background: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Box sx={{ 
              p: 2, 
              borderRadius: '50%', 
              background: '#f0f4ff',
              mr: 3 
            }}>
              <Hotel sx={{ fontSize: 32, color: '#667eea' }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#2c3e50', mb: 1 }}>
                Occupancy Information
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Real-time hotel occupancy and revenue analytics
              </Typography>
            </Box>
          </Box>
          
          <Grid container spacing={3}>
            {/* Overall Occupancy */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%',
                background: '#ffffff',
                border: '1px solid #e0e0e0',
                p: 3
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
                    {actualOccupancyRate}%
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#666' }}>
                    Overall Occupancy
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={actualOccupancyRate} 
                    sx={{ 
                      height: 12, 
                      borderRadius: 6, 
                      bgcolor: '#f0f0f0',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      }
                    }}
                  />
                  <Typography variant="body2" sx={{ mt: 2, color: '#666' }}>
                    {inHouse} of 100 rooms occupied
                  </Typography>
                </Box>
              </Card>
            </Grid>

            {/* Room Type Breakdown */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                border: '1px solid #e0e0e0',
                p: 3
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#2c3e50' }}>
                  Room Type Breakdown
                </Typography>
                {Object.entries(roomTypeBreakdown).map(([roomType, data]) => (
                  <Box key={roomType} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                        {roomType}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#667eea' }}>
                        {data.percentage}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={data.percentage} 
                        sx={{ 
                          flexGrow: 1, 
                          height: 8, 
                          borderRadius: 4,
                          mr: 2,
                          bgcolor: '#f0f0f0',
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          }
                        }} 
                      />
                      <Typography variant="caption" color="text.secondary">
                        {data.occupied}/{data.total}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Card>
            </Grid>

            {/* Revenue Summary */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%',
                background: '#ffffff',
                border: '1px solid #e0e0e0',
                p: 3
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#2c3e50' }}>
                  Revenue Summary
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: '50%', 
                    background: '#f0f8f0',
                    mr: 2 
                  }}>
                    <TrendingUp sx={{ fontSize: 24, color: '#4CAF50' }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                    ${totalRevenue}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                  Total Revenue This Month
                </Typography>
                <Box sx={{ 
                  background: '#f8f9fa', 
                  p: 2, 
                  borderRadius: 2,
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#666' }}>
                    Daily Average
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#4CAF50' }}>
                    ${Math.round(totalRevenue / 30)}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Grid container spacing={3}>
        {/* Pending Requests */}
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              minHeight: 140,
              background: '#ffffff',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                border: '1px solid #FF9800',
              }
            }}
            onClick={() => onCardClick && onCardClick('pending-requests')}
          >
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: '50%', 
                  background: '#fff8e1',
                  mr: 2 
                }}>
                  <Schedule sx={{ fontSize: 28, color: '#FF9800' }} />
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#2c3e50', mb: 0.5 }}>
                    {pendingRequests}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#666' }}>
                    Pending Requests
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                Click to manage requests
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Available Rooms */}
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              minHeight: 140,
              background: '#ffffff',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                border: '1px solid #4CAF50',
              }
            }}
            onClick={() => onCardClick && onCardClick('available-rooms')}
          >
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: '50%', 
                  background: '#f0f8f0',
                  mr: 2 
                }}>
                  <Hotel sx={{ fontSize: 28, color: '#4CAF50' }} />
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#2c3e50', mb: 0.5 }}>
                    {availableRooms}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#666' }}>
                    Available Rooms
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                Click to view inventory
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Today's Revenue */}
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              minHeight: 140,
              background: '#ffffff',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                border: '1px solid #4CAF50',
              }
            }}
            onClick={() => onCardClick && onCardClick('revenue')}
          >
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: '50%', 
                  background: '#f0f8f0',
                  mr: 2 
                }}>
                  <TrendingUp sx={{ fontSize: 28, color: '#4CAF50' }} />
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#2c3e50', mb: 0.5 }}>
                    ${todaysRevenue}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#666' }}>
                    Today's Revenue
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                Click to view details
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardOverview; 