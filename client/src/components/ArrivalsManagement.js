import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Button,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Email,
  Schedule,
  CheckCircle,
  Cancel,
  Edit,
  CalendarToday,
  Refresh,
  ArrowBack,
} from '@mui/icons-material';

const ArrivalsManagement = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [arrivals, setArrivals] = useState([]);
  const [editingArrival, setEditingArrival] = useState(null);
  const [editForm, setEditForm] = useState({
    guestName: '',
    email: '',
    phone: '',
    roomNumber: '',
    roomType: '',
  });
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'checked-in', 'cancelled'

  const loadArrivals = () => {
    const todayArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
    console.log('ArrivalsManagement - Loading arrivals from localStorage:', todayArrivals);
    
    // Only show guests who haven't checked in yet (no checkInTime)
    const pendingArrivals = todayArrivals.filter(arrival => !arrival.checkInTime && arrival.status !== 'cancelled');
    
    // Determine status based on checkInTime and status field
    const arrivalsWithStatus = pendingArrivals.map(arrival => ({
      ...arrival,
      checkInStatus: arrival.checkInTime ? 'checked-in' : (arrival.status || 'pending')
    }));
    
    setArrivals(arrivalsWithStatus);
  };

  useEffect(() => {
    loadArrivals();

    // Listen for arrivals updates
    const handleArrivalsUpdate = (event) => {
      const { arrivals: updatedArrivals } = event.detail;
      console.log('ArrivalsManagement - Received arrivals update:', updatedArrivals);
      setArrivals(updatedArrivals);
    };

    window.addEventListener('arrivalsUpdated', handleArrivalsUpdate);

    return () => {
      window.removeEventListener('arrivalsUpdated', handleArrivalsUpdate);
    };
  }, []);

  const handleStatusChange = (arrivalId, newStatus) => {
    if (newStatus === 'checked-in') {
      // Update arrival with check-in time
      const updatedArrivals = arrivals.map(arrival => 
        arrival.id === arrivalId 
          ? { ...arrival, checkInTime: new Date().toISOString() }
          : arrival
      );
      localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));
      setArrivals(updatedArrivals);

      // Also add to currently in house (prevent duplicates)
      const guestToMove = arrivals.find(arrival => arrival.id === arrivalId);
      if (guestToMove) {
        const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
        const guestWithCheckInTime = {
          ...guestToMove,
          checkInTime: new Date().toISOString(),
          status: 'checked-in'
        };
        // Remove existing entry if it exists to prevent duplicates
        const filteredInHouse = currentlyInHouse.filter(guest => guest.id !== arrivalId);
        const updatedInHouse = [...filteredInHouse, guestWithCheckInTime];
        localStorage.setItem('currentlyInHouse', JSON.stringify(updatedInHouse));

        // Dispatch events
        window.dispatchEvent(new CustomEvent('inHouseUpdated', {
          detail: { inHouse: updatedInHouse }
        }));
      }

      window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
        detail: { arrivals: updatedArrivals }
      }));
    } else if (newStatus === 'cancelled') {
      // Update arrival status to cancelled
      const updatedArrivals = arrivals.map(arrival => 
        arrival.id === arrivalId 
          ? { ...arrival, status: 'cancelled' }
          : arrival
      );
      localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));
      setArrivals(updatedArrivals);

      window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
        detail: { arrivals: updatedArrivals }
      }));
    }

    console.log('Updating arrival status:', arrivalId, newStatus);
  };

  const handleEditArrival = (arrival) => {
    setEditingArrival(arrival);
    setEditForm({
      guestName: arrival.guestName || '',
      email: arrival.email || '',
      phone: arrival.phone || '',
      roomNumber: arrival.roomNumber || '',
      roomType: arrival.roomType || '',
    });
  };

  const handleSaveEdit = () => {
    if (!editingArrival) return;

    const updatedArrivals = arrivals.map(arrival => 
      arrival.id === editingArrival.id 
        ? { ...arrival, ...editForm }
        : arrival
    );

    localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));
    setArrivals(updatedArrivals);
    setEditingArrival(null);

    // Dispatch event to update dashboard
    window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
      detail: { arrivals: updatedArrivals }
    }));

    console.log('Arrival updated:', editingArrival.guestName);
  };

  const handleCancelEdit = () => {
    setEditingArrival(null);
    setEditForm({
      guestName: '',
      email: '',
      phone: '',
      roomNumber: '',
      roomType: '',
    });
  };

  const handleCancelReservation = (arrivalId) => {
    const updatedArrivals = arrivals.map(arrival => 
      arrival.id === arrivalId 
        ? { ...arrival, status: 'cancelled' }
        : arrival
    );
    localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));
    setArrivals(updatedArrivals);
    setEditingArrival(null);

    // Dispatch event to update dashboard
    window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
      detail: { arrivals: updatedArrivals }
    }));

    console.log('Reservation cancelled:', arrivalId);
  };

  const handleRemoveReservation = (arrivalId) => {
    const updatedArrivals = arrivals.filter(arrival => arrival.id !== arrivalId);
    localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));
    setArrivals(updatedArrivals);
    setEditingArrival(null);

    // Also remove from currentlyInHouse if present
    const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
    const updatedInHouse = currentlyInHouse.filter(guest => guest.id !== arrivalId);
    localStorage.setItem('currentlyInHouse', JSON.stringify(updatedInHouse));

    // Also remove from checkoutHistory if present
    const checkoutHistory = JSON.parse(localStorage.getItem('checkoutHistory') || '[]');
    const updatedCheckouts = checkoutHistory.filter(checkout => checkout.id !== arrivalId);
    localStorage.setItem('checkoutHistory', JSON.stringify(updatedCheckouts));

    // Dispatch events to update all components
    window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
      detail: { arrivals: updatedArrivals }
    }));
    window.dispatchEvent(new CustomEvent('inHouseUpdated', {
      detail: { inHouse: updatedInHouse }
    }));
    window.dispatchEvent(new CustomEvent('checkoutUpdated', {
      detail: { checkouts: updatedCheckouts }
    }));

    console.log('Reservation removed:', arrivalId);
  };

  const handleViewGuestProfile = (arrival) => {
    navigate(`/admin/guest-profile/${arrival.id}`, { 
      state: { guestData: arrival } 
    });
  };

  // Get all arrivals from localStorage for accurate counts
  const allArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
  
  // Filter arrivals based on status
  let filteredArrivals;
  if (statusFilter === 'checked-in') {
    // Show checked-in guests from all arrivals
    filteredArrivals = allArrivals.filter(arrival => arrival.checkInTime);
  } else {
    // Use the main arrivals list (which only contains pending guests)
    filteredArrivals = arrivals.filter(arrival => {
      if (statusFilter === 'all') return arrival.status !== 'cancelled'; // Exclude cancelled from "all"
      if (statusFilter === 'pending') return !arrival.checkInTime && arrival.status !== 'cancelled';
      if (statusFilter === 'cancelled') return arrival.status === 'cancelled';
      return true;
    });
  }

  // Calculate counts for summary chips using all arrivals
  const totalArrivals = allArrivals.filter(arrival => arrival.status !== 'cancelled').length; // Exclude cancelled from total
  const checkedInCount = allArrivals.filter(arrival => arrival.checkInTime).length;
  const pendingCount = allArrivals.filter(arrival => !arrival.checkInTime && arrival.status !== 'cancelled').length;
  const cancelledCount = allArrivals.filter(arrival => arrival.status === 'cancelled').length;



  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: '#fafbfc' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
              Today's Arrivals
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage guest arrivals and check-ins
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => {
              const todayArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
              const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
              console.log('ArrivalsManagement - Manual refresh - Current arrivals:', todayArrivals);
              console.log('Currently in house:', currentlyInHouse);
              alert(`Current arrivals in localStorage: ${todayArrivals.length}\nCurrently in house: ${currentlyInHouse.length}\n\nArrivals: ${JSON.stringify(todayArrivals, null, 2)}\n\nIn House: ${JSON.stringify(currentlyInHouse, null, 2)}`);
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
          <Button
            variant="outlined"
            color="warning"
            onClick={() => {
              // Clean up duplicates in currentlyInHouse
              const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
              const uniqueInHouse = currentlyInHouse.filter((guest, index, self) => 
                index === self.findIndex(g => g.id === guest.id)
              );
              localStorage.setItem('currentlyInHouse', JSON.stringify(uniqueInHouse));
              
              // Reload data
              loadArrivals();
              
              alert(`Cleaned up duplicates!\nBefore: ${currentlyInHouse.length}\nAfter: ${uniqueInHouse.length}`);
            }}
            size="medium"
            sx={{ 
              borderColor: '#ff9800',
              color: '#ff9800',
              '&:hover': {
                borderColor: '#f57c00',
                backgroundColor: '#fff3e0',
              }
            }}
          >
            Clean Duplicates
          </Button>
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
                <CalendarToday sx={{ mr: 2, color: '#667eea' }} />
                <TextField
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  sx={{ minWidth: 200 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label={`Total Arrivals: ${totalArrivals}`} 
                  color={statusFilter === 'all' ? 'primary' : 'default'}
                  variant={statusFilter === 'all' ? 'filled' : 'outlined'}
                  onClick={() => setStatusFilter('all')}
                  sx={{ cursor: 'pointer' }}
                />
                <Chip 
                  label={`Checked In: ${checkedInCount}`} 
                  color={statusFilter === 'checked-in' ? 'success' : 'default'}
                  variant={statusFilter === 'checked-in' ? 'filled' : 'outlined'}
                  onClick={() => setStatusFilter('checked-in')}
                  sx={{ cursor: 'pointer' }}
                />
                <Chip 
                  label={`Pending: ${pendingCount}`} 
                  color={statusFilter === 'pending' ? 'warning' : 'default'}
                  variant={statusFilter === 'pending' ? 'filled' : 'outlined'}
                  onClick={() => setStatusFilter('pending')}
                  sx={{ cursor: 'pointer' }}
                />
                <Chip 
                  label={`Cancelled: ${cancelledCount}`} 
                  color={statusFilter === 'cancelled' ? 'error' : 'default'}
                  variant={statusFilter === 'cancelled' ? 'filled' : 'outlined'}
                  onClick={() => setStatusFilter('cancelled')}
                  sx={{ cursor: 'pointer' }}
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
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Room</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Check-in Time</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {filteredArrivals.map((arrival) => (
              <TableRow 
                key={arrival.id} 
                hover
                onClick={() => handleViewGuestProfile(arrival)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(102, 126, 234, 0.08)',
                  }
                }}
              >
                <TableCell>
                  <Box>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600, 
                        cursor: 'pointer',
                        color: '#667eea',
                        '&:hover': {
                          textDecoration: 'underline',
                          color: '#5a6fd8'
                        }
                      }}
                      onClick={() => handleViewGuestProfile(arrival)}
                    >
                      {arrival.guestName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {arrival.bookingNumber}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Email sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                    <Typography variant="body2">
                      {arrival.email}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {arrival.roomType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Room {arrival.roomNumber} • {arrival.numberOfGuests || 1} guest{(arrival.numberOfGuests || 1) > 1 ? 's' : ''}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Schedule sx={{ fontSize: 16, mr: 1, color: '#666' }} />
                    <Typography variant="body2">
                      {arrival.checkInTime ? new Date(arrival.checkInTime).toLocaleTimeString() : 'Not checked in'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={arrival.checkInTime ? 'Checked In' : 'Pending'}
                    color={arrival.checkInTime ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {!arrival.checkInTime && (
                      <IconButton
                        size="small"
                        color="success"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(arrival.id, 'checked-in');
                        }}
                        title="Check In Guest"
                      >
                        <CheckCircle />
                      </IconButton>
                    )}
                    {!arrival.checkInTime && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(arrival.id, 'cancelled');
                        }}
                        title="Cancel Arrival"
                      >
                        <Cancel />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditArrival(arrival);
                      }}
                      title="Edit Arrival"
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

      {/* Edit Arrival Dialog */}
      <Dialog 
        open={editingArrival !== null} 
        onClose={handleCancelEdit}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit Arrival - {editingArrival?.guestName}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Guest Name"
                value={editForm.guestName}
                onChange={(e) => setEditForm({...editForm, guestName: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={editForm.email}
                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Room Number"
                value={editForm.roomNumber}
                onChange={(e) => setEditForm({...editForm, roomNumber: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Room Type</InputLabel>
                <Select
                  value={editForm.roomType}
                  onChange={(e) => setEditForm({...editForm, roomType: e.target.value})}
                  label="Room Type"
                >
                  <MenuItem value="King Bed Guest Room">King Bed Guest Room</MenuItem>
                  <MenuItem value="King Bed Suite">King Bed Suite</MenuItem>
                  <MenuItem value="1 Double Bed Guest Room">1 Double Bed Guest Room</MenuItem>
                  <MenuItem value="2 Double Bed">2 Double Bed</MenuItem>
                  <MenuItem value="1 Double Suite">1 Double Suite</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">Save Changes</Button>
          {editingArrival && (
            <>
              <Button 
                onClick={() => handleCancelReservation(editingArrival.id)} 
                color="warning" 
                variant="outlined"
              >
                Cancel Reservation
              </Button>
              <Button 
                onClick={() => handleRemoveReservation(editingArrival.id)} 
                color="error" 
                variant="outlined"
              >
                Remove Reservation
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ArrivalsManagement; 