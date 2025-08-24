import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from '@mui/material';
import {
  CheckCircle,
} from '@mui/icons-material';

const OnSiteReservation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    roomType: '',
    roomNumber: '',
    numberOfGuests: 1,
    specialRequests: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const [success, setSuccess] = useState(false);

  const steps = ['Guest Information', 'Room Selection', 'Payment', 'Confirmation'];

  const roomTypes = [
    { type: 'King Bed Guest Room', price: 299, available: true },
    { type: 'King Bed Suite', price: 499, available: true },
    { type: '1 Double Bed Guest Room', price: 199, available: true },
    { type: '2 Double Bed', price: 349, available: true },
    { type: '1 Double Suite', price: 399, available: true },
  ];

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (activeStep === 1 && formData.roomType && !formData.roomNumber) {
      alert('Please select a room number before continuing.');
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      // In real implementation, this would send to server
      console.log('Creating on-site reservation:', formData);
      
      // Create reservation object
      const reservation = {
        id: Date.now(),
        guestName: formData.guestName,
        email: formData.email,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        roomType: formData.roomType,
        roomNumber: formData.roomNumber,
        numberOfGuests: formData.numberOfGuests,
        specialRequests: formData.specialRequests,
        status: 'confirmed',
        bookingNumber: `BK${Date.now()}`,
        totalAmount: calculateTotal(),
        createdAt: new Date().toISOString(),
      };

      // If check-in date is today, add to arrivals
      const today = new Date().toISOString().split('T')[0];
      console.log('Today\'s date:', today);
      console.log('Check-in date:', formData.checkInDate);
      console.log('Dates match?', formData.checkInDate === today);
      
      // Always add to arrivals for testing purposes
      console.log('Adding to today\'s arrivals:', reservation);
      
      // Store in localStorage for demo purposes
      const existingArrivals = JSON.parse(localStorage.getItem('todayArrivals') || '[]');
      console.log('Existing arrivals:', existingArrivals);
      
      const updatedArrivals = [...existingArrivals, {
        ...reservation,
        checkInStatus: 'pending', // pending, checked-in, checked-out
        checkInTime: null,
        checkOutTime: null,
      }];
      console.log('Updated arrivals:', updatedArrivals);
      
      localStorage.setItem('todayArrivals', JSON.stringify(updatedArrivals));
      console.log('Stored in localStorage:', localStorage.getItem('todayArrivals'));
      
      // Dispatch a custom event to notify other components
      window.dispatchEvent(new CustomEvent('arrivalsUpdated', {
        detail: { arrivals: updatedArrivals }
      }));
      
      // Show success message for today's arrivals
      alert('Reservation created successfully! You have been added to today\'s arrivals. Staff will check you in shortly.');

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setActiveStep(0);
        setFormData({
          guestName: '',
          email: '',
          phone: '',
          checkInDate: '',
          checkOutDate: '',
          roomType: '',
          roomNumber: '',
          numberOfGuests: 1,
          specialRequests: '',
          paymentMethod: 'credit_card',
          cardNumber: '',
          cardExpiry: '',
          cardCvv: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  const calculateNights = () => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const diffTime = checkOut - checkIn;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const selectedRoom = roomTypes.find(room => room.type === formData.roomType);
    if (selectedRoom) {
      return nights * selectedRoom.price;
    }
    return 0;
  };

  const getAvailableRoomsForType = (roomType) => {
    // Get rooms from AvailableRooms component data
    const allRooms = [
      // King Bed Guest Room (30 rooms) - Rooms 101-130
      ...Array.from({ length: 30 }, (_, i) => ({
        roomNumber: `${101 + i}`,
        roomType: 'King Bed Guest Room',
        floor: `${Math.floor((101 + i) / 100) + 1}${getFloorSuffix(Math.floor((101 + i) / 100) + 1)} Floor`,
        status: 'available',
      })),
      
      // King Bed Suite (20 rooms) - Rooms 201-220
      ...Array.from({ length: 20 }, (_, i) => ({
        roomNumber: `${201 + i}`,
        roomType: 'King Bed Suite',
        floor: `${Math.floor((201 + i) / 100) + 1}${getFloorSuffix(Math.floor((201 + i) / 100) + 1)} Floor`,
        status: 'available',
      })),
      
      // 1 Double Bed Guest Room (25 rooms) - Rooms 301-325
      ...Array.from({ length: 25 }, (_, i) => ({
        roomNumber: `${301 + i}`,
        roomType: '1 Double Bed Guest Room',
        floor: `${Math.floor((301 + i) / 100) + 1}${getFloorSuffix(Math.floor((301 + i) / 100) + 1)} Floor`,
        status: 'available',
      })),
      
      // 2 Double Bed (15 rooms) - Rooms 401-415
      ...Array.from({ length: 15 }, (_, i) => ({
        roomNumber: `${401 + i}`,
        roomType: '2 Double Bed',
        floor: `${Math.floor((401 + i) / 100) + 1}${getFloorSuffix(Math.floor((401 + i) / 100) + 1)} Floor`,
        status: 'available',
      })),
      
      // 1 Double Suite (10 rooms) - Rooms 501-510
      ...Array.from({ length: 10 }, (_, i) => ({
        roomNumber: `${501 + i}`,
        roomType: '1 Double Suite',
        floor: `${Math.floor((501 + i) / 100) + 1}${getFloorSuffix(Math.floor((501 + i) / 100) + 1)} Floor`,
        status: 'available',
      })),
    ];

    // Filter rooms by type and status
    return allRooms.filter(room => 
      room.roomType === roomType && room.status === 'available'
    );
  };

  const getFloorSuffix = (floor) => {
    if (floor === 1) return 'st';
    if (floor === 2) return 'nd';
    if (floor === 3) return 'rd';
    return 'th';
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Number of Guests"
                type="number"
                value={formData.numberOfGuests}
                onChange={handleInputChange('numberOfGuests')}
                required
                margin="normal"
                inputProps={{ min: 1, max: 4 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Special Requests"
                multiline
                rows={3}
                value={formData.specialRequests}
                onChange={handleInputChange('specialRequests')}
                margin="normal"
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Check-in Date"
                type="date"
                value={formData.checkInDate}
                onChange={handleInputChange('checkInDate')}
                required
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Check-out Date"
                type="date"
                value={formData.checkOutDate}
                onChange={handleInputChange('checkOutDate')}
                required
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Available Room Types
              </Typography>
              <Grid container spacing={2}>
                {roomTypes.map((room) => (
                  <Grid item xs={12} sm={6} md={3} key={room.type}>
                    <Card 
                      sx={{ 
                        cursor: room.available ? 'pointer' : 'not-allowed',
                        opacity: room.available ? 1 : 0.6,
                        border: formData.roomType === room.type ? '2px solid #667eea' : '1px solid #e0e0e0',
                      }}
                      onClick={() => room.available && setFormData({...formData, roomType: room.type})}
                    >
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {room.type}
                        </Typography>
                        <Typography variant="h5" sx={{ color: '#667eea', fontWeight: 700 }}>
                          ${room.price}
                        </Typography>
                        <Chip 
                          label={room.available ? 'Available' : 'Not Available'} 
                          color={room.available ? 'success' : 'error'}
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {formData.roomType && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Available Room Numbers - {formData.roomType}
                  </Typography>
                  <Grid container spacing={2}>
                    {getAvailableRoomsForType(formData.roomType).map((room) => (
                      <Grid item xs={12} sm={6} md={3} key={room.roomNumber}>
                        <Card 
                          sx={{ 
                            cursor: 'pointer',
                            border: formData.roomNumber === room.roomNumber ? '2px solid #667eea' : '1px solid #e0e0e0',
                            '&:hover': {
                              border: '2px solid #667eea',
                              transform: 'translateY(-2px)',
                            },
                          }}
                          onClick={() => setFormData({...formData, roomNumber: room.roomNumber})}
                        >
                          <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }}>
                              Room {room.roomNumber}
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'center', color: '#667eea' }}>
                              {room.floor}
                            </Typography>
                            <Chip 
                              label="Available" 
                              color="success"
                              size="small"
                              sx={{ mt: 1, width: '100%' }}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Reservation Summary
                    </Typography>
                    <Typography variant="body2">
                      {calculateNights()} nights × ${roomTypes.find(r => r.type === formData.roomType)?.price} = ${calculateTotal()}
                    </Typography>
                    {formData.roomNumber && (
                      <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                        Selected Room: {formData.roomNumber}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              </>
            )}
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={formData.paymentMethod}
                  onChange={handleInputChange('paymentMethod')}
                  label="Payment Method"
                >
                  <MenuItem value="credit_card">Credit Card</MenuItem>
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="debit_card">Debit Card</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {formData.paymentMethod === 'credit_card' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange('cardNumber')}
                    margin="normal"
                    placeholder="1234 5678 9012 3456"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    value={formData.cardExpiry}
                    onChange={handleInputChange('cardExpiry')}
                    margin="normal"
                    placeholder="MM/YY"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    value={formData.cardCvv}
                    onChange={handleInputChange('cardCvv')}
                    margin="normal"
                    placeholder="123"
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Final Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Room Type:</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{formData.roomType}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Nights:</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{calculateNights()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Rate per night:</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    ${roomTypes.find(r => r.type === formData.roomType)?.price}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#667eea' }}>
                    ${calculateTotal()}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 80, color: '#4CAF50', mb: 3 }} />
            <Typography variant="h5" sx={{ mb: 2 }}>
              Reservation Complete!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              The reservation has been successfully created for {formData.guestName}.
            </Typography>
            <Paper sx={{ p: 3, bgcolor: '#f8f9fa', maxWidth: 400, mx: 'auto' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Reservation Details
              </Typography>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Guest:</strong> {formData.guestName}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Room:</strong> {formData.roomType} - {formData.roomNumber}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Check-in:</strong> {formData.checkInDate}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Check-out:</strong> {formData.checkOutDate}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Total:</strong> ${calculateTotal()}
                </Typography>
              </Box>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: '#fafbfc' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: '#2c3e50', mb: 1 }}>
          Create On-Site Reservation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create a new reservation for walk-in guests
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Reservation created successfully!
        </Alert>
      )}

      <Card sx={{ 
        background: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={success}
                >
                  {success ? 'Reservation Created' : 'Create Reservation'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={
                    (activeStep === 0 && (!formData.guestName || !formData.email || !formData.phone)) ||
                    (activeStep === 1 && (!formData.checkInDate || !formData.checkOutDate || !formData.roomType || !formData.roomNumber))
                  }
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OnSiteReservation; 