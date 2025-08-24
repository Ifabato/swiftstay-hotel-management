import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import {
  AdminPanelSettings,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowBack,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: 'admin',
    password: 'admin123',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    // Demo authentication - check against hardcoded credentials
    if (formData.username === 'admin' && formData.password === 'admin123') {
      // Simulate API delay
      setTimeout(() => {
        const demoUser = {
          id: 1,
          username: 'admin',
          name: 'Administrator',
          role: 'admin',
          email: 'admin@swiftstay.com'
        };
        const demoToken = 'demo-jwt-token-' + Date.now();
        
        login(demoUser, demoToken);
        navigate('/admin/dashboard');
        setLoading(false);
      }, 1000);
    } else {
      setError('Invalid username or password. Please use demo credentials: admin / admin123');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 6,
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
              SwiftStay Admin Portal
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 300 }}>
              Hotel Management System
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 6, borderRadius: 4, bgcolor: 'white' }}>
          <Box textAlign="center" mb={4}>
            <AdminPanelSettings sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              Admin Login
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Access the hotel management system
            </Typography>
          </Box>

        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Username"
                value={formData.username}
                onChange={handleInputChange('username')}
                required
                margin="normal"
                autoComplete="username"
                autoFocus
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange('password')}
                required
                margin="normal"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ minWidth: 'auto', p: 1 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Lock />}
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  bgcolor: '#FFD700',
                  color: '#333',
                  fontWeight: 700,
                  '&:hover': {
                    bgcolor: '#FFC700',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2" color="textSecondary">
            Demo Credentials: admin / admin123
          </Typography>
        </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin; 