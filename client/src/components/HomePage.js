import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Grow,
  Chip,
  Avatar,
  Divider,
  Stack,
  TextField,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Tooltip,
  Zoom,
} from '@mui/material';
import {
  Hotel,
  Speed,
  Security,
  Support,
  ArrowForward,
  Menu,
  AdminPanelSettings,
  Star,
  CheckCircle,
  TrendingUp,
  People,
  Verified,
  AccessTime,
  LocationOn,
  Email,
  PlayArrow,
  KeyboardArrowDown,
  Close,
  Home,
  Info,
  ContactSupport,
  Business,
  Dashboard,
  Notifications,
  AccountCircle,
  Search,
  FilterList,
  Favorite,
  Share,
  Phone,
  Language,


} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Speed sx={{ fontSize: 50, color: '#1976d2' }} />,
      title: 'Lightning Fast Check-in',
      description: 'Skip the line and check-in in under 2 minutes with our streamlined process.',
      color: '#1976d2',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <Security sx={{ fontSize: 50, color: '#2e7d32' }} />,
      title: 'Secure & Private',
      description: 'Your information is protected with enterprise-grade security protocols.',
      color: '#2e7d32',
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
    },
    {
      icon: <Support sx={{ fontSize: 50, color: '#ed6c02' }} />,
      title: '24/7 Support',
      description: 'Our team is always available to help you with any questions or concerns.',
      color: '#ed6c02',
      gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
    },
  ];

  const stats = [
    { number: 'TBD', label: 'Happy Guests', icon: <People />, color: '#1976d2' },
    { number: 'TBD', label: 'Hotel Partners', icon: <Hotel />, color: '#2e7d32' },
    { number: 'TBD', label: 'Uptime', icon: <TrendingUp />, color: '#ed6c02' },
    { number: 'TBD', label: 'Guest Rating', icon: <Star />, color: '#9c27b0' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Traveler',
      avatar: 'SJ',
      rating: 5,
      text: 'SwiftStay made my business trips so much smoother. No more waiting in line after a long flight!',
      company: 'TechCorp Inc.',
    },
    {
      name: 'Michael Chen',
      role: 'Frequent Guest',
      avatar: 'MC',
      rating: 5,
      text: 'The fastest check-in I\'ve ever experienced. The staff was amazed at how quickly I was in my room.',
      company: 'Global Consulting',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Family Traveler',
      avatar: 'ER',
      rating: 5,
      text: 'Perfect for families! We could check in while the kids were still in the car. Brilliant service!',
      company: 'Family Adventures',
    },
  ];

  const benefits = [
    'No more waiting in long lines',
    'Secure and private information handling',
    'Available 24/7 for your convenience',
    'Works with all major hotel chains',
    'Mobile-friendly interface',
    'Instant room key delivery',
  ];

  const nearestHotels = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'Downtown',
      city: 'New York',
      rating: 4.8,
      price: 299,
      distance: '0.2 miles',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
    },
    {
      id: 2,
      name: 'Oceanview Resort',
      location: 'Beachfront',
      city: 'Miami',
      rating: 4.6,
      price: 399,
      distance: '0.5 miles',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
      amenities: ['Beach Access', 'Pool', 'Bar', 'Gym'],
    },
    {
      id: 3,
      name: 'Business Center Hotel',
      location: 'Financial District',
      city: 'Chicago',
      rating: 4.4,
      price: 199,
      distance: '0.3 miles',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
      amenities: ['Business Center', 'WiFi', 'Restaurant', 'Gym'],
    },
    {
      id: 4,
      name: 'Mountain Lodge',
      location: 'Ski Resort',
      city: 'Aspen',
      rating: 4.9,
      price: 599,
      distance: '1.2 miles',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
      amenities: ['Ski Storage', 'Spa', 'Restaurant', 'Fireplace'],
    },
    {
      id: 5,
      name: 'Urban Boutique Hotel',
      location: 'Arts District',
      city: 'Los Angeles',
      rating: 4.3,
      price: 249,
      distance: '0.8 miles',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
      amenities: ['Art Gallery', 'Rooftop Bar', 'WiFi', 'Concierge'],
    },
  ];

  const navigationItems = [
    { label: 'Features', href: '#features', icon: <Info /> },
    { label: 'About', href: '/about-us', icon: <Business />, isNavigation: true },
    { label: 'Contact', href: '/contact', icon: <ContactSupport />, isNavigation: true },
    { label: 'Admin Portal', href: '/admin/login', icon: <AdminPanelSettings />, isButton: true },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Enhanced Navigation */}
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.15)' : '0 4px 30px rgba(0,0,0,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.3)',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ 
          minHeight: { xs: 64, md: 80 },
          px: { xs: 2, sm: 3, md: 4 },
          '@media (max-width:400px)': {
            px: 1,
          },
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                }}
              >
                <Hotel sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: '"Poppins", sans-serif',
                  letterSpacing: '-0.5px',
                }}
              >
                SwiftStay
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            gap: { md: 1, lg: 2 }, 
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            {navigationItems.map((item, index) => (
              item.isButton ? (
                <Button
                  key={index}
                  variant="contained"
                  startIcon={item.icon}
                  onClick={() => navigate(item.href)}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 3,
                    px: 3,
                    py: 1,
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
                  {item.label}
                </Button>
              ) : (
                <Button
                  key={index}
                  color="inherit"
                  sx={{ 
                    color: '#333', 
                    fontWeight: 500,
                    textTransform: 'none',
                    fontSize: '1rem',
                    px: 2,
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.1)',
                      color: '#667eea',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => {
                    if (item.isNavigation) {
                      navigate(item.href);
                    } else {
                      document.getElementById(item.href.substring(1)).scrollIntoView({ 
                        behavior: 'smooth' 
                      });
                    }
                  }}
                >
                  {item.label}
                </Button>
              )
            ))}
            

          </Box>
          
          <IconButton 
            sx={{ 
              display: { xs: 'block', md: 'none' },
              minWidth: '44px',
              minHeight: '44px',
            }}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#667eea' }}>
              Menu
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <List>
            {navigationItems.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (item.href.startsWith('/')) {
                    navigate(item.href);
                  } else {
                    document.getElementById(item.href.substring(1)).scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }
                }}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    bgcolor: 'rgba(102, 126, 234, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#667eea' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Enhanced Hero Section */}
      <Box
        sx={{
          pt: { xs: 8, md: 12 },
          pb: 8,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        

        
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
            <Grid item xs={12}>
              <Fade in={isVisible} timeout={1000}>
                <Box>
                  <Chip
                    label="Revolutionary Hotel Technology"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      mb: 3,
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      px: 2,
                      py: 1,
                      backdropFilter: 'blur(10px)',
                    }}
                  />
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 900,
                      mb: 3,
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                      '@media (max-width:400px)': {
                        fontSize: '1.75rem',
                      },
                    }}
                  >
                    Skip the Line,
                    <br />
                    <span style={{ 
                      background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      Stay in Style
                    </span>
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      fontWeight: 300,
                      lineHeight: 1.6,
                      maxWidth: 600,
                      fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                      '@media (max-width:400px)': {
                        fontSize: '0.9rem',
                      },
                    }}
                  >
                    Experience the future of hotel check-in. Our innovative self-service system 
                    eliminates waiting times and puts you in control of your stay from arrival to departure.
                  </Typography>
                  
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={{ xs: 1.5, sm: 2 }} 
                    sx={{ 
                      mb: 4,
                      width: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/hotels')}
                      sx={{
                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                        color: '#333',
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        borderRadius: 3,
                        textTransform: 'none',
                        boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FFC700, #FF8C00)',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 12px 35px rgba(255, 215, 0, 0.4)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Start Check-in Now
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/my-stay')}
                      sx={{
                        borderColor: 'rgba(255,255,255,0.5)',
                        color: 'white',
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 3,
                        textTransform: 'none',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255,255,255,0.1)',
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
                      startIcon={<Hotel />}
                      onClick={() => navigate('/trip-planner')}
                      sx={{
                        borderColor: 'rgba(255,255,255,0.5)',
                        color: 'white',
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 3,
                        textTransform: 'none',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255,255,255,0.1)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Trip Planner
                    </Button>
                  </Stack>
                  
                  {/* Enhanced Find Your Perfect Hotel Section */}
                  <Box sx={{ mt: 6, mb: 6 }}>
                    <Box textAlign="center" sx={{ mb: 4 }}>
                      <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: 'white' }}>
                        Find Your Perfect Hotel
                      </Typography>
                      <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 300 }}>
                        Search and discover hotels that match your preferences and budget
                      </Typography>
                    </Box>
                    
                    <Paper sx={{ 
                      p: 4, 
                      bgcolor: 'rgba(255,255,255,0.1)', 
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 4,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    }}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            placeholder="Where are you going?"
                            variant="outlined"
                            InputProps={{
                              startAdornment: <LocationOn sx={{ color: 'white', mr: 1 }} />,
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                bgcolor: 'rgba(255,255,255,0.1)',
                                borderRadius: 2,
                                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                              },
                              '& .MuiInputBase-input': {
                                color: 'white',
                                '&::placeholder': {
                                  color: 'rgba(255,255,255,0.7)',
                                  opacity: 1,
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <TextField
                            fullWidth
                            placeholder="Check-in"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                bgcolor: 'rgba(255,255,255,0.1)',
                                borderRadius: 2,
                                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                              },
                              '& .MuiInputBase-input': {
                                color: 'white',
                                '&::placeholder': {
                                  color: 'rgba(255,255,255,0.7)',
                                  opacity: 1,
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <TextField
                            fullWidth
                            placeholder="Check-out"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                bgcolor: 'rgba(255,255,255,0.1)',
                                borderRadius: 2,
                                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                              },
                              '& .MuiInputBase-input': {
                                color: 'white',
                                '&::placeholder': {
                                  color: 'rgba(255,255,255,0.7)',
                                  opacity: 1,
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <TextField
                            fullWidth
                            placeholder="Guests"
                            variant="outlined"
                            select
                            defaultValue="2"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                bgcolor: 'rgba(255,255,255,0.1)',
                                borderRadius: 2,
                                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                              },
                              '& .MuiInputBase-input': {
                                color: 'white',
                              },
                            }}
                          >
                            <MenuItem value="1">1 Guest</MenuItem>
                            <MenuItem value="2">2 Guests</MenuItem>
                            <MenuItem value="3">3 Guests</MenuItem>
                            <MenuItem value="4">4 Guests</MenuItem>
                            <MenuItem value="5">5+ Guests</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={() => navigate('/hotels')}
                            sx={{
                              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                              color: '#333',
                              py: 1.5,
                              fontSize: '1.1rem',
                              fontWeight: 600,
                              borderRadius: 2,
                              textTransform: 'none',
                              boxShadow: '0 6px 20px rgba(255, 215, 0, 0.3)',
                              '&:hover': {
                                background: 'linear-gradient(45deg, #FFC700, #FF8C00)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)',
                              },
                              transition: 'all 0.3s ease',
                            }}
                          >
                            Search Hotels
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                  
                  {/* Enhanced Nearest Hotels Section */}
                  <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'white' }}>
                      Nearest Hotels
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
                      {nearestHotels.map((hotel, index) => (
                        <Card
                          key={hotel.id}
                          sx={{
                            minWidth: 300,
                            bgcolor: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            borderRadius: 3,
                            overflow: 'hidden',
                            '&:hover': {
                              transform: 'translateY(-8px) scale(1.02)',
                              bgcolor: 'rgba(255,255,255,0.15)',
                              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                            },
                          }}
                          onClick={() => navigate('/hotels')}
                        >
                          <CardMedia
                            component="img"
                            height="160"
                            image={hotel.image}
                            alt={hotel.name}
                            sx={{ objectFit: 'cover' }}
                          />
                          <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 1 }}>
                              {hotel.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <LocationOn sx={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', mr: 0.5 }} />
                              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                {hotel.location}, {hotel.city}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Star sx={{ fontSize: 16, color: '#FFD700', mr: 0.5 }} />
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                  {hotel.rating}
                                </Typography>
                              </Box>
                              <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 700 }}>
                                ${hotel.price}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                                <Chip
                                  key={idx}
                                  label={amenity}
                                  size="small"
                                  sx={{
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                  }}
                                />
                              ))}
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: '#4CAF50' }} />
                      <Typography variant="body2">No Registration Required</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: '#4CAF50' }} />
                      <Typography variant="body2">Instant Access</Typography>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
        
        {/* Enhanced Scroll Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite',
          }}
        >
          <KeyboardArrowDown sx={{ fontSize: 40, opacity: 0.7 }} />
        </Box>
      </Box>

      {/* Enhanced Stats Section */}
      <Box sx={{ py: 8, bgcolor: 'white', position: 'relative' }}>
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Grow in={isVisible} timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 4,
                      height: '100%',
                      bgcolor: 'transparent',
                      boxShadow: 'none',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: 3,
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: stat.color,
                      },
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                        borderColor: stat.color,
                      },
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <CardContent>
                      <Box 
                        sx={{ 
                          color: stat.color, 
                          mb: 3,
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              background: `linear-gradient(135deg, ${stat.color}30, ${stat.color}20)`,
                            },
                          }}
                        >
                          {stat.icon}
                        </Box>
                      </Box>
                      <Typography
                        variant="h2"
                        sx={{
                          fontWeight: 800,
                          color: stat.color,
                          mb: 1,
                          fontSize: { xs: '2rem', md: '2.5rem' },
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: '1rem',
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="features">
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Chip
            label="Why Choose Us"
            sx={{
              bgcolor: 'rgba(102, 126, 234, 0.1)',
              color: '#667eea',
              mb: 3,
              fontWeight: 600,
              fontSize: '0.9rem',
              px: 2,
              py: 1,
            }}
          />
          <Typography
            variant="h2"
            sx={{ 
              mb: 3, 
              fontWeight: 800, 
              color: '#333',
              fontSize: { xs: '2.5rem', md: '3rem' },
              letterSpacing: '-0.02em',
            }}
          >
            Why Choose SwiftStay?
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Experience the perfect blend of technology and hospitality that puts you in control
          </Typography>
        </Box>
        
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Grow in={isVisible} timeout={1000 + index * 200}>
                <Card
                  sx={{
                    height: '100%',
                    p: 4,
                    textAlign: 'center',
                    transition: 'all 0.4s ease-in-out',
                    cursor: 'pointer',
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: feature.gradient,
                    },
                    '&:hover': {
                      transform: 'translateY(-16px)',
                      boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent>
                    <Box 
                      sx={{ 
                        mb: 4,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          background: feature.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 8px 25px ${feature.color}40`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.1) rotate(5deg)',
                          },
                        }}
                      >
                        {feature.icon}
                      </Box>
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 700,
                        color: '#333',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      sx={{ 
                        lineHeight: 1.7,
                        fontSize: '1rem',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Enhanced Benefits Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 8, position: 'relative' }}>
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.02,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip
                label="Perfect Stay Experience"
                sx={{
                  bgcolor: 'rgba(102, 126, 234, 0.1)',
                  color: '#667eea',
                  mb: 3,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  px: 2,
                  py: 1,
                }}
              />
              <Typography 
                variant="h2" 
                sx={{ 
                  mb: 4, 
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                Everything You Need for a Perfect Stay
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ 
                  mb: 4, 
                  lineHeight: 1.7,
                  fontWeight: 400,
                }}
              >
                From the moment you arrive to the time you check out, SwiftStay ensures your hotel experience is seamless and enjoyable.
              </Typography>
              <Grid container spacing={2}>
                {benefits.map((benefit, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2, 
                        mb: 2,
                        p: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'rgba(102, 126, 234, 0.05)',
                          transform: 'translateX(5px)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: '#4CAF50',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <CheckCircle sx={{ color: 'white', fontSize: 18 }} />
                      </Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 500,
                          fontSize: '1rem',
                        }}
                      >
                        {benefit}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: 'white',
                  p: 5,
                  borderRadius: 4,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -10,
                    left: -10,
                    right: -10,
                    bottom: -10,
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    borderRadius: 4,
                    zIndex: -1,
                    opacity: 0.05,
                  },
                }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 4, 
                    fontWeight: 700,
                    color: '#333',
                  }}
                >
                  How It Works
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {[
                    { step: '1', title: 'Enter Booking Details', desc: 'Provide your booking number and personal information' },
                    { step: '2', title: 'Verify Information', desc: 'Confirm your room assignment and preferences' },
                    { step: '3', title: 'Complete Check-in', desc: 'Receive your room key and start your stay' },
                  ].map((item, index) => (
                    <Box 
                      key={index} 
                      sx={{ 
                        display: 'flex', 
                        gap: 3, 
                        alignItems: 'flex-start',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateX(5px)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          flexShrink: 0,
                          fontSize: '1.2rem',
                          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                        }}
                      >
                        {item.step}
                      </Box>
                      <Box>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600, 
                            mb: 1,
                            color: '#333',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ lineHeight: 1.6 }}
                        >
                          {item.desc}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Chip
            label="Guest Reviews"
            sx={{
              bgcolor: 'rgba(102, 126, 234, 0.1)',
              color: '#667eea',
              mb: 3,
              fontWeight: 600,
              fontSize: '0.9rem',
              px: 2,
              py: 1,
            }}
          />
          <Typography 
            variant="h2" 
            sx={{ 
              mb: 3, 
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3rem' },
              letterSpacing: '-0.02em',
            }}
          >
            What Our Guests Say
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Join thousands of satisfied guests who have experienced the SwiftStay difference
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Grow in={isVisible} timeout={1000 + index * 200}>
                <Card
                  sx={{
                    p: 4,
                    height: '100%',
                    transition: 'all 0.4s ease',
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    },
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                        <Star key={i} sx={{ color: '#FFD700', fontSize: 20 }} />
                      ))}
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 3, 
                        fontStyle: 'italic', 
                        lineHeight: 1.7,
                        fontSize: '1rem',
                        color: '#555',
                      }}
                    >
                      "{testimonial.text}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: '#667eea', 
                          fontWeight: 600,
                          width: 48,
                          height: 48,
                        }}
                      >
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            color: '#333',
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontWeight: 500 }}
                        >
                          {testimonial.role}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: '0.8rem' }}
                        >
                          {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Enhanced About Section */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="about">
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Chip
            label="About Us"
            sx={{
              bgcolor: 'rgba(102, 126, 234, 0.1)',
              color: '#667eea',
              mb: 3,
              fontWeight: 600,
              fontSize: '0.9rem',
              px: 2,
              py: 1,
            }}
          />
          <Typography 
            variant="h2" 
            sx={{ 
              mb: 3, 
              fontWeight: 800, 
              color: '#333',
              fontSize: { xs: '2.5rem', md: '3rem' },
              letterSpacing: '-0.02em',
            }}
          >
            About SwiftStay
          </Typography>
        </Box>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 3, 
                fontWeight: 700,
                color: '#333',
              }}
            >
              Revolutionizing Hotel Check-in
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3, 
                lineHeight: 1.8,
                fontSize: '1.1rem',
                color: '#555',
              }}
            >
              SwiftStay was founded with a simple mission: to eliminate the frustration of long check-in lines and make hotel stays more enjoyable from the moment guests arrive.
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3, 
                lineHeight: 1.8,
                fontSize: '1.1rem',
                color: '#555',
              }}
            >
              Our innovative self-check-in system allows guests to complete their check-in process in under 2 minutes, giving them more time to relax and enjoy their stay.
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                lineHeight: 1.8,
                fontSize: '1.1rem',
                color: '#555',
              }}
            >
              With partnerships across 50+ hotels and over 10,000 satisfied guests, SwiftStay is leading the future of hospitality technology.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 300,
                  height: 300,
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    right: -20,
                    bottom: -20,
                    border: '2px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '50%',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: -40,
                    left: -40,
                    right: -40,
                    bottom: -40,
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    borderRadius: '50%',
                  },
                }}
              >
                <Hotel sx={{ fontSize: 120, color: '#667eea' }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Enhanced CTA Section */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            },
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 3, 
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Ready to Experience SwiftStay?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4, 
              opacity: 0.9,
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Join thousands of guests who have already discovered the convenience of self-check-in.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate('/checkin')}
            sx={{
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              color: '#333',
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 700,
              borderRadius: 3,
              textTransform: 'none',
              boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FFC700, #FF8C00)',
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 35px rgba(255, 215, 0, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Get Started Now
          </Button>
        </Paper>
      </Container>

      {/* Enhanced Contact Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 8, position: 'relative' }} id="contact">
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.02,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box textAlign="center" sx={{ mb: 6 }}>
            <Chip
              label="Get In Touch"
              sx={{
                bgcolor: 'rgba(102, 126, 234, 0.1)',
                color: '#667eea',
                mb: 3,
                fontWeight: 600,
                fontSize: '0.9rem',
                px: 2,
                py: 1,
              }}
            />
            <Typography 
              variant="h2" 
              sx={{ 
                mb: 3, 
                fontWeight: 800, 
                color: '#333',
                fontSize: { xs: '2.5rem', md: '3rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Contact Us
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 700,
                  color: '#333',
                }}
              >
                Get in Touch
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3,
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  color: '#555',
                }}
              >
                Have questions about SwiftStay? We're here to help!
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(102, 126, 234, 0.05)',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: '#667eea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Email sx={{ color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography 
                      variant="body1" 
                      color="primary.main"
                      sx={{ fontWeight: 600 }}
                    >
                      support@swiftstay.com
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email Support
                    </Typography>
                  </Box>
                </Box>

                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(102, 126, 234, 0.05)',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: '#667eea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <LocationOn sx={{ color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography 
                      variant="body1"
                      sx={{ fontWeight: 600, color: '#333' }}
                    >
                      University of Maryland
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      College Park, MD 20742
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card 
                sx={{ 
                  p: 4, 
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 3, 
                    fontWeight: 700,
                    color: '#333',
                  }}
                >
                  Send us a Message
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 4,
                    lineHeight: 1.6,
                  }}
                >
                  We'll get back to you within 24 hours.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large" 
                  fullWidth 
                  onClick={() => navigate('/contact')}
                  sx={{ 
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                    color: '#333',
                    borderRadius: 3,
                    textTransform: 'none',
                    boxShadow: '0 6px 20px rgba(255, 215, 0, 0.3)',
                    py: 1.5,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FFC700, #FF8C00)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Contact Support
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Footer */}
      <Box sx={{ bgcolor: '#333', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Hotel sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  SwiftStay
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.8,
                  lineHeight: 1.6,
                }}
              >
                Revolutionizing the hotel experience with modern, efficient self-check-in technology.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3,
                  fontWeight: 600,
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.8, 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      opacity: 1, 
                      color: '#667eea',
                      transform: 'translateX(5px)',
                    }
                  }}
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                >
                  Features
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.8, 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      opacity: 1, 
                      color: '#667eea',
                      transform: 'translateX(5px)',
                    }
                  }}
                  onClick={() => navigate('/about-us')}
                >
                  About Us
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.8, 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      opacity: 1, 
                      color: '#667eea',
                      transform: 'translateX(5px)',
                    }
                  }}
                  onClick={() => navigate('/contact')}
                >
                  Contact
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3,
                  fontWeight: 600,
                }}
              >
                Contact Info
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.8,
                  mb: 1,
                }}
              >
                support@swiftstay.com
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.8,
                }}
              >
                University of Maryland<br />
                College Park, MD 20742
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.6,
                fontSize: '0.9rem',
              }}
            >
              © 2025 SwiftStay. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>


    </Box>
  );
};

export default HomePage; 