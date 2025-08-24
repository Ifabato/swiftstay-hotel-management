import React, { useState, useEffect } from 'react';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  Grid,
} from '@mui/material';
import {
  Email,
  Phone,
  Schedule,
  CheckCircle,
  Cancel,
  Edit,
  CalendarToday,
  ArrowBack,
} from '@mui/icons-material';

const DeparturesManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [departures, setDepartures] = useState([]);

  useEffect(() => {
    // Load departures from localStorage
    const loadDepartures = () => {
      const checkoutHistory = JSON.parse(localStorage.getItem('checkoutHistory') || '[]');
      const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
      
      // Get today's date
      const today = new Date().toISOString().split('T')[0];
      
      // Filter departures for today
      const todayDepartures = checkoutHistory.filter(departure => 
        departure.checkOutDate === today
      );
      
      // Also include guests who are scheduled to check out today but haven't yet
      const scheduledDepartures = currentlyInHouse.filter(guest => 
        guest.checkOutDate === today && !guest.checkOutTime
      ).map(guest => ({
        ...guest,
        status: 'pending',
        totalAmount: calculateTotalAmount(guest),
      }));
      
      const allDepartures = [...todayDepartures, ...scheduledDepartures];
      setDepartures(allDepartures);
      
      console.log('DeparturesManagement - Loading departures:', allDepartures);
    };

    loadDepartures();

    // Listen for checkout updates
    const handleCheckoutUpdate = () => {
      loadDepartures();
    };

    window.addEventListener('checkoutUpdated', handleCheckoutUpdate);
    window.addEventListener('inHouseUpdated', handleCheckoutUpdate);

    return () => {
      window.removeEventListener('checkoutUpdated', handleCheckoutUpdate);
      window.removeEventListener('inHouseUpdated', handleCheckoutUpdate);
    };
  }, []);

  const calculateTotalAmount = (guest) => {
    let roomPrice = 299; // Default price for King Bed Guest Room
    if (guest.roomType === 'King Bed Suite') roomPrice = 499;
    else if (guest.roomType === '1 Double Bed Guest Room') roomPrice = 199;
    else if (guest.roomType === '2 Double Bed') roomPrice = 349;
    else if (guest.roomType === '1 Double Suite') roomPrice = 399;
    
    // Calculate nights stayed
    const checkInDate = new Date(guest.checkInDate);
    const checkOutDate = new Date(guest.checkOutDate || new Date());
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    return roomPrice * nights;
  };

  const handleStatusChange = (departureId, newStatus) => {
    if (newStatus === 'checked_out') {
      // Process checkout
      const guestToCheckout = departures.find(departure => departure.id === departureId);
      if (guestToCheckout) {
        // Add checkout time
        const checkoutData = {
          ...guestToCheckout,
          checkOutTime: new Date().toISOString(),
          status: 'checked_out',
          totalAmount: calculateTotalAmount(guestToCheckout),
        };

        // Add to checkout history
        const existingCheckouts = JSON.parse(localStorage.getItem('checkoutHistory') || '[]');
        const updatedCheckouts = [...existingCheckouts, checkoutData];
        localStorage.setItem('checkoutHistory', JSON.stringify(updatedCheckouts));

        // Remove from currently in house
        const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
        const updatedInHouse = currentlyInHouse.filter(guest => guest.id !== departureId);
        localStorage.setItem('currentlyInHouse', JSON.stringify(updatedInHouse));

        // Update departures list
        const updatedDepartures = departures.map(departure => 
          departure.id === departureId ? checkoutData : departure
        );
        setDepartures(updatedDepartures);

        // Dispatch events
        window.dispatchEvent(new CustomEvent('checkoutUpdated', {
          detail: { checkouts: updatedCheckouts }
        }));
        window.dispatchEvent(new CustomEvent('inHouseUpdated', {
          detail: { inHouse: updatedInHouse }
        }));

        console.log('Guest checked out:', guestToCheckout.guestName);
      }
    }
  };



  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: '#fafbfc' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <IconButton
            onClick={() => window.dispatchEvent(new CustomEvent('adminBackToDashboard'))}
            sx={{ 
              mr: 2, 
              p: 1,
              border: '1px solid #e0e0e0',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderColor: '#999',
              }
            }}
          >
          <ArrowBack />
        </IconButton>
                  <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#2c3e50', mb: 1 }}>
              Today's Departures
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage guest checkouts and departures
            </Typography>
          </Box>
      </Box>

      <Card sx={{ 
        mb: 3, 
        background: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarToday sx={{ mr: 2, color: '#FF9800' }} />
                <TextField
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  sx={{ minWidth: 200 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Chip 
                  label={`Total Departures: ${departures.length}`} 
                  color="primary" 
                  variant="outlined"
                />
                <Chip 
                  label={`Checked Out: ${departures.filter(d => d.checkOutTime).length}`} 
                  color="success" 
                  variant="outlined"
                />
                <Chip 
                  label={`Pending: ${departures.filter(d => !d.checkOutTime).length}`} 
                  color="warning" 
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ 
        background: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0'
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Guest</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Room</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Check-out Time</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Total Amount</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {departures.map((departure) => (
              <TableRow key={departure.id} hover>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {departure.guestName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {departure.bookingNumber}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">
                      <Email sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      {departure.email}
                    </Typography>
                    <Typography variant="body2">
                      <Phone sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      {departure.phone}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Room {departure.roomNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {departure.roomType}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Schedule sx={{ fontSize: 16, mr: 1, color: '#666' }} />
                    <Typography variant="body2">
                      {departure.checkOutTime ? new Date(departure.checkOutTime).toLocaleTimeString() : 'Not checked out'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                    ${departure.totalAmount || calculateTotalAmount(departure)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={departure.checkOutTime ? 'Checked Out' : 'Pending'}
                    color={departure.checkOutTime ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {!departure.checkOutTime && (
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleStatusChange(departure.id, 'checked_out')}
                        title="Mark as Checked Out"
                      >
                        <CheckCircle />
                      </IconButton>
                    )}
                    {!departure.checkOutTime && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleStatusChange(departure.id, 'cancelled')}
                        title="Cancel Departure"
                      >
                        <Cancel />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      color="primary"
                      title="View Details"
                    >
                      <Edit />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Card>
    </Box>
  );
};

export default DeparturesManagement; 