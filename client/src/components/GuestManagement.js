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
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  Person,
  Email,
  Room,
  Schedule,
  CheckCircle,
  Cancel,
  Refresh,
  Edit,
  Delete,
  ArrowBack,
} from '@mui/icons-material';

const GuestManagement = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState([]);
  const [editingGuest, setEditingGuest] = useState(null);
  const [editForm, setEditForm] = useState({
    guestName: '',
    email: '',
    roomNumber: '',
    roomType: '',
    status: '',
  });
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load currently in house guests from localStorage
    const loadGuests = () => {
      const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
      console.log('GuestManagement - Loading in-house guests:', currentlyInHouse);
      setGuests(currentlyInHouse);
    };

    loadGuests();

    // Listen for in-house updates
    const handleInHouseUpdate = (event) => {
      const { inHouse: updatedInHouse } = event.detail;
      console.log('GuestManagement - Received in-house update:', updatedInHouse);
      setGuests(updatedInHouse);
    };

    window.addEventListener('inHouseUpdated', handleInHouseUpdate);

    return () => {
      window.removeEventListener('inHouseUpdated', handleInHouseUpdate);
    };
  }, []);

  const handleEditGuest = (guest) => {
    setEditingGuest(guest);
    setEditForm({
      guestName: guest.guestName || '',
      email: guest.email || '',
      roomNumber: guest.roomNumber || '',
      roomType: guest.roomType || '',
      status: guest.status || 'checked-in',
    });
    setError('');
  };

  const handleSaveEdit = () => {
    try {
      if (!editingGuest) return;

      const updatedGuest = { ...editingGuest, ...editForm };
      
      // Update in currentlyInHouse
      const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
      const updatedInHouse = currentlyInHouse.map(guest => 
        guest.id === editingGuest.id ? updatedGuest : guest
      );
      localStorage.setItem('currentlyInHouse', JSON.stringify(updatedInHouse));

      // Update in todayArrivals if present
      const todayArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
      const updatedArrivals = todayArrivals.map(arrival => 
        arrival.id === editingGuest.id ? updatedGuest : arrival
      );
      localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));

      // Dispatch events
      window.dispatchEvent(new CustomEvent('inHouseUpdated', {
        detail: { inHouse: updatedInHouse }
      }));
      window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
        detail: { arrivals: updatedArrivals }
      }));

      setEditingGuest(null);
      setEditForm({
        guestName: '',
        email: '',
        roomNumber: '',
        roomType: '',
        status: '',
      });
      
      console.log('Guest updated:', updatedGuest.guestName);
    } catch (err) {
      console.error('Error updating guest:', err);
      setError('Failed to update guest');
    }
  };

  const handleCancelEdit = () => {
    setEditingGuest(null);
    setEditForm({
      guestName: '',
      email: '',
      roomNumber: '',
      roomType: '',
      status: '',
    });
    setError('');
  };

  const handleDeleteGuest = (guest) => {
    setGuestToDelete(guest);
    setDeleteDialog(true);
  };

  const confirmDelete = () => {
    try {
      if (!guestToDelete) return;

      // Remove from currentlyInHouse
      const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
      const updatedInHouse = currentlyInHouse.filter(guest => guest.id !== guestToDelete.id);
      localStorage.setItem('currentlyInHouse', JSON.stringify(updatedInHouse));

      // Remove from todayArrivals if present
      const todayArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
      const updatedArrivals = todayArrivals.filter(arrival => arrival.id !== guestToDelete.id);
      localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));

      // Remove from checkoutHistory if present
      const checkoutHistory = JSON.parse(localStorage.getItem('checkoutHistory') || '[]');
      const updatedCheckouts = checkoutHistory.filter(checkout => checkout.id !== guestToDelete.id);
      localStorage.setItem('checkoutHistory', JSON.stringify(updatedCheckouts));

      // Dispatch events
      window.dispatchEvent(new CustomEvent('inHouseUpdated', {
        detail: { inHouse: updatedInHouse }
      }));
      window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
        detail: { arrivals: updatedArrivals }
      }));
      window.dispatchEvent(new CustomEvent('checkoutUpdated', {
        detail: { checkouts: updatedCheckouts }
      }));

      setDeleteDialog(false);
      setGuestToDelete(null);
      
      console.log('Guest deleted:', guestToDelete.guestName);
    } catch (err) {
      console.error('Error deleting guest:', err);
      setError('Failed to delete guest');
    }
  };

  const cancelDelete = () => {
    setDeleteDialog(false);
    setGuestToDelete(null);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'checked-in':
        return 'success';
      case 'checked-out':
        return 'default';
      default:
        return 'warning';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'checked-in':
        return <CheckCircle />;
      case 'checked-out':
        return <Cancel />;
      default:
        return <Schedule />;
    }
  };

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
              Guest Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage currently checked-in guests
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={() => {
            const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
            console.log('GuestManagement - Manual refresh - Current in-house:', currentlyInHouse);
            alert(`Current in-house guests: ${currentlyInHouse.length}\n\nData: ${JSON.stringify(currentlyInHouse, null, 2)}`);
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

      <Card sx={{ 
        background: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3, color: '#2c3e50' }}>
            Current Guests ({guests.filter(g => g.status === 'checked-in').length})
          </Typography>
          
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Guest Name</TableCell>
                  <TableCell>Booking #</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Check-in Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {guests.map((guest) => (
                  <TableRow 
                    key={guest.id} 
                    hover 
                    onClick={() => navigate(`/admin/guest-profile/${guest.id}`, { 
                      state: { guestData: guest } 
                    })}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Person sx={{ mr: 1, color: '#667eea' }} />
                        {guest.guestName}
                      </Box>
                    </TableCell>
                    <TableCell>{guest.bookingNumber}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Room sx={{ mr: 1, color: '#764ba2' }} />
                        {guest.roomNumber || guest.roomType || 'TBD'}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Email sx={{ mr: 1, fontSize: 'small' }} />
                        {guest.email}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(guest.checkInTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(guest.status)}
                        label={guest.status}
                        color={getStatusColor(guest.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit Guest">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditGuest(guest);
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Guest">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteGuest(guest);
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {guests.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="textSecondary">
                No guests found
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Edit Guest Dialog */}
      <Dialog open={!!editingGuest} onClose={handleCancelEdit} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit Guest Information
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Guest Name"
                value={editForm.guestName}
                onChange={(e) => setEditForm({ ...editForm, guestName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Room Number"
                value={editForm.roomNumber}
                onChange={(e) => setEditForm({ ...editForm, roomNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Room Type</InputLabel>
                <Select
                  value={editForm.roomType}
                  onChange={(e) => setEditForm({ ...editForm, roomType: e.target.value })}
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="checked-in">Checked In</MenuItem>
                  <MenuItem value="checked-out">Checked Out</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the reservation for <strong>{guestToDelete?.guestName}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This action cannot be undone and will remove the guest from all systems.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GuestManagement; 