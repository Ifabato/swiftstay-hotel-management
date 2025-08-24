import React, { useState } from 'react';
import {
  Container, Paper, Typography, Box, Button, TextField, Alert, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import {
  Search, ArrowBack, Person, Hotel, Phone, Support, CheckCircle, Error,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FindMyStay = () => {
  const [guestName, setGuestName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [assistanceDialog, setAssistanceDialog] = useState(false);
  const [assistanceRequest, setAssistanceRequest] = useState('');
  const navigate = useNavigate();

  // Mock database of checked-in guests
  const checkedInGuests = [
    {
      id: 1,
      guestName: 'John Smith',
      roomNumber: '101',
      hotelName: 'Grand Plaza Hotel',
      checkInDate: '2024-01-15',
      checkOutDate: '2024-01-17',
      status: 'checked-in',
      bookingNumber: 'BK001',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
    },
    {
      id: 2,
      guestName: 'Sarah Johnson',
      roomNumber: '205',
      hotelName: 'Grand Plaza Hotel',
      checkInDate: '2024-01-15',
      checkOutDate: '2024-01-18',
      status: 'checked-in',
      bookingNumber: 'BK002',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 234-5678',
    },
  ];

  const handleSearch = () => {
    if (!guestName.trim() || !roomNumber.trim()) {
      setError('Please enter both guest name and room number');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const foundGuest = checkedInGuests.find(
        guest => 
          guest.guestName.toLowerCase().includes(guestName.toLowerCase()) &&
          guest.roomNumber === roomNumber
      );

      if (foundGuest) {
        setSearchResult(foundGuest);
        setError('');
      } else {
        setSearchResult(null);
        setError('No stay found with the provided information. Please check your details and try again.');
      }
      setLoading(false);
    }, 1000);
  };

  const handleRequestAssistance = async () => {
    try {
      // In real implementation, this would send to server
      console.log('Assistance request:', assistanceRequest);
      
      // Add to pending requests (in real app, this would be sent to server)
      const newRequest = {
        id: Date.now(),
        guestName: guestName,
        roomNumber: roomNumber,
        requestType: 'assistance',
        requestTitle: 'Guest Assistance Request',
        requestDetails: assistanceRequest,
        status: 'pending',
        priority: 'medium',
        timestamp: new Date().toISOString(),
        assignedTo: null,
      };

      // In real implementation, this would be sent to the server
      // and would appear in the admin portal pending requests
      console.log('New assistance request created:', newRequest);
      
      setAssistanceDialog(false);
      setAssistanceRequest('');
      
      // Show success message
      setError('');
      setSearchResult(prev => ({
        ...prev,
        assistanceRequested: true
      }));
    } catch (error) {
      console.error('Error sending assistance request:', error);
      setError('Failed to send assistance request. Please try again.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
          color: 'white',
          py: 4,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/no-stay')}
              sx={{
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Back
            </Button>
            <Box />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            Find My Stay
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Search for your current stay using your name and room number
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md">
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Search for Your Stay
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Guest Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter your full name"
                InputProps={{
                  startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Room Number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="Enter your room number"
                InputProps={{
                  startAdornment: <Hotel sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Search />}
              onClick={handleSearch}
              disabled={loading}
              sx={{
                bgcolor: '#4CAF50',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#45a049',
                },
              }}
            >
              {loading ? 'Searching...' : 'Search Stay'}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}
        </Paper>

        {/* Search Results */}
        {searchResult && (
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CheckCircle sx={{ color: '#4CAF50', mr: 2, fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Stay Found!
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Stay Details
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Guest Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {searchResult.guestName}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Room Number
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {searchResult.roomNumber}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Hotel
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {searchResult.hotelName}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Booking Number
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {searchResult.bookingNumber}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Stay Period
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Check-in Date
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {searchResult.checkInDate}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Check-out Date
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {searchResult.checkOutDate}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                      {searchResult.status.charAt(0).toUpperCase() + searchResult.status.slice(1)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/my-stay')}
                  sx={{
                    bgcolor: '#667eea',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: '#5a6fd8',
                    },
                  }}
                >
                  View My Stay
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Support />}
                  onClick={() => setAssistanceDialog(true)}
                  disabled={searchResult.assistanceRequested}
                  sx={{
                    borderColor: '#FF9800',
                    color: '#FF9800',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: '#F57C00',
                      bgcolor: 'rgba(255, 152, 0, 0.1)',
                    },
                  }}
                >
                  {searchResult.assistanceRequested ? 'Assistance Requested' : 'Request Assistance'}
                </Button>
              </Box>

              {searchResult.assistanceRequested && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Your assistance request has been sent to the hotel staff. They will contact you shortly.
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Need Help?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              If you're having trouble finding your stay or need immediate assistance, you can:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                startIcon={<Phone />}
                onClick={() => setAssistanceDialog(true)}
                sx={{
                  borderColor: '#FF9800',
                  color: '#FF9800',
                  '&:hover': {
                    borderColor: '#F57C00',
                    bgcolor: 'rgba(255, 152, 0, 0.1)',
                  },
                }}
              >
                Contact Hotel Staff
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    borderColor: '#5a6fd8',
                    bgcolor: 'rgba(102, 126, 234, 0.1)',
                  },
                }}
              >
                Back to Home
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>

      {/* Assistance Request Dialog */}
      <Dialog open={assistanceDialog} onClose={() => setAssistanceDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Request Assistance
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please describe what you need help with. Our hotel staff will contact you shortly.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Describe your request"
            value={assistanceRequest}
            onChange={(e) => setAssistanceRequest(e.target.value)}
            placeholder="e.g., I need help with WiFi connection, room service, or have a question about my stay..."
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssistanceDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleRequestAssistance} 
            variant="contained"
            disabled={!assistanceRequest.trim()}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FindMyStay; 