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
import AbcIcon from '@mui/icons-material/Abc';
import Looks3Icon from '@mui/icons-material/Looks3';
import CreateIcon from '@mui/icons-material/Create';
import ExtensionIcon from '@mui/icons-material/Extension';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

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

const JoepScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleGameClick = (gameId: string) => {
    navigate(`/child/joep/${gameId}`);
  };

  const handleBackClick = () => {
    navigate('/child/joep');
  };

  const games = [
    {
      id: 'letters',
      name: 'Letters Leren',
      description: 'Leer alle letters kennen',
      icon: <AbcIcon sx={{ fontSize: 48 }} />,
      color: '#FF6B6B',
    },
    {
      id: 'woordjes',
      name: 'Eerste Woordjes',
      description: 'Maak korte woordjes',
      icon: <AutoStoriesIcon sx={{ fontSize: 48 }} />,
      color: '#4ECDC4',
    },
    {
      id: 'letterspel',
      name: 'Letterspel',
      description: 'Zoek de juiste letter',
      icon: <SortByAlphaIcon sx={{ fontSize: 48 }} />,
      color: '#FFD166',
    },
    {
      id: 'cijfers',
      name: 'Cijfers tot 20',
      description: 'Leer cijfers herkennen',
      icon: <Looks3Icon sx={{ fontSize: 48 }} />,
      color: '#06D6A0',
    },
    {
      id: 'rekenen',
      name: 'Rekenen tot 10',
      description: 'Optellen en aftrekken',
      icon: <ExtensionIcon sx={{ fontSize: 48 }} />,
      color: '#118AB2',
    },
    {
      id: 'schrijven',
      name: 'Letters Schrijven',
      description: 'Oefen letters schrijven',
      icon: <CreateIcon sx={{ fontSize: 48 }} />,
      color: '#9C27B0',
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
              onClick={handleBackClick}
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
              Joep's Games
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {games.map((game) => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <StyledPaper
                onClick={() => handleGameClick(game.id)}
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
                  variant="h5"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    textAlign: 'center',
                    mb: 1,
                  }}
                >
                  {game.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    opacity: 0.9,
                  }}
                >
                  {game.description}
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default JoepScreen; 