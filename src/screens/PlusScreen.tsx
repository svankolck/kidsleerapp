import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpeedIcon from '@mui/icons-material/Speed';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '20px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
  },
}));

const PlusScreen: React.FC = () => {
  const navigate = useNavigate();

  const exercises = [
    {
      id: 'meerkeuze1',
      name: 'Welke som is goed?',
      description: 'Tot 100 - Deel 1',
      icon: <QuizIcon sx={{ fontSize: 48 }} />,
      color: '#FF6B6B',
      onClick: () => navigate('/rekenen/plus/meerkeuze1'),
    },
    {
      id: 'meerkeuze2',
      name: 'Welke som is goed?',
      description: 'Tot 100 - Deel 2',
      icon: <QuizIcon sx={{ fontSize: 48 }} />,
      color: '#FF8E8E',
      onClick: () => navigate('/rekenen/plus/meerkeuze2'),
    },
    {
      id: 'meerkeuze3',
      name: 'Plussommen',
      description: 'Tot 100 - Meerkeuze',
      icon: <SchoolIcon sx={{ fontSize: 48 }} />,
      color: '#4ECDC4',
      onClick: () => navigate('/rekenen/plus/meerkeuze3'),
    },
    {
      id: 'invullen',
      name: 'Plussommen',
      description: 'Tot 100 - Invullen',
      icon: <SchoolIcon sx={{ fontSize: 48 }} />,
      color: '#45B7AF',
      onClick: () => navigate('/rekenen/plus/invullen'),
    },
    {
      id: 'vlekken',
      name: 'Vleksommen',
      description: 'Tot 100 - Vul het ontbrekende getal in',
      icon: <QuizIcon sx={{ fontSize: 48 }} />,
      color: '#FFD166',
      onClick: () => navigate('/rekenen/plus/vlek'),
    },
    {
      id: 'tempo',
      name: 'Tempotoets',
      description: 'Tot 100 - Test je snelheid',
      icon: <SpeedIcon sx={{ fontSize: 48 }} />,
      color: '#06D6A0',
      onClick: () => navigate('/rekenen/plus/tempotoets'),
    },
    {
      id: 'diploma',
      name: 'Diploma',
      description: 'Tot 100 - Haal je diploma',
      icon: <EmojiEventsIcon sx={{ fontSize: 48 }} />,
      color: '#118AB2',
      onClick: () => navigate('/rekenen/plus/diploma'),
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #46178f 0%, #2b0b47 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <IconButton
              onClick={() => navigate('/rekenen')}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                flex: 1,
              }}
            >
              Plussommen
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {exercises.map((exercise) => (
            <Grid item xs={12} sm={6} md={4} key={exercise.id}>
              <StyledPaper
                onClick={exercise.onClick}
                sx={{
                  background: `linear-gradient(135deg, ${exercise.color} 0%, ${exercise.color}80 100%)`,
                }}
              >
                <Box
                  sx={{
                    color: 'white',
                    mb: 2,
                  }}
                >
                  {exercise.icon}
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    textAlign: 'center',
                    mb: 1,
                  }}
                >
                  {exercise.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    opacity: 0.9,
                  }}
                >
                  {exercise.description}
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PlusScreen; 