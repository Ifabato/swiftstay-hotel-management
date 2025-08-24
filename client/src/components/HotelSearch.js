import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  InputAdornment,
  IconButton,
  Paper,
  Divider,
  Stack,
  Fade,
  Grow,
} from '@mui/material';
import {
  Search,
  LocationOn,
  Star,
  Hotel,
  Wifi,
  Pool,
  Restaurant,
  FitnessCenter,
  Spa,
  Pets,
  LocalParking,
  BusinessCenter,
  LocalBar,
  RoomService,
  AcUnit,
  Tv,
  ArrowBack,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HotelSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([50, 600]);
  const [rating, setRating] = useState(0);
  const [amenities, setAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('rating');

  // Sample hotel data
  const hotels = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'Downtown',
      city: 'New York',
      rating: 4.8,
      price: 299,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      amenities: ['wifi', 'pool', 'restaurant', 'fitness', 'spa'],
      description: 'Luxury hotel in the heart of downtown with stunning city views.',
    },
    {
      id: 2,
      name: 'Oceanview Resort',
      location: 'Beachfront',
      city: 'Miami',
      rating: 4.6,
      price: 399,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
      amenities: ['wifi', 'pool', 'restaurant', 'spa', 'parking'],
      description: 'Beachfront resort with private beach access and ocean views.',
    },
    {
      id: 3,
      name: 'Business Center Hotel',
      location: 'Financial District',
      city: 'Chicago',
      rating: 4.4,
      price: 199,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
      amenities: ['wifi', 'business', 'restaurant', 'fitness', 'parking'],
      description: 'Perfect for business travelers with conference facilities.',
    },
    {
      id: 4,
      name: 'Mountain Lodge',
      location: 'Ski Resort',
      city: 'Aspen',
      rating: 4.9,
      price: 599,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
      amenities: ['wifi', 'spa', 'restaurant', 'fitness', 'parking'],
      description: 'Luxury mountain lodge with ski-in/ski-out access.',
    },
    {
      id: 5,
      name: 'Urban Boutique Hotel',
      location: 'Arts District',
      city: 'Los Angeles',
      rating: 4.3,
      price: 249,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
      amenities: ['wifi', 'restaurant', 'bar', 'room-service'],
      description: 'Trendy boutique hotel in the vibrant arts district.',
    },
    {
      id: 6,
      name: 'Historic Inn',
      location: 'Old Town',
      city: 'Boston',
      rating: 4.7,
      price: 349,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      amenities: ['wifi', 'restaurant', 'parking', 'pets'],
      description: 'Charming historic inn with modern amenities.',
    },
  ];

  const amenityOptions = [
    { value: 'wifi', label: 'WiFi', icon: <Wifi /> },
    { value: 'pool', label: 'Pool', icon: <Pool /> },
    { value: 'restaurant', label: 'Restaurant', icon: <Restaurant /> },
    { value: 'fitness', label: 'Fitness Center', icon: <FitnessCenter /> },
    { value: 'spa', label: 'Spa', icon: <Spa /> },
    { value: 'parking', label: 'Parking', icon: <LocalParking /> },
    { value: 'business', label: 'Business Center', icon: <BusinessCenter /> },
    { value: 'bar', label: 'Bar', icon: <LocalBar /> },
    { value: 'room-service', label: 'Room Service', icon: <RoomService /> },
    { value: 'pets', label: 'Pet Friendly', icon: <Pets /> },
  ];

  const getAmenityIcon = (amenity) => {
    const option = amenityOptions.find(a => a.value === amenity);
    return option ? option.icon : <Hotel />;
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !location || hotel.city === location;
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    const matchesRating = rating === 0 || hotel.rating >= rating;
    const matchesAmenities = amenities.length === 0 || 
                           amenities.every(amenity => hotel.amenities.includes(amenity));
    
    return matchesSearch && matchesLocation && matchesPrice && matchesRating && matchesAmenities;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleHotelSelect = (hotel) => {
    // For now, just show hotel details - in real implementation, this would go to hotel's website
    alert(`This would redirect to ${hotel.name}'s website for reservations. For demo purposes, you can proceed to check-in.`);
  };

  const handleCheckInToHotel = (hotel) => {
    // Navigate to check-in page with hotel info
    navigate('/checkin', { state: { selectedHotel: hotel } });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 4,
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
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
            <IconButton 
              onClick={() => navigate('/')}
              sx={{ color: 'white', mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Find Your Perfect Hotel
            </Typography>
          </Box>
          
          {/* Search Bar */}
          <Paper sx={{ 
            p: { xs: 2, md: 3 }, 
            bgcolor: 'rgba(255,255,255,0.95)', 
            backdropFilter: 'blur(10px)',
            borderRadius: { xs: 2, md: 3 },
          }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      minHeight: { xs: '48px', md: '56px' },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Location</InputLabel>
                  <Select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    label="Location"
                    sx={{
                      '& .MuiInputBase-root': {
                        minHeight: { xs: '48px', md: '56px' },
                      },
                    }}
                  >
                    <MenuItem value="">All Locations</MenuItem>
                    <MenuItem value="New York">New York</MenuItem>
                    <MenuItem value="Miami">Miami</MenuItem>
                    <MenuItem value="Chicago">Chicago</MenuItem>
                    <MenuItem value="Aspen">Aspen</MenuItem>
                    <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                    <MenuItem value="Boston">Boston</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                    sx={{
                      '& .MuiInputBase-root': {
                        minHeight: { xs: '48px', md: '56px' },
                      },
                    }}
                  >
                    <MenuItem value="rating">Highest Rating</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: '#FFD700',
                    color: '#333',
                    fontWeight: 600,
                    minHeight: { xs: '48px', md: '56px' },
                    '&:hover': {
                      bgcolor: '#FFC700',
                    },
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Filters Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Filters
              </Typography>
              
              {/* Price Range */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  min={50}
                  max={600}
                  sx={{ color: '#667eea' }}
                />
              </Box>

              {/* Rating Filter */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Minimum Rating
                </Typography>
                <Rating
                  value={rating}
                  onChange={(e, newValue) => setRating(newValue)}
                  size="large"
                />
              </Box>

              {/* Amenities */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Amenities
                </Typography>
                <Stack spacing={1}>
                  {amenityOptions.map((amenity) => (
                    <Box key={amenity.value} sx={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        id={amenity.value}
                        checked={amenities.includes(amenity.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAmenities([...amenities, amenity.value]);
                          } else {
                            setAmenities(amenities.filter(a => a !== amenity.value));
                          }
                        }}
                        style={{ marginRight: 8 }}
                      />
                      <label htmlFor={amenity.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        {amenity.icon}
                        <span style={{ marginLeft: 8 }}>{amenity.label}</span>
                      </label>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* Hotel Results */}
          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {sortedHotels.length} hotels found
              </Typography>
            </Box>
            
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {sortedHotels.map((hotel, index) => (
                <Grid item xs={12} key={hotel.id}>
                  <Grow in timeout={500 + index * 100}>
                    <Card 
                      sx={{ 
                        display: { xs: 'block', md: 'flex' },
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                      onClick={() => handleHotelSelect(hotel)}
                    >
                      <CardMedia
                        component="img"
                        sx={{ 
                          width: { xs: '100%', md: 200 }, 
                          height: { xs: 200, md: 150 },
                          objectFit: 'cover',
                        }}
                        image={hotel.image}
                        alt={hotel.name}
                      />
                      <CardContent sx={{ 
                        flex: 1, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        p: { xs: 2, md: 3 },
                      }}>
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {hotel.name}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#667eea', fontWeight: 700 }}>
                              ${hotel.price}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LocationOn sx={{ fontSize: 16, color: '#666', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              {hotel.location}, {hotel.city}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Rating value={hotel.rating} readOnly size="small" />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              {hotel.rating} ({Math.floor(Math.random() * 200) + 50} reviews)
                            </Typography>
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {hotel.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {hotel.amenities.slice(0, 4).map((amenity) => (
                              <Chip
                                key={amenity}
                                icon={getAmenityIcon(amenity)}
                                label={amenityOptions.find(a => a.value === amenity)?.label}
                                size="small"
                                sx={{ bgcolor: '#f0f0f0' }}
                              />
                            ))}
                            {hotel.amenities.length > 4 && (
                              <Chip
                                label={`+${hotel.amenities.length - 4} more`}
                                size="small"
                                sx={{ bgcolor: '#f0f0f0' }}
                              />
                            )}
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            per night
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleHotelSelect(hotel);
                              }}
                              sx={{
                                borderColor: '#667eea',
                                color: '#667eea',
                                fontWeight: 600,
                                '&:hover': {
                                  borderColor: '#5a6fd8',
                                  bgcolor: 'rgba(102, 126, 234, 0.1)',
                                },
                              }}
                            >
                              Make Reservation
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCheckInToHotel(hotel);
                              }}
                              sx={{
                                bgcolor: '#FFD700',
                                color: '#333',
                                fontWeight: 600,
                                '&:hover': {
                                  bgcolor: '#FFC700',
                                },
                              }}
                            >
                              Check-in
                            </Button>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HotelSearch; 