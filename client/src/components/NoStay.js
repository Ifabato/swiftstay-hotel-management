import React from 'react';
import {
  Container, Paper, Typography, Box, Button, Alert,
} from '@mui/material';
import {
  Hotel, Search, ArrowBack,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NoStay = () => {
  const navigate = useNavigate();

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
            No Active Stay
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            You're not currently checked into any hotel
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md">
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ mb: 4 }}>
            <Hotel sx={{ fontSize: 80, color: '#667eea', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              No Active Stay Found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              It looks like you're not currently checked into any hotel. To view your stay information, 
              you'll need to find a hotel and complete the check-in process first.
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
            <Typography variant="body2">
              <strong>How it works:</strong>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              1. Find your perfect hotel from our selection
            </Typography>
            <Typography variant="body2">
              2. Complete the check-in process with your details
            </Typography>
            <Typography variant="body2">
              3. Access your stay information and manage your reservation
            </Typography>
          </Alert>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Search />}
              onClick={() => navigate('/hotels')}
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
              Find Hotels
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<Search />}
              onClick={() => navigate('/find-my-stay')}
              sx={{
                bgcolor: '#4CAF50',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#45a049',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Find My Stay
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/')}
              sx={{
                borderColor: '#667eea',
                color: '#667eea',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#5a6fd8',
                  bgcolor: 'rgba(102, 126, 234, 0.1)',
                },
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default NoStay; 