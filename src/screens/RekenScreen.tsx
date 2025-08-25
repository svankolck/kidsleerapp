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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import WatchIcon from '@mui/icons-material/Watch';
import TimelineIcon from '@mui/icons-material/Timeline';

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

const RekenScreen: React.FC = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'plus',
      name: 'Plussommen',
      icon: <AddIcon sx={{ fontSize: 48 }} />,
      color: '#FF6B6B',
      onClick: () => navigate('/rekenen/plus'),
    },
    {
      id: 'min',
      name: 'Minsommen',
      icon: <RemoveIcon sx={{ fontSize: 48 }} />,
      color: '#4ECDC4',
      onClick: () => navigate('/rekenen/min'),
    },
    {
      id: 'klok',
      name: 'Klokkijken',
      icon: <WatchIcon sx={{ fontSize: 48 }} />,
      color: '#FFD166',
      onClick: () => navigate('/rekenen/klok'),
    },
    {
      id: 'getallen',
      name: 'Getallenlijn',
      icon: <TimelineIcon sx={{ fontSize: 48 }} />,
      color: '#06D6A0',
      onClick: () => navigate('/rekenen/getallen'),
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
              onClick={() => navigate('/child/saar')}
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
              Rekenen
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {games.map((game) => (
            <Grid item xs={12} sm={6} key={game.id}>
              <StyledPaper
                onClick={game.onClick}
                sx={{
                  background: `linear-gradient(135deg, ${game.color} 0%, ${game.color}80 100%)`,
                }}
              >
                <Box
                  sx={{
                    color: 'white',
                    mb: 2,
                  }}
                >
                  {game.icon}
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  {game.name}
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default RekenScreen; 