import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Alert,
  CircularProgress,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Hotel,
  Person,
  Phone,
  Email,
  Room,
  Schedule,
  LocalPhone,
  RoomService,
  ExitToApp,
  Wifi,
  Restaurant,
  Pool,
  Spa,
  LocalParking,
  BusinessCenter,
  ArrowBack,
  CheckCircle,
  Info,
  Star,
  MoreVert,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MyStay = () => {
  const [guestData, setGuestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [serviceDialog, setServiceDialog] = useState(false);
  const [serviceType, setServiceType] = useState('');
  const [serviceRequest, setServiceRequest] = useState('');
  const [checkoutDialog, setCheckoutDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if guest is actually checked in
    const checkGuestStatus = () => {
      try {
        // Check localStorage for guest data
        const inHouseGuests = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
        
        // For demo purposes, get the most recent guest (you could also use session storage or cookies)
        if (inHouseGuests.length > 0) {
          const latestGuest = inHouseGuests[inHouseGuests.length - 1];
          setGuestData(latestGuest);
        } else {
          setGuestData(null);
        }
      } catch (error) {
        console.error('Error checking guest status:', error);
        setGuestData(null);
      }
      setLoading(false);
    };
    
    checkGuestStatus();
  }, []);

  const handleServiceRequest = async () => {
    try {
      // Create service request object
      const serviceRequestData = {
        id: Date.now(),
        guestName: guestData.guestName,
        roomNumber: guestData.roomNumber,
        requestType: serviceType,
        requestTitle: `${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Request`,
        requestDetails: serviceRequest,
        status: 'pending',
        priority: 'medium',
        timestamp: new Date().toISOString(),
        assignedTo: null,
      };

      // Store in localStorage for admin portal
      const existingRequests = JSON.parse(localStorage.getItem('pendingRequests') || '[]');
      const updatedRequests = [...existingRequests, serviceRequestData];
      localStorage.setItem('pendingRequests', JSON.stringify(updatedRequests));

      // Dispatch custom event to notify admin portal
      window.dispatchEvent(new CustomEvent('pendingRequestsUpdated', {
        detail: { requests: updatedRequests }
      }));

      console.log('Service request created:', serviceRequestData);
      setServiceDialog(false);
      setServiceRequest('');
      setServiceType('');
      
      // Show success message
      alert('Service request submitted successfully! Staff will assist you shortly.');
    } catch (error) {
      console.error('Error sending service request:', error);
      alert('Failed to submit service request. Please try again.');
    }
  };

  const handleCheckout = async () => {
    try {
      // Remove guest from currently in house
      const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
      const updatedInHouse = currentlyInHouse.filter(guest => guest.id !== guestData.id);
      localStorage.setItem('currentlyInHouse', JSON.stringify(updatedInHouse));

      // Add to checkout history
      const checkoutHistory = JSON.parse(localStorage.getItem('checkoutHistory') || '[]');
      const checkoutRecord = {
        ...guestData,
        checkOutTime: new Date().toISOString(),
        checkOutDate: new Date().toISOString().split('T')[0],
        status: 'checked_out',
        totalAmount: calculateTotalAmount(guestData),
      };
      const updatedCheckouts = [...checkoutHistory, checkoutRecord];
      localStorage.setItem('checkoutHistory', JSON.stringify(updatedCheckouts));

      // Dispatch custom events to notify admin portal
      window.dispatchEvent(new CustomEvent('inHouseUpdated', {
        detail: { inHouse: updatedInHouse }
      }));
      
      window.dispatchEvent(new CustomEvent('checkoutUpdated', {
        detail: { checkouts: updatedCheckouts }
      }));

      console.log('Checkout completed for:', guestData.bookingNumber);
      setCheckoutDialog(false);
      navigate('/checkout-success');
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again.');
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

  const getAmenityIcon = (amenity) => {
    const amenityIcons = {
      wifi: <Wifi />,
      pool: <Pool />,
      restaurant: <Restaurant />,
      fitness: <Spa />,
      spa: <Spa />,
      parking: <LocalParking />,
      business: <BusinessCenter />,
    };
    return amenityIcons[amenity] || <Hotel />;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!guestData) {
    navigate('/no-stay');
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 4,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
              sx={{
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Back to Home
            </Button>
            <Box />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            My Stay
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Welcome back, {guestData.guestName}!
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Hotel Information */}
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <img
                    src={guestData.hotelImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                    alt={guestData.hotelName}
                    style={{
                      width: 120,
                      height: 90,
                      objectFit: 'cover',
                      borderRadius: 8,
                      marginRight: 16,
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <Box
                    sx={{
                      width: 120,
                      height: 90,
                      bgcolor: '#667eea',
                      borderRadius: 8,
                      marginRight: 16,
                      display: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Hotel sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      {guestData.hotelName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Hotel sx={{ fontSize: 18, color: '#666', mr: 1 }} />
                      <Typography variant="body1" color="text.secondary">
                        {guestData.hotelLocation || 'Hotel Location'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Star sx={{ fontSize: 18, color: '#FFD700', mr: 0.5 }} />
                      <Typography variant="body1" sx={{ mr: 2 }}>
                        {guestData.hotelRating || '4.5'} Rating
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Room Details
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><Room /></ListItemIcon>
                        <ListItemText 
                          primary="Room Number" 
                          secondary={guestData.roomNumber} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Hotel /></ListItemIcon>
                        <ListItemText 
                          primary="Room Type" 
                          secondary={guestData.roomType} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Schedule /></ListItemIcon>
                        <ListItemText 
                          primary="Check-in Date" 
                          secondary={new Date(guestData.checkInTime).toLocaleDateString()} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Schedule /></ListItemIcon>
                        <ListItemText 
                          primary="Check-out Date" 
                          secondary={guestData.checkOutDate || 'To be determined'} 
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Guest Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><Person /></ListItemIcon>
                        <ListItemText 
                          primary="Name" 
                          secondary={guestData.guestName} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Email /></ListItemIcon>
                        <ListItemText 
                          primary="Email" 
                          secondary={guestData.email} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Phone /></ListItemIcon>
                        <ListItemText 
                          primary="Phone" 
                          secondary={guestData.phone} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Info /></ListItemIcon>
                        <ListItemText 
                          primary="Booking Number" 
                          secondary={guestData.bookingNumber} 
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Hotel Amenities */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Hotel Amenities
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {(guestData.amenities || ['wifi', 'pool', 'restaurant', 'fitness', 'spa', 'parking']).map((amenity) => (
                    <Chip
                      key={amenity}
                      icon={getAmenityIcon(amenity)}
                      label={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                      size="small"
                      sx={{ bgcolor: '#f0f0f0' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Quick Actions
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<LocalPhone />}
                    onClick={() => window.open('tel:+1-555-123-4567')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Call Front Desk
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<RoomService />}
                    onClick={() => {
                      setServiceType('room-service');
                      setServiceDialog(true);
                    }}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Request Room Service
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Wifi />}
                    onClick={() => {
                      setServiceType('wifi');
                      setServiceDialog(true);
                    }}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    WiFi Support
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Restaurant />}
                    onClick={() => {
                      setServiceType('restaurant');
                      setServiceDialog(true);
                    }}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Restaurant Reservation
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Spa />}
                    onClick={() => {
                      setServiceType('spa');
                      setServiceDialog(true);
                    }}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Spa Booking
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<MoreVert />}
                    onClick={() => {
                      setServiceType('other');
                      setServiceDialog(true);
                    }}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Other Request
                  </Button>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<ExitToApp />}
                    onClick={() => setCheckoutDialog(true)}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Check Out
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Status Card */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Stay Status
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
                  <Typography variant="body1">
                    Checked In
                  </Typography>
                </Box>
                <Chip 
                  label={guestData.status} 
                  color="success" 
                  size="small" 
                />
              </CardContent>
            </Card>

            {/* Hotel Services & Amenities Card */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Hotel Services & Amenities
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#667eea' }}>
                    Available Amenities
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {(guestData.amenities || ['wifi', 'pool', 'restaurant', 'fitness', 'spa', 'parking']).map((amenity) => (
                      <Chip
                        key={amenity}
                        icon={getAmenityIcon(amenity)}
                        label={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                        size="small"
                        sx={{ bgcolor: '#f0f8ff', color: '#667eea' }}
                      />
                    ))}
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#667eea' }}>
                    Hotel Information
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Schedule sx={{ fontSize: 20, color: '#667eea' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Check-in Time" 
                        secondary="3:00 PM" 
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Schedule sx={{ fontSize: 20, color: '#667eea' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Check-out Time" 
                        secondary="11:00 AM" 
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Phone sx={{ fontSize: 20, color: '#667eea' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Front Desk" 
                        secondary="+1 (555) 123-4567" 
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Restaurant sx={{ fontSize: 20, color: '#667eea' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Restaurant Hours" 
                        secondary="6:00 AM - 10:00 PM" 
                      />
                    </ListItem>
                  </List>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#667eea' }}>
                    Emergency Contacts
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Phone sx={{ fontSize: 20, color: '#ff4444' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Emergency" 
                        secondary="911" 
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Phone sx={{ fontSize: 20, color: '#ff8800' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Security" 
                        secondary="+1 (555) 123-4568" 
                      />
                    </ListItem>
                  </List>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Service Request Dialog */}
      <Dialog open={serviceDialog} onClose={() => setServiceDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Request {serviceType === 'room-service' ? 'Room Service' : 
                   serviceType === 'wifi' ? 'WiFi Support' :
                   serviceType === 'restaurant' ? 'Restaurant Reservation' :
                   serviceType === 'spa' ? 'Spa Booking' : 'Service'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Please describe your request"
            value={serviceRequest}
            onChange={(e) => setServiceRequest(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setServiceDialog(false)}>Cancel</Button>
          <Button onClick={handleServiceRequest} variant="contained">
            Send Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Checkout Confirmation Dialog */}
      <Dialog open={checkoutDialog} onClose={() => setCheckoutDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Confirm Checkout
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to check out? This action cannot be undone.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You will be redirected to the checkout confirmation page after completing your checkout.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckoutDialog(false)}>Cancel</Button>
          <Button onClick={handleCheckout} variant="contained" color="error">
            Confirm Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyStay; 