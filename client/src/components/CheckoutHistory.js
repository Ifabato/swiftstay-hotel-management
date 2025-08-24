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
  Collapse,
  IconButton,
} from '@mui/material';
import {
  ExitToApp,
  Person,
  Room,
  Schedule,
  ExpandMore,
  ExpandLess,
  RateReview,
} from '@mui/icons-material';
import { useState } from 'react';

const CheckoutHistory = ({ checkouts }) => {
  const [expandedRows, setExpandedRows] = useState({});

  const handleExpandRow = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Checkout History
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Completed Checkouts ({checkouts.length})
          </Typography>
          
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Booking #</TableCell>
                  <TableCell>Guest Name</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Check-in Time</TableCell>
                  <TableCell>Check-out Time</TableCell>
                  <TableCell>Feedback</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkouts.map((checkout) => (
                  <React.Fragment key={checkout.id}>
                    <TableRow hover>
                                          <TableCell>
                      <Box display="flex" alignItems="center">
                        <ExitToApp sx={{ mr: 1, color: '#667eea' }} />
                        {checkout.bookingNumber}
                      </Box>
                    </TableCell>
                                              <TableCell>
                          <Box display="flex" alignItems="center">
                            <Person sx={{ mr: 1, color: '#764ba2' }} />
                            {checkout.guestName}
                          </Box>
                        </TableCell>
                                              <TableCell>
                          <Box display="flex" alignItems="center">
                            <Room sx={{ mr: 1, color: '#FFD700' }} />
                            {checkout.roomNumber}
                          </Box>
                        </TableCell>
                      <TableCell>
                        {new Date(checkout.checkInTime).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(checkout.checkOutTime).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {checkout.feedback ? (
                          <Chip
                            icon={<RateReview />}
                            label="View Feedback"
                            color="primary"
                            size="small"
                          />
                        ) : (
                          <Chip label="No Feedback" size="small" />
                        )}
                      </TableCell>
                      <TableCell>
                        {checkout.feedback && (
                          <IconButton
                            size="small"
                            onClick={() => handleExpandRow(checkout.id)}
                          >
                            {expandedRows[checkout.id] ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                    {checkout.feedback && (
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                          <Collapse in={expandedRows[checkout.id]} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                              <Typography variant="h6" gutterBottom component="div">
                                Guest Feedback
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {checkout.feedback}
                              </Typography>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {checkouts.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="textSecondary">
                No checkout history found
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CheckoutHistory; 