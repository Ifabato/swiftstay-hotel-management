import React, { useState } from 'react';

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
  TextField,
  Grid,
  Avatar,
} from '@mui/material';
import {
  Diamond,
  Phone,
  Email,
  CheckCircle,
  Edit,
  Star,
  SupportAgent,
  ArrowBack,
} from '@mui/icons-material';

const VIPGuestsManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Sample VIP guests data
  const vipGuests = [];



  const getVIPLevelColor = (level) => {
    switch (level) {
      case 'Diamond':
        return '#E91E63';
      case 'Platinum':
        return '#9C27B0';
      case 'Gold':
        return '#FFD700';
      case 'Silver':
        return '#C0C0C0';
      default:
        return '#666';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'checked_in':
        return 'success';
      case 'pending':
        return 'warning';
      case 'checked_out':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'checked_in':
        return 'Checked In';
      case 'pending':
        return 'Pending';
      case 'checked_out':
        return 'Checked Out';
      default:
        return status;
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: '#fafbfc' }}>
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
              VIP Guests
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage VIP guests and special requests
            </Typography>
          </Box>
      </Box>

      <Card sx={{ 
        mb: 3, 
        background: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Diamond sx={{ mr: 2, color: '#E91E63' }} />
                <TextField
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  sx={{ minWidth: 200 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Chip 
                  label={`Total VIP: ${vipGuests.length}`} 
                  color="primary" 
                  variant="outlined"
                />
                <Chip 
                  label={`Diamond: ${vipGuests.filter(v => v.vipLevel === 'Diamond').length}`} 
                  sx={{ bgcolor: '#E91E63', color: 'white' }}
                />
                <Chip 
                  label={`Platinum: ${vipGuests.filter(v => v.vipLevel === 'Platinum').length}`} 
                  sx={{ bgcolor: '#9C27B0', color: 'white' }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ 
        background: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0'
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>VIP Guest</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Room</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>VIP Level</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Special Requests</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Total Spent</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {vipGuests.map((guest) => (
              <TableRow key={guest.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: getVIPLevelColor(guest.vipLevel) }}>
                      <Star />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {guest.guestName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {guest.bookingNumber}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">
                      <Email sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      {guest.email}
                    </Typography>
                    <Typography variant="body2">
                      <Phone sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      {guest.phone}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Room {guest.roomNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {guest.roomType}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={guest.vipLevel}
                    sx={{ 
                      bgcolor: getVIPLevelColor(guest.vipLevel), 
                      color: 'white',
                      fontWeight: 600
                    }}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box>
                    {guest.specialRequests.map((request, index) => (
                      <Chip
                        key={index}
                        label={request}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                    ${guest.totalSpent}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(guest.status)}
                    color={getStatusColor(guest.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      title="Concierge Service"
                    >
                      <SupportAgent />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="success"
                      title="Mark as Complete"
                    >
                      <CheckCircle />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      title="Edit VIP Guest"
                    >
                      <Edit />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Card>
    </Box>
  );
};

export default VIPGuestsManagement; 