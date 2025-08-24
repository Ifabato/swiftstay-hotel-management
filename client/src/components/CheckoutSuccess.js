import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Alert,
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
} from '@mui/material';
import {
  CheckCircle,
  Hotel,
  Person,
  Phone,
  Email,
  Room,
  Schedule,
  Receipt,
  Star,
  ArrowBack,
  Download,
  Print,
  Share,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const [emailDialog, setEmailDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  // Demo data - in real implementation, this would come from props or context
  const stayData = {
    guestName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    hotelName: 'Grand Plaza Hotel',
    roomNumber: '101',
    roomType: 'Standard',
    checkInDate: '2024-01-15T10:30:00Z',
    checkOutDate: '2024-01-17T11:00:00Z',
    totalNights: 2,
    roomRate: 299,
    totalAmount: 598,
    taxes: 59.80,
    finalTotal: 657.80,
    bookingNumber: 'BK001',
    amenities: ['wifi', 'pool', 'restaurant', 'fitness', 'spa'],
    hotelImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    hotelLocation: 'Downtown, New York',
    hotelRating: 4.8,
  };

  const handleEmailInvoice = async () => {
    try {
      // In real implementation, this would send to server
      console.log('Sending invoice to:', email);
      setEmailSent(true);
      setTimeout(() => {
        setEmailDialog(false);
        setEmailSent(false);
        setEmail('');
      }, 2000);
    } catch (error) {
      console.error('Error sending invoice:', error);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    // In real implementation, this would generate and download PDF
    console.log('Downloading invoice...');
  };

  const getAmenityIcon = (amenity) => {
    const amenityIcons = {
      wifi: '📶',
      pool: '🏊',
      restaurant: '🍽️',
      fitness: '💪',
      spa: '🧖',
    };
    return amenityIcons[amenity] || '🏨';
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
          <Box sx={{ textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              Check-out Complete!
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Thank you for staying with us, {stayData.guestName}!
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Stay Summary */}
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Stay Summary
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <img
                    src={stayData.hotelImage}
                    alt={stayData.hotelName}
                    style={{
                      width: 120,
                      height: 90,
                      objectFit: 'cover',
                      borderRadius: 8,
                      marginRight: 16,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {stayData.hotelName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Hotel sx={{ fontSize: 16, color: '#666', mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {stayData.hotelLocation}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Star sx={{ fontSize: 16, color: '#FFD700', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ mr: 2 }}>
                        {stayData.hotelRating} Rating
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Guest Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><Person /></ListItemIcon>
                        <ListItemText 
                          primary="Name" 
                          secondary={stayData.guestName} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Email /></ListItemIcon>
                        <ListItemText 
                          primary="Email" 
                          secondary={stayData.email} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Phone /></ListItemIcon>
                        <ListItemText 
                          primary="Phone" 
                          secondary={stayData.phone} 
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Stay Details
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><Room /></ListItemIcon>
                        <ListItemText 
                          primary="Room Number" 
                          secondary={stayData.roomNumber} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Hotel /></ListItemIcon>
                        <ListItemText 
                          primary="Room Type" 
                          secondary={stayData.roomType} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Schedule /></ListItemIcon>
                        <ListItemText 
                          primary="Check-in" 
                          secondary={new Date(stayData.checkInDate).toLocaleDateString()} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Schedule /></ListItemIcon>
                        <ListItemText 
                          primary="Check-out" 
                          secondary={new Date(stayData.checkOutDate).toLocaleDateString()} 
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Amenities Used
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {stayData.amenities.map((amenity) => (
                    <Chip
                      key={amenity}
                      label={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                      size="small"
                      sx={{ bgcolor: '#f0f0f0' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Invoice */}
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Invoice Summary
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">Room Rate (${stayData.roomRate}/night)</Typography>
                  <Typography variant="body1">${stayData.roomRate}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">Number of Nights</Typography>
                  <Typography variant="body1">{stayData.totalNights}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">${stayData.totalAmount}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">Taxes & Fees</Typography>
                  <Typography variant="body1">${stayData.taxes}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Total Amount
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                    ${stayData.finalTotal}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Booking Number: {stayData.bookingNumber}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Actions */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Get Your Invoice
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<Email />}
                    onClick={() => setEmailDialog(true)}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Email Invoice
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    onClick={handleDownloadInvoice}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Download PDF
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Print />}
                    onClick={handlePrintInvoice}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Print Invoice
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Share />}
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'Hotel Invoice',
                          text: 'My hotel stay invoice'
                        }).catch(() => {
                          // Handle share cancellation or error silently
                          console.log('Share was cancelled or failed');
                        });
                      } else {
                        // Fallback for browsers that don't support Web Share API
                        alert('Sharing is not supported in this browser');
                      }
                    }}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Share
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Feedback */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Rate Your Stay
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  We'd love to hear about your experience!
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate('/feedback')}
                  sx={{ mb: 2 }}
                >
                  Leave a Review
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/')}
                >
                  Book Another Stay
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Email Dialog */}
      <Dialog open={emailDialog} onClose={() => setEmailDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Email Invoice</DialogTitle>
        <DialogContent>
          {emailSent ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Invoice sent successfully to {email}!
            </Alert>
          ) : (
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              placeholder="Enter email address for invoice"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleEmailInvoice} 
            variant="contained"
            disabled={!email || emailSent}
          >
            Send Invoice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CheckoutSuccess; 