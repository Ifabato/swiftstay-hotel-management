import React, { useState } from 'react';
import {
  Container, Typography, Box, Card, CardContent, Grid, Button, TextField, Chip, Rating, Paper, Divider, List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';
import {
  LocationOn, Restaurant, Event, Attractions, Hotel, Directions, Star, Phone, Email, AccessTime, ArrowBack, Search, FilterList,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TripPlanner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', label: 'All', icon: <LocationOn /> },
    { id: 'attractions', label: 'Attractions', icon: <Attractions /> },
    { id: 'restaurants', label: 'Restaurants', icon: <Restaurant /> },
    { id: 'events', label: 'Events', icon: <Event /> },
    { id: 'landmarks', label: 'Landmarks', icon: <Attractions /> },
  ];

  const attractions = [
    {
      id: 1,
      name: 'Central Park',
      category: 'attractions',
      description: 'Iconic urban park with walking trails, lakes, and cultural attractions',
      rating: 4.8,
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      address: 'Central Park, New York, NY',
      hours: '6:00 AM - 10:00 PM',
      phone: '+1 (212) 310-6600',
    },
    {
      id: 2,
      name: 'Times Square',
      category: 'landmarks',
      description: 'Famous commercial intersection and entertainment hub',
      rating: 4.5,
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400',
      address: 'Times Square, New York, NY',
      hours: '24/7',
      phone: '+1 (212) 869-1890',
    },
    {
      id: 3,
      name: 'Statue of Liberty',
      category: 'landmarks',
      description: 'Iconic symbol of freedom and democracy',
      rating: 4.7,
      price: '$24.50',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400',
      address: 'Liberty Island, New York, NY',
      hours: '8:30 AM - 4:00 PM',
      phone: '+1 (212) 363-3200',
    },
  ];

  const restaurants = [
    {
      id: 4,
      name: 'Le Bernardin',
      category: 'restaurants',
      description: 'World-renowned seafood restaurant with 3 Michelin stars',
      rating: 4.9,
      price: '$$$',
      cuisine: 'French Seafood',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
      address: '155 W 51st St, New York, NY',
      hours: '5:00 PM - 10:30 PM',
      phone: '+1 (212) 554-1515',
    },
    {
      id: 5,
      name: 'Katz\'s Delicatessen',
      category: 'restaurants',
      description: 'Famous Jewish deli known for pastrami sandwiches',
      rating: 4.6,
      price: '$$',
      cuisine: 'Jewish Deli',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
      address: '205 E Houston St, New York, NY',
      hours: '8:00 AM - 10:45 PM',
      phone: '+1 (212) 254-2246',
    },
    {
      id: 6,
      name: 'Joe\'s Pizza',
      category: 'restaurants',
      description: 'Classic New York pizza joint since 1975',
      rating: 4.4,
      price: '$',
      cuisine: 'Pizza',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
      address: '123 Carmine St, New York, NY',
      hours: '11:00 AM - 4:00 AM',
      phone: '+1 (212) 366-1182',
    },
  ];

  const events = [
    {
      id: 7,
      name: 'Broadway Show: Hamilton',
      category: 'events',
      description: 'Tony Award-winning musical about Alexander Hamilton',
      rating: 4.9,
      price: '$99-$199',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      address: 'Richard Rodgers Theatre, 226 W 46th St, New York, NY',
      date: 'Various dates',
      phone: '+1 (212) 239-6200',
    },
    {
      id: 8,
      name: 'Yankees Game',
      category: 'events',
      description: 'Watch the New York Yankees play at Yankee Stadium',
      rating: 4.7,
      price: '$25-$150',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      address: 'Yankee Stadium, 1 E 161st St, Bronx, NY',
      date: 'Check schedule',
      phone: '+1 (718) 293-4300',
    },
  ];

  const allItems = [...attractions, ...restaurants, ...events];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'attractions':
        return <Attractions />;
      case 'restaurants':
        return <Restaurant />;
      case 'events':
        return <Event />;
      case 'landmarks':
        return <Attractions />;
      default:
        return <LocationOn />;
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
            Trip Planner
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Discover amazing places, restaurants, and events in New York
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Search and Filter */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search places, restaurants, events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {categories.map((category) => (
                  <Chip
                    key={category.id}
                    icon={category.icon}
                    label={category.label}
                    onClick={() => setSelectedCategory(category.id)}
                    color={selectedCategory === category.id ? 'primary' : 'default'}
                    variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Results */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          {filteredItems.length} places found
        </Typography>

        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box
                  sx={{
                    height: 200,
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  <Chip
                    icon={getCategoryIcon(item.category)}
                    label={item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      bgcolor: 'rgba(255,255,255,0.9)',
                    }}
                  />
                  <Chip
                    label={item.price}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      bgcolor: 'primary.main',
                      color: 'white',
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={item.rating} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {item.rating}
                    </Typography>
                  </Box>

                  {item.cuisine && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Cuisine: {item.cuisine}
                    </Typography>
                  )}

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {item.address}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTime sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {item.hours || item.date}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Phone sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {item.phone}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Directions />}
                      fullWidth
                    >
                      Get Directions
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Phone />}
                      fullWidth
                    >
                      Call
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredItems.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No places found matching your search criteria
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              sx={{ mt: 2 }}
            >
              Clear Filters
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TripPlanner; 