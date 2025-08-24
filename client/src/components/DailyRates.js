import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@mui/material';
import {
  Edit,
  TrendingUp,
  TrendingDown,
  CalendarToday,
  Hotel,
} from '@mui/icons-material';

const DailyRates = () => {
  const [editDialog, setEditDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newRate, setNewRate] = useState('');

  // Generate next 30 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  // Room data with actual room types and base rates
  const rooms = [
    {
      id: 1,
      type: 'King Bed Guest Room',
      baseRate: 299,
      totalRooms: 40,
      rates: dates.map(date => ({
        date: date,
        rate: 299,
        available: true
      }))
    },
    {
      id: 2,
      type: 'King Bed Suite',
      baseRate: 499,
      totalRooms: 20,
      rates: dates.map(date => ({
        date: date,
        rate: 499,
        available: true
      }))
    },
    {
      id: 3,
      type: '1 Double Bed Guest Room',
      baseRate: 199,
      totalRooms: 25,
      rates: dates.map(date => ({
        date: date,
        rate: 199,
        available: true
      }))
    },
    {
      id: 4,
      type: '2 Double Bed',
      baseRate: 349,
      totalRooms: 10,
      rates: dates.map(date => ({
        date: date,
        rate: 349,
        available: true
      }))
    },
    {
      id: 5,
      type: '1 Double Suite',
      baseRate: 399,
      totalRooms: 5,
      rates: dates.map(date => ({
        date: date,
        rate: 399,
        available: true
      }))
    }
  ];

  // Calculate actual availability based on checked-in guests
  const calculateAvailability = (roomType) => {
    const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
    const occupiedRooms = currentlyInHouse.filter(guest => guest.roomType === roomType).length;
    const room = rooms.find(r => r.type === roomType);
    return room ? room.totalRooms - occupiedRooms : 0;
  };

  // Listen for in-house updates to refresh availability
  useEffect(() => {
    const handleInHouseUpdate = () => {
      // Force re-render to update availability
      setEditDialog(false);
    };

    window.addEventListener('inHouseUpdated', handleInHouseUpdate);

    return () => {
      window.removeEventListener('inHouseUpdated', handleInHouseUpdate);
    };
  }, []);

  const handleEditRate = (room, dateIndex) => {
    setSelectedRoom({ room, dateIndex });
    setNewRate(room.rates[dateIndex].rate.toString());
    setEditDialog(true);
  };

  const handleSaveRate = () => {
    if (selectedRoom && newRate) {
      const rate = parseInt(newRate);
      if (rate > 0) {
        // In real implementation, this would update the server
        console.log('Updating rate for', selectedRoom.room.type, 'on', 
          selectedRoom.room.rates[selectedRoom.dateIndex].date.toLocaleDateString(), 
          'to', rate);
      }
    }
    setEditDialog(false);
    setSelectedRoom(null);
    setNewRate('');
  };

  const getRateTrend = (room, dateIndex) => {
    if (dateIndex === 0) return 'neutral';
    const currentRate = room.rates[dateIndex].rate;
    const previousRate = room.rates[dateIndex - 1].rate;
    return currentRate > previousRate ? 'up' : currentRate < previousRate ? 'down' : 'neutral';
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: '#fafbfc' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: '#2c3e50', mb: 1 }}>
          Daily Rates - Next 30 Days
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage room rates and availability for the next 30 days
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} key={room.id}>
            <Card sx={{ 
              background: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #e0e0e0'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Hotel sx={{ fontSize: 30, color: '#667eea', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {room.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Base Rate: ${room.baseRate}/night • Available: {calculateAvailability(room.type)}/{room.totalRooms} rooms
                    </Typography>
                  </Box>
                </Box>

                <TableContainer sx={{ maxHeight: 400 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                        <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Rate</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Trend</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {room.rates.map((rateData, index) => (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarToday sx={{ fontSize: 16, mr: 1, color: '#666' }} />
                              {rateData.date.toLocaleDateString()}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              ${rateData.rate}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={calculateAvailability(room.type) > 0 ? 'Available' : 'Fully Booked'}
                              color={calculateAvailability(room.type) > 0 ? 'success' : 'error'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {getRateTrend(room, index) === 'up' && (
                              <TrendingUp sx={{ color: '#4CAF50' }} />
                            )}
                            {getRateTrend(room, index) === 'down' && (
                              <TrendingDown sx={{ color: '#f44336' }} />
                            )}
                            {getRateTrend(room, index) === 'neutral' && (
                              <Box sx={{ width: 20, height: 20 }} />
                            )}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleEditRate(room, index)}
                              sx={{ color: '#667eea' }}
                            >
                              <Edit />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Rate Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Rate - {selectedRoom?.room?.type}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Date: {selectedRoom?.room?.rates[selectedRoom?.dateIndex]?.date.toLocaleDateString()}
          </Typography>
          <TextField
            fullWidth
            label="New Rate ($)"
            type="number"
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
            margin="normal"
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveRate} variant="contained">
            Save Rate
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DailyRates; 