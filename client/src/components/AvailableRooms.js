import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Hotel,
  Person,
  CheckCircle,
  Cancel,
  Edit,
  ArrowBack,
  Search,
  Refresh,
} from '@mui/icons-material';


const AvailableRooms = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedRoomType, setSelectedRoomType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingRoom, setEditingRoom] = useState(null);
  const [editForm, setEditForm] = useState({
    roomNumber: '',
    roomType: '',
    price: '',
    status: '',
    amenities: [],
  });
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const handleStatusFilterChange = (filter) => {
    setStatusFilter(filter);
  };

  const handleRoomTypeFilterChange = (roomType) => {
    setSelectedRoomType(roomType);
  };

  // Helper function for floor suffix
  function getFloorSuffix(floor) {
    if (floor === 1) return 'st';
    if (floor === 2) return 'nd';
    if (floor === 3) return 'rd';
    return 'th';
  }

  // Initialize rooms and sync with checked-in guests
  useEffect(() => {
    const initializeRooms = () => {
      const currentlyInHouse = JSON.parse(localStorage.getItem('currentlyInHouse') || '[]');
      
      // Create base room data
      const baseRooms = [
        // King Bed Guest Room (30 rooms) - Rooms 101-130
        ...Array.from({ length: 30 }, (_, i) => ({
          id: i + 1,
          roomNumber: `${101 + i}`,
          roomType: 'King Bed Guest Room',
          floor: `${Math.floor((101 + i) / 100) + 1}${getFloorSuffix(Math.floor((101 + i) / 100) + 1)} Floor`,
          capacity: 2,
          price: 299,
          status: 'available',
          amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom', 'King Bed', 'Work Desk'],
          lastCleaned: new Date().toISOString().split('T')[0],
          nextCleaning: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        })),
        
        // King Bed Suite (20 rooms) - Rooms 201-220
        ...Array.from({ length: 20 }, (_, i) => ({
          id: i + 31,
          roomNumber: `${201 + i}`,
          roomType: 'King Bed Suite',
          floor: `${Math.floor((201 + i) / 100) + 1}${getFloorSuffix(Math.floor((201 + i) / 100) + 1)} Floor`,
          capacity: 3,
          price: 499,
          status: 'available',
          amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom', 'King Bed', 'Living Room', 'Mini Bar', 'Balcony'],
          lastCleaned: new Date().toISOString().split('T')[0],
          nextCleaning: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        })),
        
        // 1 Double Bed Guest Room (25 rooms) - Rooms 301-325
        ...Array.from({ length: 25 }, (_, i) => ({
          id: i + 51,
          roomNumber: `${301 + i}`,
          roomType: '1 Double Bed Guest Room',
          floor: `${Math.floor((301 + i) / 100) + 1}${getFloorSuffix(Math.floor((301 + i) / 100) + 1)} Floor`,
          capacity: 2,
          price: 199,
          status: 'available',
          amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom', 'Double Bed'],
          lastCleaned: new Date().toISOString().split('T')[0],
          nextCleaning: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        })),
        
        // 2 Double Bed (15 rooms) - Rooms 401-415
        ...Array.from({ length: 15 }, (_, i) => ({
          id: i + 76,
          roomNumber: `${401 + i}`,
          roomType: '2 Double Bed',
          floor: `${Math.floor((401 + i) / 100) + 1}${getFloorSuffix(Math.floor((401 + i) / 100) + 1)} Floor`,
          capacity: 4,
          price: 349,
          status: 'available',
          amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom', '2 Double Beds', 'Extra Space'],
          lastCleaned: new Date().toISOString().split('T')[0],
          nextCleaning: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        })),
        
        // 1 Double Suite (10 rooms) - Rooms 501-510
        ...Array.from({ length: 10 }, (_, i) => ({
          id: i + 91,
          roomNumber: `${501 + i}`,
          roomType: '1 Double Suite',
          floor: `${Math.floor((501 + i) / 100) + 1}${getFloorSuffix(Math.floor((501 + i) / 100) + 1)} Floor`,
          capacity: 3,
          price: 399,
          status: 'available',
          amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom', 'Double Bed', 'Living Room', 'Mini Bar'],
          lastCleaned: new Date().toISOString().split('T')[0],
          nextCleaning: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        })),
      ];

      // Update room status based on checked-in guests
      const updatedRooms = baseRooms.map(room => {
        const occupiedGuest = currentlyInHouse.find(guest => guest.roomNumber === room.roomNumber);
        if (occupiedGuest) {
          return {
            ...room,
            status: 'occupied',
            guestName: occupiedGuest.guestName,
            checkInTime: occupiedGuest.checkInTime,
          };
        }
        return room;
      });

      setRooms(updatedRooms);
    };

    initializeRooms();

    // Listen for in-house updates
    const handleInHouseUpdate = () => {
      initializeRooms();
    };

    window.addEventListener('inHouseUpdated', handleInHouseUpdate);

    return () => {
      window.removeEventListener('inHouseUpdated', handleInHouseUpdate);
    };
  }, []);

  // Apply filters whenever rooms, statusFilter, selectedRoomType, or searchTerm changes
  useEffect(() => {
    let filtered = rooms;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(room => room.status === statusFilter);
    }

    // Apply room type filter
    if (selectedRoomType !== 'all') {
      filtered = filtered.filter(room => room.roomType === selectedRoomType);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(room => 
        room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.roomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (room.guestName && room.guestName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredRooms(filtered);
  }, [rooms, statusFilter, selectedRoomType, searchTerm]);





  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'occupied':
        return 'warning';
      case 'maintenance':
        return 'error';
      case 'cleaning':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'occupied':
        return 'Occupied';
      case 'maintenance':
        return 'Maintenance';
      case 'cleaning':
        return 'Cleaning';
      default:
        return status;
    }
  };

  const availableRooms = rooms.filter(room => room.status === 'available').length;
  const occupiedRooms = rooms.filter(room => room.status === 'occupied').length;
  const maintenanceRooms = rooms.filter(room => room.status === 'maintenance').length;
  const totalRooms = rooms.length;

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setEditForm({
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      price: room.price,
      status: room.status,
      amenities: room.amenities,
    });
  };

  const handleSaveEdit = () => {
    // In a real application, this would update the database
    console.log('Saving room edit:', editForm);
    alert('Room updated successfully!');
    setEditingRoom(null);
    setEditForm({
      roomNumber: '',
      roomType: '',
      price: '',
      status: '',
      amenities: [],
    });
  };

  const handleCancelEdit = () => {
    setEditingRoom(null);
    setEditForm({
      roomNumber: '',
      roomType: '',
      price: '',
      status: '',
      amenities: [],
    });
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: '#fafbfc' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
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
              Available Rooms
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage and monitor room availability
            </Typography>
          </Box>
        </Box>
      </Box>

      <Container maxWidth="lg">
        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                background: '#ffffff',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  border: '1px solid #4CAF50',
                }
              }}
              onClick={() => handleStatusFilterChange('available')}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: '50%', 
                    background: '#f0f8f0',
                    mr: 2 
                  }}>
                    <CheckCircle sx={{ fontSize: 32, color: '#4CAF50' }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                      {availableRooms}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Available Rooms
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                background: '#ffffff',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  border: '1px solid #FF9800',
                }
              }}
              onClick={() => handleStatusFilterChange('occupied')}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: '50%', 
                    background: '#fff8e1',
                    mr: 2 
                  }}>
                    <Person sx={{ fontSize: 32, color: '#FF9800' }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                      {occupiedRooms}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Occupied Rooms
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                bgcolor: '#F44336', 
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(244, 67, 54, 0.3)',
                }
              }}
              onClick={() => handleStatusFilterChange('maintenance')}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Cancel sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {maintenanceRooms}
                    </Typography>
                    <Typography variant="body2">
                      Maintenance
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                bgcolor: '#667eea', 
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                }
              }}
              onClick={() => handleStatusFilterChange('all')}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Hotel sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {totalRooms}
                    </Typography>
                    <Typography variant="body2">
                      Total Rooms
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 4 }}>
          {/* Active Filter Indicator */}
          {(statusFilter !== 'all' || selectedRoomType !== 'all' || searchTerm) && (
            <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Active Filters:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {statusFilter !== 'all' && (
                  <Chip 
                    label={`Status: ${statusFilter}`} 
                    color="primary" 
                    size="small"
                    onDelete={() => handleStatusFilterChange('all')}
                  />
                )}
                {selectedRoomType !== 'all' && (
                  <Chip 
                    label={`Type: ${selectedRoomType}`} 
                    color="secondary" 
                    size="small"
                    onDelete={() => handleRoomTypeFilterChange('all')}
                  />
                )}
                {searchTerm && (
                  <Chip 
                    label={`Search: "${searchTerm}"`} 
                    color="info" 
                    size="small"
                    onDelete={() => setSearchTerm('')}
                  />
                )}
              </Box>
            </Box>
          )}
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search by room number or guest name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Room Type</InputLabel>
                <Select
                  value={selectedRoomType}
                  onChange={(e) => setSelectedRoomType(e.target.value)}
                  label="Room Type"
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="King Bed Guest Room">King Bed Guest Room</MenuItem>
                  <MenuItem value="King Bed Suite">King Bed Suite</MenuItem>
                  <MenuItem value="1 Double Bed Guest Room">1 Double Bed Guest Room</MenuItem>
                  <MenuItem value="2 Double Bed">2 Double Bed</MenuItem>
                  <MenuItem value="1 Double Suite">1 Double Suite</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                fullWidth
                onClick={() => {
                  setSearchTerm('');
                  setSelectedRoomType('all');
                  setStatusFilter('all');
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Rooms Table */}
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Room</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Floor</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Capacity</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Guest</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Last Cleaned</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id} hover>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {room.roomNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={room.roomType} 
                        size="small" 
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{room.floor}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Person sx={{ fontSize: 16, mr: 0.5 }} />
                        {room.capacity}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                        ${room.price}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(room.status)}
                        color={getStatusColor(room.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {room.guestName ? (
                        <Typography variant="body2">
                          {room.guestName}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          -
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(room.lastCleaned).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit Room">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleEditRoom(room)}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        {room.status === 'maintenance' && (
                          <Tooltip title="Maintenance Note">
                            <Typography variant="caption" color="error">
                              {room.maintenanceNote}
                            </Typography>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {filteredRooms.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No rooms found matching your criteria
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setSelectedRoomType('all');
                setStatusFilter('all');
              }}
              sx={{ mt: 2 }}
            >
              Clear Filters
            </Button>
          </Box>
        )}

        {/* Edit Room Dialog */}
        <Dialog 
          open={editingRoom !== null} 
          onClose={handleCancelEdit}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Edit Room {editingRoom?.roomNumber}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Room Number"
                  value={editForm.roomNumber}
                  onChange={(e) => setEditForm({...editForm, roomNumber: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Room Type</InputLabel>
                  <Select
                    value={editForm.roomType}
                    onChange={(e) => setEditForm({...editForm, roomType: e.target.value})}
                    label="Room Type"
                  >
                    <MenuItem value="King Bed Guest Room">King Bed Guest Room</MenuItem>
                    <MenuItem value="King Bed Suite">King Bed Suite</MenuItem>
                    <MenuItem value="1 Double Bed Guest Room">1 Double Bed Guest Room</MenuItem>
                    <MenuItem value="2 Double Bed">2 Double Bed</MenuItem>
                    <MenuItem value="1 Double Suite">1 Double Suite</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price per Night"
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={editForm.status}
                    onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                    label="Status"
                  >
                    <MenuItem value="available">Available</MenuItem>
                    <MenuItem value="occupied">Occupied</MenuItem>
                    <MenuItem value="maintenance">Maintenance</MenuItem>
                    <MenuItem value="cleaning">Cleaning</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Amenities
                </Typography>
                <Grid container spacing={2}>
                  {['WiFi', 'TV', 'AC', 'Private Bathroom', 'King Bed', 'Double Bed', 'Work Desk', 'Living Room', 'Mini Bar', 'Balcony', 'Extra Space'].map((amenity) => (
                    <Grid item xs={6} sm={4} key={amenity}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={editForm.amenities.includes(amenity)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEditForm({
                                  ...editForm,
                                  amenities: [...editForm.amenities, amenity]
                                });
                              } else {
                                setEditForm({
                                  ...editForm,
                                  amenities: editForm.amenities.filter(a => a !== amenity)
                                });
                              }
                            }}
                          />
                        }
                        label={amenity}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelEdit}>Cancel</Button>
            <Button onClick={handleSaveEdit} variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AvailableRooms; 