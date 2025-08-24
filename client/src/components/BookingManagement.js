import React from 'react';
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
  Paper,
  Chip,
} from '@mui/material';
import {
  Hotel,
  Person,
  Room,
  Schedule,
  CheckCircle,
} from '@mui/icons-material';

const BookingManagement = ({ bookings }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'default';
      default:
        return 'warning';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Booking Management
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            All Bookings ({bookings.length})
          </Typography>
          
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Booking #</TableCell>
                  <TableCell>Guest Name</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Check-in Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Hotel sx={{ mr: 1, color: '#667eea' }} />
                        {booking.bookingNumber}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Person sx={{ mr: 1, color: '#764ba2' }} />
                        {booking.guestName}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Room sx={{ mr: 1, color: '#FFD700' }} />
                        {booking.roomNumber}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{booking.email}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {booking.phone}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(booking.checkInTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<CheckCircle />}
                        label={booking.status}
                        color={getStatusColor(booking.status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {bookings.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="textSecondary">
                No bookings found
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookingManagement; 