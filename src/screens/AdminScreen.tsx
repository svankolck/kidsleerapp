import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Paper, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AdminScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #46178f 0%, #2b0b47 100%)', py: 4 }}>
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <IconButton
            onClick={() => navigate('/')}
            sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', flex: 1 }}>
            Admin
          </Typography>
        </Box>

        <Paper sx={{ p: 4, borderRadius: '20px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
          <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
            Beheer
          </Typography>
          <Button variant="contained" onClick={() => navigate('/admin/export')} sx={{ backgroundColor: '#FF6B6B', '&:hover': { backgroundColor: '#FF8E8E' } }}>
            Exporteren resultaten
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminScreen;

