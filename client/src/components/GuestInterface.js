import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  CheckCircle,
  Hotel,
  Person,
  Room,
  ArrowBack,
  LocationOn,
  Star,
  Wifi,
  Pool,
  Restaurant,
  FitnessCenter,
  Spa,
  LocalParking,
  BusinessCenter,
  LocalBar,
  RoomService,
  Pets,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const steps = ['Hotel Details', 'Guest Information', 'Room Assignment', 'Confirmation'];

const GuestInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    hotelId: '',
    hotelName: '',
    roomType: '',
    guestName: '',
    email: '',
    phone: '',
    roomNumber: '',
    feedback: '',
  });
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Handle pre-selected hotel from HotelSearch
  useEffect(() => {
    // Check if a hotel was pre-selected from HotelSearch
    if (location.state?.selectedHotel) {
      const preSelectedHotel = location.state.selectedHotel;
      setSelectedHotel(preSelectedHotel);
      setFormData({
        ...formData,
        hotelId: preSelectedHotel.id,
        hotelName: preSelectedHotel.name,
      });
      

    } else {
      // If no hotel selected, redirect back to hotel search
      navigate('/hotels');
    }
  }, [location.state, navigate]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };



  const handleCheckIn = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // For demo purposes, assign a random room
      const demoRooms = [
        { number: '101', type: 'King Bed Guest Room' },
        { number: '205', type: 'King Bed Suite' },
        { number: '312', type: '1 Double Bed Guest Room' },
        { number: '408', type: '2 Double Bed' },
        { number: '501', type: '1 Double Suite' }
      ];
      
      const assignedRoom = demoRooms[Math.floor(Math.random() * demoRooms.length)];
      
      // Update form data with assigned room
      setFormData({
        ...formData,
        roomNumber: assignedRoom.number,
        roomType: assignedRoom.type,
      });
      
      console.log('Processing check-in data:', {
        hotelId: formData.hotelId,
        guestName: formData.guestName,
        email: formData.email,
        phone: formData.phone,
        roomNumber: assignedRoom.number,
        roomType: assignedRoom.type,
      });
      
      // Store guest data in localStorage for admin portal
      const guestData = {
        id: Date.now(),
        guestName: formData.guestName,
        email: formData.email,
        phone: formData.phone,
        roomNumber: assignedRoom.number,
        roomType: assignedRoom.type,
        hotelName: formData.hotelName,
        hotelLocation: selectedHotel?.location || 'Hotel Location',
        hotelRating: selectedHotel?.rating || '4.5',
        checkInDate: new Date().toISOString().split('T')[0],
        checkInTime: new Date().toISOString(),
        checkOutDate: 'To be determined',
        status: 'checked-in',
        bookingNumber: `BK${Date.now()}`,
        amenities: selectedHotel?.amenities || ['wifi', 'pool', 'restaurant', 'fitness', 'spa', 'parking'],
      };
      
      // Add to currently in house guests
      const existingInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
      const updatedInHouse = [...existingInHouse, guestData];
      localStorage.setItem('currentlyInHouse', JSON.stringify(updatedInHouse));
      
      // Add to today's arrivals
      const existingArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
      const updatedArrivals = [...existingArrivals, guestData];
      localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));
      
      // Dispatch custom events to notify admin portal
      window.dispatchEvent(new CustomEvent('inHouseUpdated', {
        detail: { inHouse: updatedInHouse }
      }));
      
      window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
        detail: { arrivals: updatedArrivals }
      }));
      
      setSuccess('Check-in successful! Welcome to our hotel.');
      handleNext();
    } catch (err) {
      console.error('Check-in error:', err);
      setError('Check-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  const getAmenityIcon = (amenity) => {
    const amenityIcons = {
      wifi: <Wifi />,
      pool: <Pool />,
      restaurant: <Restaurant />,
      fitness: <FitnessCenter />,
      spa: <Spa />,
      parking: <LocalParking />,
      business: <BusinessCenter />,
      bar: <LocalBar />,
      'room-service': <RoomService />,
      pets: <Pets />,
    };
    return amenityIcons[amenity] || <Hotel />;
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Hotel sx={{ mr: 1, verticalAlign: 'middle' }} />
                Selected Hotel Details
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Please review your selected hotel information before proceeding with check-in.
              </Typography>
              {selectedHotel && (
                <Card sx={{ border: '2px solid #667eea', bgcolor: 'rgba(102, 126, 234, 0.05)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <img
                        src={selectedHotel.image}
                        alt={selectedHotel.name}
                        style={{
                          width: 120,
                          height: 90,
                          objectFit: 'cover',
                          borderRadius: 8,
                          marginRight: 16,
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                          {selectedHotel.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationOn sx={{ fontSize: 18, color: '#666', mr: 1 }} />
                          <Typography variant="body1" color="text.secondary">
                            {selectedHotel.location}, {selectedHotel.city}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Star sx={{ fontSize: 18, color: '#FFD700', mr: 0.5 }} />
                          <Typography variant="body1" sx={{ mr: 2 }}>
                            {selectedHotel.rating} Rating
                          </Typography>
                          <Typography variant="h6" sx={{ color: '#667eea', fontWeight: 700 }}>
                            ${selectedHotel.price} per night
                          </Typography>
                        </Box>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                          {selectedHotel.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {selectedHotel.amenities.map((amenity) => (
                            <Chip
                              key={amenity}
                              icon={getAmenityIcon(amenity)}
                              label={amenity}
                              size="small"
                              sx={{ bgcolor: '#f0f0f0' }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                Guest Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Guest Name"
                    value={formData.guestName}
                    onChange={handleInputChange('guestName')}
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    required
                    margin="normal"
                  />
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Room sx={{ mr: 1, verticalAlign: 'middle' }} />
                Room Assignment
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Your room will be automatically assigned based on availability and your preferences.
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Selected Hotel: {formData.hotelName}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Guest: {formData.guestName}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Room Type: {formData.roomType || 'Will be assigned during check-in'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Room Number: {formData.roomNumber || 'Will be assigned during check-in'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Room number will be assigned automatically during check-in based on availability.
                  </Alert>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <CheckCircle sx={{ mr: 1, verticalAlign: 'middle' }} />
                Check-in Confirmation
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Alert severity="success" sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Check-in Successful!
                    </Typography>
                    <Typography variant="body2">
                      Welcome to {formData.hotelName}! Your room has been assigned.
                    </Typography>
                  </Alert>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Room Information
                  </Typography>
                  <Typography variant="body1">
                    <strong>Room Number:</strong> {formData.roomNumber}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Room Type:</strong> {formData.roomType}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Hotel:</strong> {formData.hotelName}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Guest Information
                  </Typography>
                  <Typography variant="body1">
                    <strong>Name:</strong> {formData.guestName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {formData.email}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Phone:</strong> {formData.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 3 }}>
                    You can now proceed to your room. If you need any assistance, please contact the front desk.
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
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
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      View My Stay
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 4,
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
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
          <Box textAlign="center">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
              <img 
                src="/images/swiftstay-logo.svg" 
                alt="SwiftStay Logo" 
                style={{ height: '60px', width: 'auto', marginRight: '16px' }}
              />
            </Box>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              SwiftStay
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 300 }}>
              Self Check-in & Check-out System
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 6, borderRadius: 4, bgcolor: 'white' }}>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box sx={{ mt: 2, mb: 1 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            color="inherit"
            onClick={activeStep === 0 ? () => navigate('/hotels') : handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                disabled={true}
                startIcon={<CheckCircle />}
              >
                Check-in Complete
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={activeStep === 2 ? handleCheckIn : handleNext}
                disabled={loading || (activeStep === 1 && (!formData.guestName || !formData.email || !formData.phone))}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {activeStep === 2 ? 'Complete Check-in' : 'Next'}
              </Button>
            )}
          </Box>
        </Box>

        {activeStep === steps.length && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Welcome to SwiftStay!
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              Your check-in has been completed successfully. Enjoy your stay!
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/my-stay')}
                sx={{ 
                  px: 4, 
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  bgcolor: '#667eea',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#5a6fd8',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                View My Stay
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/')}
                sx={{ 
                  px: 4, 
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderColor: '#FFD700',
                  color: '#FFD700',
                  '&:hover': {
                    borderColor: '#FFC700',
                    bgcolor: 'rgba(255, 215, 0, 0.1)',
                  },
                }}
              >
                Back to Home
              </Button>
            </Box>
          </Box>
        )}
        </Paper>
      </Container>
    </Box>
  );
};

export default GuestInterface; 