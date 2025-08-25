import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import confetti from 'canvas-confetti';

// Letters gegroepeerd op moeilijkheidsgraad
const letterGroups = [
  {
    name: 'Korte klanken',
    letters: ['a', 'e', 'i', 'o', 'u'],
    color: '#FF6B6B',
  },
  {
    name: 'Medeklinkers 1',
    letters: ['m', 'r', 's', 'v', 'n'],
    color: '#4ECDC4',
  },
  {
    name: 'Medeklinkers 2',
    letters: ['b', 'd', 'k', 'p', 't'],
    color: '#FFD166',
  },
  {
    name: 'Medeklinkers 3',
    letters: ['f', 'h', 'j', 'l', 'z'],
    color: '#06D6A0',
  },
  {
    name: 'Medeklinkers 4',
    letters: ['g', 'w', 'c', 'x', 'y'],
    color: '#118AB2',
  },
  {
    name: 'Twee tekens',
    letters: ['aa', 'ee', 'oo', 'uu', 'eu'],
    color: '#9C27B0',
  },
];

const LettersScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    // Speel het geluid van de letter af
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = 'nl-NL';
    window.speechSynthesis.speak(utterance);
    // Toon confetti voor positieve feedback
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const handleGroupClick = (index: number) => {
    setSelectedGroup(index);
    setSelectedLetter(null);
  };

  const handleBackClick = () => {
    if (selectedGroup !== null) {
      setSelectedGroup(null);
      setSelectedLetter(null);
    } else {
      navigate('/joep/games');
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
              Letters Leren
            </Typography>
          </Box>
        </Box>

        {selectedGroup === null ? (
          <Grid container spacing={3}>
            {letterGroups.map((group, index) => (
              <Grid item xs={12} sm={6} key={group.name}>
                <Paper
                  onClick={() => handleGroupClick(index)}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${group.color} 0%, ${group.color}80 100%)`,
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      mb: 2,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    {group.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'white',
                      opacity: 0.9,
                    }}
                  >
                    {group.letters.join(' - ')}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>
            <Typography
              variant="h3"
              sx={{
                color: 'white',
                textAlign: 'center',
                mb: 4,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {letterGroups[selectedGroup].name}
            </Typography>
            <Grid container spacing={3}>
              {letterGroups[selectedGroup].letters.map((letter) => (
                <Grid item xs={6} sm={4} md={3} key={letter}>
                  <Paper
                    onClick={() => handleLetterClick(letter)}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      background: selectedLetter === letter
                        ? `linear-gradient(135deg, ${letterGroups[selectedGroup].color} 0%, ${letterGroups[selectedGroup].color}80 100%)`
                        : 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        background: `linear-gradient(135deg, ${letterGroups[selectedGroup].color} 0%, ${letterGroups[selectedGroup].color}80 100%)`,
                      },
                    }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      }}
                    >
                      {letter}
                    </Typography>
                    {selectedLetter === letter && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLetterClick(letter);
                        }}
                        sx={{
                          mt: 2,
                          color: 'white',
                        }}
                      >
                        <VolumeUpIcon />
                      </Button>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default LettersScreen; 