import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Chip,
  Stack,
  Snackbar,
  Alert,
  Avatar,
  IconButton,
  MenuItem,
} from '@mui/material';
import {
  ArrowBack,
  Email,
  LocationOn,
  AccessTime,
  Send,
  Support,
  Person,
  Subject,
  Message,
  CheckCircle,
  Star,
  StarBorder,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);
  const [rating, setRating] = useState(0);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Contact form submitted:', formData);
    setSuccess(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 32, color: '#667eea' }} />,
      title: 'Email Us',
      details: 'support@swiftstay.com',
      description: 'Get in touch with our support team',
    },
    {
      icon: <LocationOn sx={{ fontSize: 32, color: '#4CAF50' }} />,
      title: 'Visit Us',
      details: 'University of Maryland College Park, MD 20742',
      description: 'Our headquarters location',
    },
    {
      icon: <AccessTime sx={{ fontSize: 32, color: '#FF9800' }} />,
      title: 'Business Hours',
      details: '24/7 Digital Support',
      description: 'Round-the-clock assistance available',
    },
  ];

  const subjectOptions = [
    'General Inquiry',
    'Technical Support',
    'Booking Assistance',
    'Feedback & Suggestions',
    'Partnership Opportunities',
    'Other',
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <IconButton
              onClick={() => navigate('/')}
              sx={{ 
                color: 'white', 
                mr: 2,
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Get in Touch
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600 }}>
            Have questions about SwiftStay? We're here to help! Reach out to our team and we'll get back to you as soon as possible.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} lg={7}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              overflow: 'hidden',
            }}>
              <Box sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                p: 3,
              }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Send us a Message
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Fill out the form below and we'll respond within 24 hours
                </Typography>
              </Box>
              <CardContent sx={{ p: 4 }}>
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        required
                        InputProps={{
                          startAdornment: <Person sx={{ mr: 1, color: '#667eea' }} />,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        required
                        InputProps={{
                          startAdornment: <Email sx={{ mr: 1, color: '#667eea' }} />,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        select
                        label="Subject"
                        value={formData.subject}
                        onChange={handleInputChange('subject')}
                        required
                        InputProps={{
                          startAdornment: <Subject sx={{ mr: 1, color: '#667eea' }} />,
                        }}
                      >
                        {subjectOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange('message')}
                        required
                        placeholder="Tell us how we can help you..."
                        InputProps={{
                          startAdornment: <Message sx={{ mr: 1, color: '#667eea', mt: 1 }} />,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          How would you rate your experience with SwiftStay?
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          {[1, 2, 3, 4, 5].map((value) => (
                            <IconButton
                              key={value}
                              onClick={() => setRating(value)}
                              sx={{ color: value <= rating ? '#FFD700' : '#ddd' }}
                            >
                              {value <= rating ? <Star /> : <StarBorder />}
                            </IconButton>
                          ))}
                        </Stack>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Send />}
                        sx={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: 3,
                          py: 1.5,
                          px: 4,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          textTransform: 'none',
                          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} lg={5}>
            <Stack spacing={3}>
              {/* Contact Info Cards */}
              {contactInfo.map((info, index) => (
                <Card key={index} sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Avatar sx={{ 
                        bgcolor: 'rgba(102, 126, 234, 0.1)', 
                        width: 56, 
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {info.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {info.title}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                          {info.details}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {info.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}

              {/* Support Hours */}
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Support sx={{ fontSize: 32, color: '#667eea', mr: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Support Hours
                    </Typography>
                  </Box>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Monday - Friday</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>9:00 AM - 6:00 PM</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Saturday</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>10:00 AM - 4:00 PM</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Sunday</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>Closed</Typography>
                    </Box>
                  </Stack>
                  <Chip 
                    label="24/7 Digital Support Available" 
                    color="success" 
                    size="small" 
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* FAQ Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                question: "How does SwiftStay's self-check-in work?",
                answer: "Our innovative self-check-in system allows guests to complete their check-in process in under 2 minutes using our mobile app or kiosk, eliminating the need to wait in line at the front desk."
              },
              {
                question: "Is SwiftStay available at all hotels?",
                answer: "SwiftStay is currently in development and will be available at select partner hotels. We're working to expand our network and bring this technology to more locations."
              },
              {
                question: "What if I need assistance during my stay?",
                answer: "Our 24/7 digital support system is always available to help with any questions or issues. You can reach our support team through the app or contact us directly."
              },
              {
                question: "How secure is my personal information?",
                answer: "We take security seriously. All personal information is encrypted and protected using industry-standard security protocols to ensure your data remains safe and private."
              }
            ].map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#667eea' }}>
                      {faq.question}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {faq.answer}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: '100%' }}
          icon={<CheckCircle />}
        >
          Thank you for your message! We'll get back to you within 24 hours.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact; 