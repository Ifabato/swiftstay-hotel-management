const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// In-memory data storage (in production, use a database)
const users = [
  {
    id: 'admin1',
    username: 'admin',
    password: '$2a$10$50T.1g2ZQR5PHKqcrf8s0.oXuQ0JnhuFNSccjKvSUgpHTHF7MSTZS', // password: admin123
    role: 'admin',
    name: 'Hotel Manager'
  }
];

// Sample data for demonstration
const guests = [
  {
    id: 'guest1',
    bookingNumber: 'BK001',
    guestName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    roomNumber: '101',
    checkInTime: '2024-01-15T10:30:00Z',
    status: 'checked-in'
  },
  {
    id: 'guest2',
    bookingNumber: 'BK002',
    guestName: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 234-5678',
    roomNumber: '205',
    checkInTime: '2024-01-15T14:20:00Z',
    status: 'checked-in'
  }
];

const bookings = [
  {
    id: 'booking1',
    bookingNumber: 'BK001',
    guestName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    roomNumber: '101',
    checkInTime: '2024-01-15T10:30:00Z',
    status: 'active'
  },
  {
    id: 'booking2',
    bookingNumber: 'BK002',
    guestName: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 234-5678',
    roomNumber: '205',
    checkInTime: '2024-01-15T14:20:00Z',
    status: 'active'
  }
];

const checkouts = [
  {
    id: 'checkout1',
    bookingNumber: 'BK003',
    guestName: 'Mike Wilson',
    roomNumber: '302',
    checkInTime: '2024-01-14T09:00:00Z',
    checkOutTime: '2024-01-15T11:00:00Z',
    feedback: 'Great stay! The room was clean and the service was excellent.'
  },
  {
    id: 'checkout2',
    bookingNumber: 'BK004',
    guestName: 'Emily Davis',
    roomNumber: '401',
    checkInTime: '2024-01-13T16:00:00Z',
    checkOutTime: '2024-01-15T10:30:00Z',
    feedback: 'Very comfortable room and friendly staff. Will definitely return!'
  }
];

// Hotel data
const hotels = [
  {
    id: 'hotel1',
    name: 'Grand Plaza Hotel',
    location: 'Downtown',
    city: 'New York',
    rating: 4.8,
    price: 299,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    amenities: ['wifi', 'pool', 'restaurant', 'fitness', 'spa'],
    description: 'Luxury hotel in the heart of downtown with stunning city views.',
  },
  {
    id: 'hotel2',
    name: 'Oceanview Resort',
    location: 'Beachfront',
    city: 'Miami',
    rating: 4.6,
    price: 399,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
    amenities: ['wifi', 'pool', 'restaurant', 'spa', 'parking'],
    description: 'Beachfront resort with private beach access and ocean views.',
  },
  {
    id: 'hotel3',
    name: 'Business Center Hotel',
    location: 'Financial District',
    city: 'Chicago',
    rating: 4.4,
    price: 199,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
    amenities: ['wifi', 'business', 'restaurant', 'fitness', 'parking'],
    description: 'Perfect for business travelers with conference facilities.',
  },
  {
    id: 'hotel4',
    name: 'Mountain Lodge',
    location: 'Ski Resort',
    city: 'Aspen',
    rating: 4.9,
    price: 599,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
    amenities: ['wifi', 'spa', 'restaurant', 'fitness', 'parking'],
    description: 'Luxury mountain lodge with ski-in/ski-out access.',
  },
  {
    id: 'hotel5',
    name: 'Urban Boutique Hotel',
    location: 'Arts District',
    city: 'Los Angeles',
    rating: 4.3,
    price: 249,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
    amenities: ['wifi', 'restaurant', 'bar', 'room-service'],
    description: 'Trendy boutique hotel in the vibrant arts district.',
  },
  {
    id: 'hotel6',
    name: 'Historic Inn',
    location: 'Old Town',
    city: 'Boston',
    rating: 4.7,
    price: 349,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    amenities: ['wifi', 'restaurant', 'parking', 'pets'],
    description: 'Charming historic inn with modern amenities.',
  }
];

// Room availability data
const rooms = [
  // Grand Plaza Hotel rooms
  { id: 'room1', hotelId: 'hotel1', number: '101', type: 'Standard', price: 299, available: true },
  { id: 'room2', hotelId: 'hotel1', number: '102', type: 'Standard', price: 299, available: true },
  { id: 'room3', hotelId: 'hotel1', number: '201', type: 'Deluxe', price: 399, available: true },
  { id: 'room4', hotelId: 'hotel1', number: '202', type: 'Deluxe', price: 399, available: false },
  { id: 'room5', hotelId: 'hotel1', number: '301', type: 'Suite', price: 599, available: true },
  
  // Oceanview Resort rooms
  { id: 'room6', hotelId: 'hotel2', number: '101', type: 'Ocean View', price: 399, available: true },
  { id: 'room7', hotelId: 'hotel2', number: '102', type: 'Ocean View', price: 399, available: true },
  { id: 'room8', hotelId: 'hotel2', number: '201', type: 'Premium Suite', price: 699, available: true },
  { id: 'room9', hotelId: 'hotel2', number: '202', type: 'Premium Suite', price: 699, available: false },
  
  // Business Center Hotel rooms
  { id: 'room10', hotelId: 'hotel3', number: '101', type: 'Business', price: 199, available: true },
  { id: 'room11', hotelId: 'hotel3', number: '102', type: 'Business', price: 199, available: true },
  { id: 'room12', hotelId: 'hotel3', number: '201', type: 'Executive', price: 299, available: true },
  
  // Mountain Lodge rooms
  { id: 'room13', hotelId: 'hotel4', number: '101', type: 'Mountain View', price: 599, available: true },
  { id: 'room14', hotelId: 'hotel4', number: '102', type: 'Mountain View', price: 599, available: true },
  { id: 'room15', hotelId: 'hotel4', number: '201', type: 'Luxury Suite', price: 899, available: true },
  
  // Urban Boutique Hotel rooms
  { id: 'room16', hotelId: 'hotel5', number: '101', type: 'Boutique', price: 249, available: true },
  { id: 'room17', hotelId: 'hotel5', number: '102', type: 'Boutique', price: 249, available: true },
  { id: 'room18', hotelId: 'hotel5', number: '201', type: 'Artist Suite', price: 349, available: true },
  
  // Historic Inn rooms
  { id: 'room19', hotelId: 'hotel6', number: '101', type: 'Historic', price: 349, available: true },
  { id: 'room20', hotelId: 'hotel6', number: '102', type: 'Historic', price: 349, available: true },
  { id: 'room21', hotelId: 'hotel6', number: '201', type: 'Heritage Suite', price: 449, available: true }
];

// JWT Secret (in production, use environment variable)
const JWT_SECRET = 'hotel-secret-key-2024';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Authentication routes
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ token, user: { id: user.id, username: user.username, role: user.role, name: user.name } });
});

// Guest check-in routes
app.post('/api/guest/checkin', (req, res) => {
  const { bookingNumber, guestName, email, phone, roomNumber } = req.body;
  
  const guest = {
    id: uuidv4(),
    bookingNumber,
    guestName,
    email,
    phone,
    roomNumber,
    checkInTime: moment().format(),
    status: 'checked-in'
  };

  guests.push(guest);
  
  const booking = {
    id: uuidv4(),
    bookingNumber,
    guestName,
    email,
    phone,
    roomNumber,
    checkInTime: moment().format(),
    status: 'active'
  };
  
  bookings.push(booking);

  // Notify admin via Socket.IO
  io.emit('guest-checked-in', guest);

  res.json({ success: true, guest });
});

app.post('/api/guest/checkout', (req, res) => {
  const { bookingNumber, feedback } = req.body;
  
  const guest = guests.find(g => g.bookingNumber === bookingNumber);
  if (!guest) {
    return res.status(404).json({ error: 'Guest not found' });
  }

  guest.status = 'checked-out';
  guest.checkOutTime = moment().format();
  guest.feedback = feedback;

  const checkout = {
    id: uuidv4(),
    bookingNumber,
    guestName: guest.guestName,
    roomNumber: guest.roomNumber,
    checkInTime: guest.checkInTime,
    checkOutTime: moment().format(),
    feedback
  };

  checkouts.push(checkout);

  // Notify admin via Socket.IO
  io.emit('guest-checked-out', checkout);

  res.json({ success: true, checkout });
});

// Hotel and room management endpoints
app.get('/api/hotels', (req, res) => {
  res.json(hotels);
});

app.get('/api/hotels/:hotelId/rooms', (req, res) => {
  const { hotelId } = req.params;
  const availableRooms = rooms.filter(room => 
    room.hotelId === hotelId && room.available
  );
  res.json(availableRooms);
});

app.post('/api/rooms/assign', (req, res) => {
  try {
    const { hotelId, guestName, email, phone, roomNumber, roomType } = req.body;
    
    console.log('Check-in request:', { hotelId, guestName, email, phone, roomNumber, roomType });
  
  // For demo purposes, use the provided room number and type, or assign randomly
  let assignedRoom;
  
  if (roomNumber && roomType) {
    // Use the provided room details
    assignedRoom = { number: roomNumber, type: roomType };
  } else {
    // Find available rooms for the specified hotel
    const availableRooms = rooms.filter(room => 
      room.hotelId === hotelId && 
      room.available
    );
    
    if (availableRooms.length === 0) {
      return res.status(400).json({ error: 'No available rooms found for this hotel.' });
    }
    
    // Assign a random available room
    const randomRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];
    assignedRoom = { number: randomRoom.number, type: randomRoom.type };
  }
  
  // Generate booking number
  const bookingNumber = `BK${Date.now().toString().slice(-6)}`;
  
  // Create guest record
  const guest = {
    id: uuidv4(),
    bookingNumber,
    guestName,
    email,
    phone,
    roomNumber: assignedRoom.number,
    hotelId,
    roomType: assignedRoom.type,
    checkInTime: moment().format(),
    status: 'checked-in'
  };

  guests.push(guest);
  
  const booking = {
    id: uuidv4(),
    bookingNumber,
    guestName,
    email,
    phone,
    roomNumber: assignedRoom.number,
    hotelId,
    roomType: assignedRoom.type,
    checkInTime: moment().format(),
    status: 'active'
  };
  
  bookings.push(booking);

  // Mark the room as unavailable (if it exists in our rooms array)
  const roomToUpdate = rooms.find(room => 
    room.hotelId === hotelId && 
    room.number === assignedRoom.number
  );

  if (roomToUpdate) {
    roomToUpdate.available = false;
  }

  // Notify admin via Socket.IO
  io.emit('guest-checked-in', guest);

  res.json({ 
    success: true, 
    guest,
    assignedRoom: {
      number: assignedRoom.number,
      type: assignedRoom.type,
      price: roomToUpdate ? roomToUpdate.price : 299
    }
  });
  } catch (error) {
    console.error('Error in room assignment:', error);
    res.status(500).json({ error: 'Internal server error during check-in' });
  }
});

// Admin routes
app.get('/api/admin/guests', authenticateToken, (req, res) => {
  res.json(guests);
});

app.get('/api/admin/bookings', authenticateToken, (req, res) => {
  res.json(bookings);
});

app.get('/api/admin/checkouts', authenticateToken, (req, res) => {
  res.json(checkouts);
});

app.get('/api/admin/dashboard', authenticateToken, (req, res) => {
  const activeGuests = guests.filter(g => g.status === 'checked-in').length;
  const totalCheckouts = checkouts.length;
  const todayCheckouts = checkouts.filter(c => 
    moment(c.checkOutTime).isSame(moment(), 'day')
  ).length;

  res.json({
    activeGuests,
    totalCheckouts,
    todayCheckouts,
    recentCheckouts: checkouts.slice(-5)
  });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 