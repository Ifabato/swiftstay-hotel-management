import React, { useState, useEffect } from 'react';

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  Refresh,
  Download,
  BarChart,
  PieChart,
  Timeline,
  ArrowBack,
} from '@mui/icons-material';

const Revenue = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedHotel, setSelectedHotel] = useState('all');
  const [revenueData, setRevenueData] = useState({
    today: {
      total: 0,
      previous: 0,
      change: '0%',
      isPositive: false,
      breakdown: [
        { category: 'Room Revenue', amount: 0, percentage: 0 },
        { category: 'Food & Beverage', amount: 0, percentage: 0 },
        { category: 'Spa Services', amount: 0, percentage: 0 },
        { category: 'Other Services', amount: 0, percentage: 0 },
      ],
      transactions: []
    },
    week: {
      total: 0,
      previous: 0,
      change: '0%',
      isPositive: false,
    },
    month: {
      total: 0,
      previous: 0,
      change: '0%',
      isPositive: false,
    }
  });

  // Calculate real revenue from checked-in guests
  useEffect(() => {
    const calculateRevenue = () => {
      const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
      
      // Calculate room revenue from checked-in guests
      const roomRevenue = currentlyInHouse.reduce((total, guest) => {
        // Get room price based on room type
        let roomPrice = 299; // Default price
        if (guest.roomType === 'King Bed Suite') roomPrice = 499;
        else if (guest.roomType === '1 Double Bed Guest Room') roomPrice = 199;
        else if (guest.roomType === '2 Double Bed') roomPrice = 349;
        else if (guest.roomType === '1 Double Suite') roomPrice = 399;
        
        return total + roomPrice;
      }, 0);

      // Calculate other revenue (simulated)
      const foodBeverage = roomRevenue * 0.15; // 15% of room revenue
      const spaServices = roomRevenue * 0.08; // 8% of room revenue
      const otherServices = roomRevenue * 0.05; // 5% of room revenue
      
      const totalRevenue = roomRevenue + foodBeverage + spaServices + otherServices;

      // Create transactions for each guest
      const transactions = currentlyInHouse.map((guest, index) => {
        let roomPrice = 299;
        if (guest.roomType === 'King Bed Suite') roomPrice = 499;
        else if (guest.roomType === '1 Double Bed Guest Room') roomPrice = 199;
        else if (guest.roomType === '2 Double Bed') roomPrice = 349;
        else if (guest.roomType === '1 Double Suite') roomPrice = 399;

        return {
          id: index + 1,
          guest: guest.guestName,
          room: guest.roomNumber,
          amount: roomPrice,
          time: new Date(guest.checkInTime).toLocaleTimeString(),
          type: 'Check-in'
        };
      });

      const updatedRevenueData = {
        today: {
          total: totalRevenue,
          previous: 0,
          change: totalRevenue > 0 ? '+100%' : '0%',
          isPositive: totalRevenue > 0,
          breakdown: [
            { category: 'Room Revenue', amount: roomRevenue, percentage: roomRevenue > 0 ? Math.round((roomRevenue / totalRevenue) * 100) : 0 },
            { category: 'Food & Beverage', amount: foodBeverage, percentage: foodBeverage > 0 ? Math.round((foodBeverage / totalRevenue) * 100) : 0 },
            { category: 'Spa Services', amount: spaServices, percentage: spaServices > 0 ? Math.round((spaServices / totalRevenue) * 100) : 0 },
            { category: 'Other Services', amount: otherServices, percentage: otherServices > 0 ? Math.round((otherServices / totalRevenue) * 100) : 0 },
          ],
          transactions: transactions
        },
        week: {
          total: totalRevenue,
          previous: 0,
          change: totalRevenue > 0 ? '+100%' : '0%',
          isPositive: totalRevenue > 0,
        },
        month: {
          total: totalRevenue,
          previous: 0,
          change: totalRevenue > 0 ? '+100%' : '0%',
          isPositive: totalRevenue > 0,
        }
      };

      setRevenueData(updatedRevenueData);
    };

    calculateRevenue();

    // Listen for in-house updates to recalculate revenue
    const handleInHouseUpdate = () => {
      calculateRevenue();
    };

    window.addEventListener('inHouseUpdated', handleInHouseUpdate);

    return () => {
      window.removeEventListener('inHouseUpdated', handleInHouseUpdate);
    };
  }, []);

  const hotels = [
    { id: 'all', name: 'All Hotels' },
    { id: 'hotel1', name: 'Grand Plaza Hotel' },
    { id: 'hotel2', name: 'Oceanview Resort' },
    { id: 'hotel3', name: 'Mountain Lodge' },
  ];

  const periods = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
  ];

  const currentData = revenueData[selectedPeriod];

  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: '#fafbfc' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => window.dispatchEvent(new CustomEvent('adminBackToDashboard'))}
              sx={{ 
                mr: 2, 
                p: 1,
                border: '1px solid #e0e0e0',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  borderColor: '#999',
                }
              }}
            >
              <ArrowBack />
            </IconButton>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#2c3e50', mb: 1 }}>
                Revenue Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Track and analyze your hotel's financial performance
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() => alert('Downloading revenue report...')}
              sx={{ 
                borderColor: '#e0e0e0',
                color: '#666',
                '&:hover': {
                  borderColor: '#999',
                  backgroundColor: '#f5f5f5',
                }
              }}
            >
              Export Report
            </Button>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => alert('Refreshing revenue data...')}
              sx={{ 
                borderColor: '#4CAF50',
                color: '#4CAF50',
                '&:hover': {
                  borderColor: '#45a049',
                  backgroundColor: '#f0f8f0',
                }
              }}
            >
              Refresh
            </Button>
          </Stack>
        </Box>

        {/* Filters */}
        <Card sx={{ 
          mb: 4, 
          background: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #e0e0e0'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Time Period</InputLabel>
                  <Select
                    value={selectedPeriod}
                    label="Time Period"
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    {periods.map((period) => (
                      <MenuItem key={period.value} value={period.value}>
                        {period.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Hotel</InputLabel>
                  <Select
                    value={selectedHotel}
                    label="Hotel"
                    onChange={(e) => setSelectedHotel(e.target.value)}
                  >
                    {hotels.map((hotel) => (
                      <MenuItem key={hotel.id} value={hotel.id}>
                        {hotel.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Search Transactions"
                  placeholder="Search by guest name, room number..."
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Revenue Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              background: '#ffffff',
              border: '1px solid #e0e0e0',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                border: '1px solid #4CAF50',
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: '50%', 
                    background: '#f0f8f0',
                    mr: 2 
                  }}>
                    <AttachMoney sx={{ fontSize: 32, color: '#4CAF50' }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                      ${currentData.total.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Revenue
                    </Typography>
                  </Box>
                </Box>
                <Chip 
                  label={currentData.change} 
                  sx={{ 
                    backgroundColor: currentData.isPositive ? '#e8f5e8' : '#ffebee',
                    color: currentData.isPositive ? '#2e7d32' : '#c62828'
                  }}
                  size="small"
                  icon={currentData.isPositive ? <TrendingUp /> : <TrendingDown />}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ 
              border: '2px solid #667eea',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BarChart sx={{ fontSize: 40, color: '#667eea', mr: 2 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#667eea' }}>
                      {currentData.transactions?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Transactions
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ 
              border: '2px solid #FF9800',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(255, 152, 0, 0.3)',
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PieChart sx={{ fontSize: 40, color: '#FF9800', mr: 2 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF9800' }}>
                      ${(currentData.total / (currentData.transactions?.length || 1)).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average Transaction
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ 
              border: '2px solid #9C27B0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(156, 39, 176, 0.3)',
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Timeline sx={{ fontSize: 40, color: '#9C27B0', mr: 2 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#9C27B0' }}>
                      {currentData.isPositive ? '+' : ''}{currentData.change}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      vs Previous Period
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Revenue Breakdown */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Revenue Breakdown
                </Typography>
                {currentData.breakdown?.map((item, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {item.category}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        ${item.amount.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: `${item.percentage}%`,
                          height: 8,
                          bgcolor: '#667eea',
                          borderRadius: 1,
                          mr: 2,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {item.percentage}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Transactions */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Recent Transactions
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Guest</TableCell>
                        <TableCell>Room</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentData.transactions?.slice(0, 5).map((transaction) => (
                        <TableRow key={transaction.id} hover>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {transaction.guest}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={transaction.room} size="small" color="primary" />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                              ${transaction.amount}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {transaction.time}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Revenue; 