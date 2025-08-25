import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  LinearProgress,
  Paper,
  Grid,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  height: '100%',
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

const ChildScreen: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    if (name) {
      localStorage.setItem('activeChildName', name);
    }
  }, [name]);

  const isSaar = name === 'saar';
  const childName = isSaar ? 'Saar' : 'Joep';
  const childAge = isSaar ? 7 : 6;

  const activities = isSaar
    ? [
        { id: 1, name: 'Tafels', icon: '×', color: '#FF6B6B', onClick: () => navigate('/tables/random') },
        { id: 2, name: 'Spelling', icon: 'ABC', color: '#4ECDC4', onClick: () => navigate('/spelling/ng-nk') },
        { id: 3, name: 'Rekenen', icon: '=', color: '#FFD166', onClick: () => navigate('/rekenen') },
        { id: 4, name: 'Dictee', icon: '✍️', color: '#06D6A0', onClick: () => {} },
      ]
    : [
        { id: 1, name: 'Games', icon: '🎮', color: '#FF6B6B', onClick: () => navigate('/child/joep/games') },
        { id: 2, name: 'Letters', icon: 'A', color: '#4ECDC4', onClick: () => navigate('/child/joep/letters') },
        { id: 3, name: 'Rekenen', icon: '=', color: '#FFD166', onClick: () => navigate('/child/joep/rekenen') },
        { id: 4, name: 'Cijfers', icon: '1', color: '#06D6A0', onClick: () => navigate('/child/joep/cijfers') },
      ];

  const handleActivityClick = (onClick: () => void) => {
    onClick();
    const newProgress = Math.min(progress + 0.2, 1);
    setProgress(newProgress);

    if (newProgress === 1 && stars < 5) {
      setStars((prev) => prev + 1);
      setProgress(0);
    }
  };

  const handleGameClick = (game: string) => {
    if (name === 'saar') {
      if (game === 'tables') {
        navigate('/tables/random');
      } else if (game === 'spelling') {
        navigate('/spelling/1');
      }
    } else if (name === 'joep') {
      if (game === 'games') {
        navigate('/joep/games');
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #46178f 0%, #2b0b47 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <IconButton
              onClick={() => navigate('/')}
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
              {childName} ({childAge} jaar)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
            {[...Array(5)].map((_, index) =>
              index < stars ? (
                <StarIcon
                  key={index}
                  sx={{ color: '#FFD700', fontSize: 40 }}
                />
              ) : (
                <StarBorderIcon
                  key={index}
                  sx={{ color: '#FFD700', fontSize: 40 }}
                />
              )
            )}
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress * 100}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(255,255,255,0.2)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#FFD700',
              },
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {activities.map((activity) => (
            <Grid item xs={12} sm={6} key={activity.id}>
              <StyledPaper
                elevation={3}
                onClick={() => handleActivityClick(activity.onClick)}
                sx={{
                  background: `linear-gradient(135deg, ${activity.color} 0%, ${activity.color}80 100%)`,
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    color: 'white',
                    mb: 2,
                    fontSize: '4rem',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  {activity.icon}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  {activity.name}
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ChildScreen; 