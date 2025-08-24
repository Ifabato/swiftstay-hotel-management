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
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Assignment,
  CheckCircle,
  Cancel,
  Delete,
  Block,
  PriorityHigh,
  SupportAgent,
  RoomService,
  Wifi,
  Restaurant,
  Spa,
  MoreVert,
  ArrowBack,
} from '@mui/icons-material';

const PendingRequestsManagement = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionDialog, setActionDialog] = useState(false);
  const [actionType, setActionType] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  useEffect(() => {
    // Load pending requests from localStorage
    const loadRequests = () => {
      const pendingRequests = JSON.parse(localStorage.getItem('pendingRequests') || '[]');
      console.log('PendingRequestsManagement - Loading requests:', pendingRequests);
      setRequests(pendingRequests);
    };

    loadRequests();

    // Listen for pending requests updates
    const handlePendingRequestsUpdate = (event) => {
      const { requests: updatedRequests } = event.detail;
      console.log('PendingRequestsManagement - Received requests update:', updatedRequests);
      setRequests(updatedRequests);
    };

    window.addEventListener('pendingRequestsUpdated', handlePendingRequestsUpdate);

    return () => {
      window.removeEventListener('pendingRequestsUpdated', handlePendingRequestsUpdate);
    };
  }, []);

  // Apply filters whenever requests or statusFilter changes
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter(req => req.status === statusFilter));
    }
  }, [requests, statusFilter]);

  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
  };

  const handleStatusChange = (requestId, newStatus) => {
    const updatedRequests = requests.map(req => 
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem('pendingRequests', JSON.stringify(updatedRequests));
  };

  const handleAssignRequest = (requestId, assignedTo) => {
    const updatedRequests = requests.map(req => 
      req.id === requestId ? { ...req, assignedTo, status: 'in_progress' } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem('pendingRequests', JSON.stringify(updatedRequests));
  };

  const handleDeleteRequest = (requestId) => {
    const updatedRequests = requests.filter(req => req.id !== requestId);
    setRequests(updatedRequests);
    localStorage.setItem('pendingRequests', JSON.stringify(updatedRequests));
  };

  const handleBlockGuest = (requestId) => {
    // In real implementation, this would block the guest from making future requests
    console.log('Blocking guest for request:', requestId);
  };

  const getRequestTypeIcon = (type) => {
    switch (type) {
      case 'room_service':
        return <RoomService />;
      case 'wifi_support':
        return <Wifi />;
      case 'front_desk':
        return <SupportAgent />;
      case 'restaurant':
        return <Restaurant />;
      case 'spa':
        return <Spa />;
      case 'other':
        return <MoreVert />;
      default:
        return <Assignment />;
    }
  };



  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in_progress':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const openActionDialog = (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
    setActionDialog(true);
  };

  const handleAction = () => {
    if (!selectedRequest) return;

    switch (actionType) {
      case 'assign':
        handleAssignRequest(selectedRequest.id, assignedTo);
        break;
      case 'complete':
        handleStatusChange(selectedRequest.id, 'completed');
        break;
      case 'cancel':
        handleStatusChange(selectedRequest.id, 'cancelled');
        break;
      case 'delete':
        handleDeleteRequest(selectedRequest.id);
        break;
      case 'block':
        handleBlockGuest(selectedRequest.id);
        break;
      default:
        console.log('Unknown action type:', actionType);
        break;
    }
    setActionDialog(false);
    setSelectedRequest(null);
    setAssignedTo('');
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
              Pending Requests
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage guest service requests and inquiries
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
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Chip 
                  label={`Total Requests: ${requests.length}`} 
                  color={statusFilter === 'all' ? 'primary' : 'default'}
                  variant={statusFilter === 'all' ? 'filled' : 'outlined'}
                  onClick={() => handleFilterChange('all')}
                  sx={{ cursor: 'pointer' }}
                />
                <Chip 
                  label={`Pending: ${requests.filter(r => r.status === 'pending').length}`} 
                  color={statusFilter === 'pending' ? 'warning' : 'default'}
                  variant={statusFilter === 'pending' ? 'filled' : 'outlined'}
                  onClick={() => handleFilterChange('pending')}
                  sx={{ cursor: 'pointer' }}
                />
                <Chip 
                  label={`In Progress: ${requests.filter(r => r.status === 'in_progress').length}`} 
                  color={statusFilter === 'in_progress' ? 'info' : 'default'}
                  variant={statusFilter === 'in_progress' ? 'filled' : 'outlined'}
                  onClick={() => handleFilterChange('in_progress')}
                  sx={{ cursor: 'pointer' }}
                />
                <Chip 
                  label={`Completed: ${requests.filter(r => r.status === 'completed').length}`} 
                  color={statusFilter === 'completed' ? 'success' : 'default'}
                  variant={statusFilter === 'completed' ? 'filled' : 'outlined'}
                  onClick={() => handleFilterChange('completed')}
                  sx={{ cursor: 'pointer' }}
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
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Guest</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Request</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Assigned To</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.9rem' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id} hover>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {request.guestName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Room {request.roomNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {request.email}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {getRequestTypeIcon(request.requestType)}
                      <Typography variant="body2" sx={{ fontWeight: 600, ml: 1 }}>
                        {request.requestTitle}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                      {request.requestDetails}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={request.priority.toUpperCase()}
                    color={getPriorityColor(request.priority)}
                    size="small"
                    icon={request.priority === 'high' ? <PriorityHigh /> : null}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(request.status)}
                    color={getStatusColor(request.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {request.assignedTo || 'Unassigned'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(request.timestamp).toLocaleTimeString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {request.status === 'pending' && (
                      <IconButton
                        size="small"
                        color="info"
                        onClick={() => openActionDialog(request, 'assign')}
                        title="Assign Request"
                      >
                        <Assignment />
                      </IconButton>
                    )}
                    {request.status !== 'completed' && request.status !== 'cancelled' && (
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => openActionDialog(request, 'complete')}
                        title="Mark as Complete"
                      >
                        <CheckCircle />
                      </IconButton>
                    )}
                    {request.status === 'pending' && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => openActionDialog(request, 'cancel')}
                        title="Cancel Request"
                      >
                        <Cancel />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => openActionDialog(request, 'delete')}
                      title="Delete Request"
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="warning"
                      onClick={() => openActionDialog(request, 'block')}
                      title="Block Guest"
                    >
                      <Block />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Card>

      {/* Action Dialog */}
      <Dialog open={actionDialog} onClose={() => setActionDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {actionType === 'assign' && 'Assign Request'}
          {actionType === 'complete' && 'Mark as Complete'}
          {actionType === 'cancel' && 'Cancel Request'}
          {actionType === 'delete' && 'Delete Request'}
          {actionType === 'block' && 'Block Guest'}
        </DialogTitle>
        <DialogContent>
          {actionType === 'assign' && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Assign To</InputLabel>
              <Select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                label="Assign To"
              >
                <MenuItem value="Front Desk">Front Desk</MenuItem>
                <MenuItem value="Housekeeping">Housekeeping</MenuItem>
                <MenuItem value="Kitchen Staff">Kitchen Staff</MenuItem>
                <MenuItem value="Tech Support">Tech Support</MenuItem>
                <MenuItem value="Concierge">Concierge</MenuItem>
              </Select>
            </FormControl>
          )}
          {actionType === 'delete' && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Are you sure you want to delete this request? This action cannot be undone.
            </Alert>
          )}
          {actionType === 'block' && (
            <Alert severity="error" sx={{ mt: 2 }}>
              This will block the guest from making future requests. Are you sure?
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAction} 
            variant="contained"
            color={actionType === 'delete' || actionType === 'block' ? 'error' : 'primary'}
          >
            {actionType === 'assign' && 'Assign'}
            {actionType === 'complete' && 'Complete'}
            {actionType === 'cancel' && 'Cancel'}
            {actionType === 'delete' && 'Delete'}
            {actionType === 'block' && 'Block'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PendingRequestsManagement; 