# 🏨 SwiftStay - Hotel Management System

A modern, full-stack hotel management application built with React and Node.js, featuring real-time guest management, admin dashboard, and mobile-responsive design.

![SwiftStay Logo](client/public/images/swiftstay-logo.svg)

## ✨ Features

### 🏠 Guest Features
- **Self Check-in System** - Streamlined guest registration
- **My Stay Dashboard** - Real-time stay information
- **Trip Planner** - Interactive travel planning tools
- **Contact & Support** - Direct communication channels
- **Mobile Responsive** - Perfect experience on all devices

### 👨‍💼 Admin Portal
- **Real-time Dashboard** - Live statistics and metrics
- **Guest Management** - Complete guest lifecycle management
- **Room Inventory** - 100 rooms across 5 categories
- **Revenue Tracking** - Financial analytics and reporting
- **Arrivals/Departures** - Check-in/out management
- **VIP Guest Services** - Premium guest handling
- **Service Requests** - Pending requests management
- **Notifications** - Real-time alerts and updates

## 🚀 Live Demo

**Main Application**: [http://localhost:3000](http://localhost:3000)
**Admin Login**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Username: `admin`
- Password: `admin123`

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Material-UI** - Professional component library
- **React Router** - Client-side routing
- **Socket.io Client** - Real-time communication
- **Recharts** - Data visualization

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📱 Screenshots

### Guest Interface
- Homepage with hotel information
- Self check-in process
- My Stay dashboard
- Trip planner interface

### Admin Dashboard
- Real-time statistics
- Guest management interface
- Room inventory system
- Revenue analytics
- Service request management

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/swiftstay.git
cd swiftstay
```

2. **Install dependencies**
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies (if any)
cd ..
npm install
```

3. **Start the development server**
```bash
cd client
npm start
```

4. **Access the application**
- Open [http://localhost:3000](http://localhost:3000)
- For admin access: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## 📊 System Architecture

### Real-time Features
- Live guest check-in/out updates
- Real-time room availability
- Instant revenue calculations
- Live notification system

### Data Management
- Local storage persistence
- Custom event system
- Cross-component synchronization
- State management with React Context

## 🎨 UI/UX Highlights

- **Professional Design** - Clean, modern interface
- **Mobile-First** - Responsive across all devices
- **Accessibility** - WCAG compliant components
- **Performance** - Optimized for speed
- **User Experience** - Intuitive navigation

## 🔧 Development

### Project Structure
```
swiftstay/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   └── styles/        # CSS styles
│   └── package.json
├── server.js              # Backend server
├── package.json
└── README.md
```

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🌟 Key Features in Detail

### Real-time Data Sync
- Guest check-ins update admin dashboard instantly
- Room availability updates in real-time
- Revenue calculations update automatically
- Service requests appear immediately

### Admin Management
- Complete guest lifecycle management
- Room allocation and tracking
- Financial reporting and analytics
- Service request handling
- VIP guest special services

### Mobile Responsiveness
- Touch-friendly interface
- Responsive design across devices
- PWA-ready architecture
- Cross-browser compatibility

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Material-UI for the component library
- React team for the amazing framework
- Socket.io for real-time capabilities
- All contributors and testers

---

**SwiftStay** - Revolutionizing hotel management with modern technology! 🏨✨

*Built with ❤️ using React & Node.js* 