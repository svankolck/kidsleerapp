import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const StyledButton = styled(Button)(({ theme }) => ({
  width: '300px',
  height: '300px',
  borderRadius: '20px',
  margin: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
  },
}));

const HomeScreen = () => {
  const navigate = useNavigate();

  // Functie om leeftijd te berekenen op basis van geboortedatum
  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Geboortedata van de kinderen
  const saarBirthDate = new Date(2017, 6, 31); // Juli is maand 6 (0-indexed)
  const joepBirthDate = new Date(2019, 2, 29); // Maart is maand 2 (0-indexed)

  const handleChildSelect = (name: string) => {
    navigate(`/child/${name}`);
  };

  const handleAdminClick = () => {
    const pwd = prompt('Voer het admin-wachtwoord in:');
    if (pwd === 'Marken146!') {
      navigate('/admin');
    } else if (pwd !== null) {
      alert('Onjuist wachtwoord');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #46178f 0%, #2b0b47 100%)',
        py: 8,
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
        <Tooltip title="Admin">
          <IconButton size="small" onClick={handleAdminClick} sx={{ color: 'white', opacity: 0.7 }}>
            <AdminPanelSettingsIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Welkom bij de Leer App!
          </Typography>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
            <StyledButton
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #FF8E8E 0%, #FF6B6B 100%)',
                },
              }}
              onClick={() => handleChildSelect('saar')}
            >
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                Saar
              </Typography>
              <Typography variant="h5" sx={{ color: 'white', mt: 1 }}>
                {calculateAge(saarBirthDate)} jaar
              </Typography>
            </StyledButton>
            <StyledButton
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #45B7AF 0%, #4ECDC4 100%)',
                },
              }}
              onClick={() => handleChildSelect('joep')}
            >
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                Joep
              </Typography>
              <Typography variant="h5" sx={{ color: 'white', mt: 1 }}>
                {calculateAge(joepBirthDate)} jaar
              </Typography>
            </StyledButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeScreen; 