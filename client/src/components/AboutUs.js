import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Chip,
  Avatar,
  Stack,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import {
  ArrowBack,
  Hotel,
  Speed,
  Security,
  Support,
  TrendingUp,
  AutoAwesome,
  People,
  Star,
  CheckCircle,
  Business,
  Lightbulb,
  Rocket,
  Flag,
  Timeline as TimelineIcon,
  EmojiEvents,
  Group,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();



  const coreValues = [
    {
      icon: <Speed />,
      title: 'Speed & Efficiency',
      description: 'We believe every second counts. Our technology reduces check-in time from 15 minutes to under 2 minutes.',
    },
    {
      icon: <Security />,
      title: 'Security First',
      description: 'Enterprise-grade security protocols ensure your data is always protected with bank-level encryption.',
    },
    {
      icon: <Support />,
      title: '24/7 Support',
      description: 'Round-the-clock digital assistance ensures help is always available when you need it most.',
    },
    {
      icon: <AutoAwesome />,
      title: 'Innovation',
      description: 'Constantly pushing boundaries with cutting-edge technology to revolutionize hospitality.',
    },
  ];

  const technologyStack = [
    { 
      name: 'React.js & Material-UI', 
      category: 'Frontend Framework', 
      description: 'Modern, responsive user interface with component-based architecture for seamless cross-platform experiences' 
    },
    { 
      name: 'Node.js & Express.js', 
      category: 'Backend Runtime', 
      description: 'Scalable server-side JavaScript platform with RESTful API architecture for real-time data processing' 
    },
    { 
      name: 'MongoDB & Redis', 
      category: 'Data Management', 
      description: 'NoSQL database for flexible guest data storage with Redis caching for lightning-fast response times' 
    },
    { 
      name: 'AWS Cloud Infrastructure', 
      category: 'Cloud Platform', 
      description: 'Enterprise-grade cloud services including EC2, S3, RDS, and Lambda for global scalability and reliability' 
    },
    { 
      name: 'Docker & Kubernetes', 
      category: 'DevOps & Orchestration', 
      description: 'Containerized deployment with automated scaling and load balancing for optimal performance' 
    },
    { 
      name: 'WebRTC & NFC Technology', 
      category: 'Hardware Integration', 
      description: 'Real-time communication protocols and near-field communication for secure digital key delivery' 
    },
    { 
      name: 'Machine Learning & AI', 
      category: 'Intelligent Features', 
      description: 'Predictive analytics for guest preferences and automated customer service through natural language processing' 
    },
    { 
      name: 'Blockchain Security', 
      category: 'Data Protection', 
      description: 'Distributed ledger technology for secure guest identity verification and payment processing' 
    },
  ];



  const milestones = [
    {
      year: '2025 Q1',
      title: 'Company Founded',
      description: 'SwiftStay established as a startup with a vision to revolutionize hotel check-in processes through innovative technology.',
      status: 'current',
    },
    {
      year: '2025 Q2',
      title: 'MVP Development',
      description: 'Complete development of minimum viable product with core self-check-in functionality and basic hotel management features.',
      status: 'upcoming',
    },
    {
      year: '2025 Q3',
      title: 'Beta Testing',
      description: 'Launch beta program with 2-3 partner hotels and conduct user testing to refine the platform based on real feedback.',
      status: 'upcoming',
    },
    {
      year: '2025 Q4',
      title: 'Market Launch',
      description: 'Full commercial launch with 5-10 partner hotels in major US cities, focusing on boutique and mid-scale properties.',
      status: 'upcoming',
    },
    {
      year: '2026 Q1',
      title: 'Growth Phase',
      description: 'Expand to 25+ partner hotels and develop strategic partnerships with hotel management companies.',
      status: 'upcoming',
    },
    {
      year: '2026 Q2',
      title: 'Feature Enhancement',
      description: 'Launch advanced features including AI-powered guest preferences and integrated payment processing.',
      status: 'upcoming',
    },
    {
      year: '2026 Q4',
      title: 'Regional Expansion',
      description: 'Expand to 50+ hotels across multiple regions and begin exploring international market opportunities.',
      status: 'upcoming',
    },
    {
      year: '2027 Q2',
      title: 'Industry Leadership',
      description: 'Establish SwiftStay as a leading technology partner for major hotel chains and hospitality groups.',
      status: 'upcoming',
    },
  ];

  const features = [
    {
      category: 'Check-in Experience',
      items: [
        '2-minute self-check-in process',
        'Mobile app and kiosk options',
        'Digital key delivery',
        'Pre-arrival room preferences',
        'Express check-out',
      ],
    },
    {
      category: 'Guest Services',
      items: [
        '24/7 digital concierge',
        'Room service ordering',
        'Housekeeping requests',
        'Local recommendations',
        'Transportation booking',
      ],
    },
    {
      category: 'Hotel Management',
      items: [
        'Real-time occupancy tracking',
        'Automated revenue optimization',
        'Guest feedback analytics',
        'Staff efficiency monitoring',
        'Predictive maintenance alerts',
      ],
    },
    {
      category: 'Security & Privacy',
      items: [
        'Biometric authentication',
        'End-to-end encryption',
        'GDPR compliance',
        'Regular security audits',
        'Privacy-first design',
      ],
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <IconButton
              onClick={() => navigate('/')}
              sx={{ 
                color: 'white', 
                mr: 2,
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              About SwiftStay
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: 800, mb: 4 }}>
            Revolutionizing the hotel experience through innovative self-check-in technology and guest-centric services.
          </Typography>
          <Chip
            label="Startup Story"
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontWeight: 600,
              fontSize: '1rem',
              px: 2,
              py: 1,
            }}
          />
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>


        {/* Company Story */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Our Story
          </Typography>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                A New Era of Hotel Technology
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem', color: '#555' }}>
                SwiftStay is a newly founded startup with ambitious dreams to revolutionize the hotel industry. 
                Born from the vision of a college student who experienced firsthand the inefficiencies of traditional 
                hotel check-in processes, our mission is to transform how guests interact with hotels through 
                cutting-edge technology.
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem', color: '#555' }}>
                While everything you see on this platform is conceptual and represents our vision for the future, 
                we are committed to becoming one of the leading technology partners for top hotel chains worldwide. 
                Our innovative self-check-in system eliminates waiting times, reduces operational costs, and 
                enhances guest satisfaction through seamless digital experiences.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem', color: '#555' }}>
                We envision a future where every hotel guest can check in within minutes using their smartphone, 
                where hotel staff can focus on providing exceptional service rather than administrative tasks, 
                and where the entire hospitality industry embraces the digital transformation that guests expect 
                in today's connected world.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -20,
                      left: -20,
                      right: -20,
                      bottom: -20,
                      border: '2px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '50%',
                    },
                  }}
                >
                  <Rocket sx={{ fontSize: 120, color: '#667eea' }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Mission & Vision */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Mission & Vision
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 4, height: '100%', borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Flag sx={{ fontSize: 50, color: '#667eea' }} />
                </Box>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#333', textAlign: 'center' }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, fontSize: '1.1rem', color: '#555', textAlign: 'center' }}>
                  To revolutionize the hotel experience by eliminating the frustration of traditional check-in processes 
                  and creating seamless, technology-driven hospitality solutions that put guests first.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 4, height: '100%', borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Lightbulb sx={{ fontSize: 50, color: '#FFD700' }} />
                </Box>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#333', textAlign: 'center' }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, fontSize: '1.1rem', color: '#555', textAlign: 'center' }}>
                  To become the leading platform for modern hotel experiences, where technology enhances human connection 
                  and every guest feels valued from arrival to departure, setting new standards for hospitality excellence.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Core Values */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Our Core Values
          </Typography>
          <Grid container spacing={4}>
            {coreValues.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    borderRadius: 3,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: '#667eea', mb: 2 }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Technology Stack */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Technology Stack
          </Typography>
          <Grid container spacing={3}>
            {technologyStack.map((tech, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  }
                }}>
                  <Chip 
                    label={tech.category} 
                    color="primary" 
                    size="small" 
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {tech.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tech.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Our Platform Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  height: '100%',
                }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#667eea' }}>
                    {feature.category}
                  </Typography>
                  <Stack spacing={1}>
                    {feature.items.map((item, itemIndex) => (
                      <Box key={itemIndex} sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircle sx={{ color: '#4CAF50', mr: 1, fontSize: 20 }} />
                        <Typography variant="body2">{item}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>



        {/* Journey Timeline */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Our Journey
          </Typography>
          <Box sx={{ position: 'relative' }}>
            {milestones.map((milestone, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 4,
                  position: 'relative',
                  '&:last-child': { mb: 0 },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: 'white',
                    flexShrink: 0,
                    mr: 3,
                    ...(milestone.status === 'completed' && {
                      bgcolor: '#4CAF50',
                    }),
                    ...(milestone.status === 'current' && {
                      bgcolor: '#FF9800',
                    }),
                    ...(milestone.status === 'upcoming' && {
                      bgcolor: '#9E9E9E',
                    }),
                  }}
                >
                  {milestone.status === 'completed' && <CheckCircle />}
                  {milestone.status === 'current' && <TimelineIcon />}
                  {milestone.status === 'upcoming' && <EmojiEvents />}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mr: 2 }}>
                      {milestone.title}
                    </Typography>
                    <Chip
                      label={milestone.year}
                      size="small"
                      sx={{
                        bgcolor: milestone.status === 'current' ? '#FF9800' : '#667eea',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {milestone.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center' }}>
          <Card sx={{ 
            p: 6, 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
              Join Us on This Journey
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Be part of the future of hotel technology. We're building something amazing.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/contact')}
                sx={{
                  bgcolor: '#FFD700',
                  color: '#333',
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#FFC700',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get in Touch
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Learn More
              </Button>
            </Stack>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs; 