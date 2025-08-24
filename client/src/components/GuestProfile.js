import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Stack,
  Avatar,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Save,
  Cancel,
  Delete,
  Person,
  Email,
  Phone,
  Hotel,
  Schedule,
  CheckCircle,
  Warning,
  Info,
} from '@mui/icons-material';

const GuestProfile = () => {
  const { guestId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [guestData, setGuestData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGuestData = () => {
      try {
        // Try to get guest data from navigation state first
        if (location.state?.guestData) {
          setGuestData(location.state.guestData);
          setEditForm(location.state.guestData);
          setLoading(false);
          return;
        }

        // If not in state, search in localStorage
        const todayArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
        const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
        
        // Search in arrivals
        let foundGuest = todayArrivals.find(guest => guest.id === guestId);
        
        // If not found in arrivals, search in currently in house
        if (!foundGuest) {
          foundGuest = currentlyInHouse.find(guest => guest.id === guestId);
        }

        if (foundGuest) {
          setGuestData(foundGuest);
          setEditForm(foundGuest);
        } else {
          setError('Guest not found');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading guest data:', err);
        setError('Failed to load guest data');
        setLoading(false);
      }
    };

    loadGuestData();
  }, [guestId, location.state]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    try {
      // Update in todayArrivals
      const todayArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
      const updatedArrivals = todayArrivals.map(arrival => 
        arrival.id === guestId ? { ...arrival, ...editForm } : arrival
      );
      localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));

      // Update in currentlyInHouse if guest is checked in
      const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
      const updatedInHouse = currentlyInHouse.map(guest => 
        guest.id === guestId ? { ...guest, ...editForm } : guest
      );
      localStorage.setItem('currentlyInHouse', JSON.stringify(updatedInHouse));

      // Update local state
      setGuestData(editForm);

      // Dispatch events
      window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
        detail: { arrivals: updatedArrivals }
      }));
      window.dispatchEvent(new CustomEvent('inHouseUpdated', {
        detail: { inHouse: updatedInHouse }
      }));

      setIsEditing(false);
      console.log('Guest data updated:', editForm.guestName);
    } catch (err) {
      console.error('Error saving guest data:', err);
      setError('Failed to save guest data');
    }
  };

  const handleCancel = () => {
    setEditForm(guestData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    try {
      // Remove from todayArrivals
      const todayArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
      const updatedArrivals = todayArrivals.filter(arrival => arrival.id !== guestId);
      localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));

      // Remove from currentlyInHouse
      const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
      const updatedInHouse = currentlyInHouse.filter(guest => guest.id !== guestId);
      localStorage.setItem('currentlyInHouse', JSON.stringify(updatedInHouse));

      // Remove from checkoutHistory if present
      const checkoutHistory = JSON.parse(localStorage.getItem('checkoutHistory') || '[]');
      const updatedCheckouts = checkoutHistory.filter(checkout => checkout.id !== guestId);
      localStorage.setItem('checkoutHistory', JSON.stringify(updatedCheckouts));

      // Dispatch events
      window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
        detail: { arrivals: updatedArrivals }
      }));
      window.dispatchEvent(new CustomEvent('inHouseUpdated', {
        detail: { inHouse: updatedInHouse }
      }));
      window.dispatchEvent(new CustomEvent('checkoutUpdated', {
        detail: { checkouts: updatedCheckouts }
      }));

      setDeleteDialog(false);
      // Navigate back to arrivals management
      navigate('/admin', { state: { activeTab: 'arrivals' } });
      console.log('Guest deleted:', guestData?.guestName);
    } catch (err) {
      console.error('Error deleting guest:', err);
      setError('Failed to delete guest');
    }
  };

  const handleStatusChange = (newStatus) => {
    try {
      if (newStatus === 'checked-in') {
        // Add check-in time
        const updatedGuest = { ...editForm, checkInTime: new Date().toISOString() };
        setEditForm(updatedGuest);

        // Add to currently in house (prevent duplicates)
        const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
        // Remove existing entry if it exists to prevent duplicates
        const filteredInHouse = currentlyInHouse.filter(guest => guest.id !== guestId);
        const updatedInHouse = [...filteredInHouse, updatedGuest];
        localStorage.setItem('currentlyInHouse', JSON.stringify(updatedInHouse));

        // Update arrivals
        const todayArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
        const updatedArrivals = todayArrivals.map(arrival => 
          arrival.id === guestId ? updatedGuest : arrival
        );
        localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));

        // Dispatch events
        window.dispatchEvent(new CustomEvent('inHouseUpdated', {
          detail: { inHouse: updatedInHouse }
        }));
        window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
          detail: { arrivals: updatedArrivals }
        }));

        setGuestData(updatedGuest);
      } else if (newStatus === 'cancelled') {
        const updatedGuest = { ...editForm, status: 'cancelled' };
        setEditForm(updatedGuest);

        // Update arrivals
        const todayArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
        const updatedArrivals = todayArrivals.map(arrival => 
          arrival.id === guestId ? updatedGuest : arrival
        );
        localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));

        // Remove from currently in house if present
        const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
        const updatedInHouse = currentlyInHouse.filter(guest => guest.id !== guestId);
        localStorage.setItem('currentlyInHouse', JSON.stringify(updatedInHouse));

        // Dispatch events
        window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
          detail: { arrivals: updatedArrivals }
        }));
        window.dispatchEvent(new CustomEvent('inHouseUpdated', {
          detail: { inHouse: updatedInHouse }
        }));

        setGuestData(updatedGuest);
      } else if (newStatus === 'pending') {
        // Reactivate cancelled reservation
        const updatedGuest = { 
          ...editForm, 
          status: 'pending',
          checkInTime: null // Remove check-in time if it exists
        };
        setEditForm(updatedGuest);

        // Update arrivals
        const todayArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
        const updatedArrivals = todayArrivals.map(arrival => 
          arrival.id === guestId ? updatedGuest : arrival
        );
        localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));

        // Remove from currently in house if present
        const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
        const updatedInHouse = currentlyInHouse.filter(guest => guest.id !== guestId);
        localStorage.setItem('currentlyInHouse', JSON.stringify(updatedInHouse));

        // Dispatch events
        window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
          detail: { arrivals: updatedArrivals }
        }));
        window.dispatchEvent(new CustomEvent('inHouseUpdated', {
          detail: { inHouse: updatedInHouse }
        }));

        setGuestData(updatedGuest);
      } else if (newStatus === 'checked-out') {
        // Check out guest
        const updatedGuest = { 
          ...editForm, 
          checkOutTime: new Date().toISOString(),
          checkOutDate: new Date().toISOString().split('T')[0]
        };
        setEditForm(updatedGuest);

        // Add to checkout history
        const checkoutHistory = JSON.parse(localStorage.getItem('checkoutHistory') || '[]');
        const checkoutRecord = {
          ...updatedGuest,
          status: 'checked_out',
          totalAmount: calculateTotalAmount(updatedGuest),
        };
        const updatedCheckouts = [...checkoutHistory, checkoutRecord];
        localStorage.setItem('checkoutHistory', JSON.stringify(updatedCheckouts));

        // Remove from currently in house
        const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
        const updatedInHouse = currentlyInHouse.filter(guest => guest.id !== guestId);
        localStorage.setItem('currentlyInHouse', JSON.stringify(updatedInHouse));

        // Remove from arrivals (since they're checked out)
        const todayArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
        const updatedArrivals = todayArrivals.filter(arrival => arrival.id !== guestId);
        localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));

        // Dispatch events
        window.dispatchEvent(new CustomEvent('checkoutUpdated', {
          detail: { checkouts: updatedCheckouts }
        }));
        window.dispatchEvent(new CustomEvent('inHouseUpdated', {
          detail: { inHouse: updatedInHouse }
        }));
        window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
          detail: { arrivals: updatedArrivals }
        }));

        setGuestData(updatedGuest);
        
        // Navigate back to arrivals after checkout
        setTimeout(() => {
          navigate('/admin', { state: { activeTab: 'arrivals' } });
        }, 1000);
      }
    } catch (err) {
      console.error('Error changing status:', err);
      setError('Failed to change status');
    }
  };

  const calculateTotalAmount = (guest) => {
    let roomPrice = 299; // Default price for King Bed Guest Room
    if (guest.roomType === 'King Bed Suite') roomPrice = 499;
    else if (guest.roomType === '1 Double Bed Guest Room') roomPrice = 199;
    else if (guest.roomType === '2 Double Bed') roomPrice = 349;
    else if (guest.roomType === '1 Double Suite') roomPrice = 399;
    
    // Calculate nights stayed
    const checkInDate = new Date(guest.checkInDate);
    const checkOutDate = new Date();
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    return roomPrice * nights;
  };

  const getStatusColor = (status) => {
    if (guestData?.checkInTime) return 'success';
    if (guestData?.status === 'cancelled') return 'error';
    return 'warning';
  };

  const getStatusLabel = (status) => {
    if (guestData?.checkInTime) return 'Checked In';
    if (guestData?.status === 'cancelled') return 'Cancelled';
    return 'Pending';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading guest profile...</Typography>
      </Box>
    );
  }

  if (error || !guestData) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error || 'Guest not found'}</Alert>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate('/admin/arrivals')}
          sx={{ mt: 2 }}
        >
          Back to Arrivals
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => navigate('/admin/arrivals')}
              sx={{ 
                mr: 2,
                bgcolor: 'rgba(102, 126, 234, 0.1)',
                '&:hover': { bgcolor: 'rgba(102, 126, 234, 0.2)' }
              }}
            >
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                Guest Profile
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Manage guest information and reservation
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {!isEditing ? (
              <Button
                startIcon={<Edit />}
                variant="outlined"
                onClick={handleEdit}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  startIcon={<Save />}
                  variant="contained"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  startIcon={<Cancel />}
                  variant="outlined"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </>
            )}
            <Button
              startIcon={<Delete />}
              variant="outlined"
              color="error"
              onClick={() => setDeleteDialog(true)}
            >
              Delete
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Guest Information */}
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Guest Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Guest Name"
                      value={editForm.guestName || ''}
                      onChange={(e) => setEditForm({...editForm, guestName: e.target.value})}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: '#667eea' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: '#667eea' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: '#667eea' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Booking Number"
                      value={editForm.bookingNumber || ''}
                      disabled
                      InputProps={{
                        startAdornment: <Info sx={{ mr: 1, color: '#667eea' }} />,
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Room Information */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Room Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth disabled={!isEditing}>
                      <InputLabel>Room Type</InputLabel>
                      <Select
                        value={editForm.roomType || ''}
                        onChange={(e) => setEditForm({...editForm, roomType: e.target.value})}
                        label="Room Type"
                        startAdornment={<Hotel sx={{ mr: 1, color: '#667eea' }} />}
                      >
                        <MenuItem value="King Bed Guest Room">King Bed Guest Room</MenuItem>
                        <MenuItem value="King Bed Suite">King Bed Suite</MenuItem>
                        <MenuItem value="1 Double Bed Guest Room">1 Double Bed Guest Room</MenuItem>
                        <MenuItem value="2 Double Bed">2 Double Bed</MenuItem>
                        <MenuItem value="1 Double Suite">1 Double Suite</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Room Number"
                      value={editForm.roomNumber || ''}
                      onChange={(e) => setEditForm({...editForm, roomNumber: e.target.value})}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <Hotel sx={{ mr: 1, color: '#667eea' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Number of Guests"
                      value={editForm.numberOfGuests || 1}
                      onChange={(e) => setEditForm({...editForm, numberOfGuests: parseInt(e.target.value)})}
                      disabled={!isEditing}
                      type="number"
                      InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: '#667eea' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Check-in Date"
                      value={editForm.checkInDate || ''}
                      disabled
                      InputProps={{
                        startAdornment: <Schedule sx={{ mr: 1, color: '#667eea' }} />,
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Status and Actions */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Status Card */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Reservation Status
                  </Typography>
                  <Chip
                    label={getStatusLabel()}
                    color={getStatusColor()}
                    size="large"
                    sx={{ mb: 2 }}
                  />
                  {guestData.checkInTime && (
                    <Typography variant="body2" color="text.secondary">
                      Checked in: {new Date(guestData.checkInTime).toLocaleString()}
                    </Typography>
                  )}
                </CardContent>
              </Card>

              {/* Actions Card */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Quick Actions
                  </Typography>
                  <Stack spacing={2}>
                    {!guestData.checkInTime && guestData.status !== 'cancelled' && (
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircle />}
                        onClick={() => handleStatusChange('checked-in')}
                      >
                        Check In Guest
                      </Button>
                    )}
                    {guestData.checkInTime && (
                      <Button
                        fullWidth
                        variant="contained"
                        color="info"
                        startIcon={<Schedule />}
                        onClick={() => handleStatusChange('checked-out')}
                      >
                        Check Out Guest
                      </Button>
                    )}
                    {guestData.status !== 'cancelled' && (
                      <Button
                        fullWidth
                        variant="outlined"
                        color="warning"
                        startIcon={<Warning />}
                        onClick={() => handleStatusChange('cancelled')}
                      >
                        Cancel Reservation
                      </Button>
                    )}
                    {guestData.status === 'cancelled' && (
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={() => handleStatusChange('pending')}
                      >
                        Reactivate Reservation
                      </Button>
                    )}
                    <Button
                      fullWidth
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => setDeleteDialog(true)}
                    >
                      Remove Reservation
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              {/* Guest Avatar */}
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: '#667eea',
                      fontSize: '2rem',
                    }}
                  >
                    {guestData.guestName?.charAt(0)?.toUpperCase() || 'G'}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {guestData.guestName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Guest ID: {guestData.id}
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
          <DialogTitle>Delete Guest</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete {guestData.guestName}? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default GuestProfile; 