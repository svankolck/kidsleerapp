import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import confetti from 'canvas-confetti';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  borderRadius: '20px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.2)',
}));

const JoepRekenenScreen: React.FC = () => {
  const navigate = useNavigate();
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    // Generate a random target sum between 20 and 100
    const targetSum = Math.floor(Math.random() * 81) + 20;
    
    // Generate first number between 1 and targetSum-1
    const newNum1 = Math.floor(Math.random() * (targetSum - 1)) + 1;
    
    // Calculate second number to reach target sum
    const newNum2 = targetSum - newNum1;
    
    setNum1(newNum1);
    setNum2(newNum2);
    setAnswer('');
    setError('');
  };

  const handleSubmit = () => {
    const userAnswer = parseInt(answer);
    const correctAnswer = num1 + num2;

    if (userAnswer === correctAnswer) {
      setScore(score + 1);
      setError('');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      generateNewQuestion();
    } else {
      setError('Probeer het nog eens!');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleBackClick = () => {
    navigate('/child/joep');
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
              Rekenen tot 20
            </Typography>
          </Box>
        </Box>

        <StyledPaper>
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              textAlign: 'center',
              mb: 4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontWeight: 'bold',
            }}
          >
            {num1} + {num2} = ?
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Vul je antwoord in"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: '10px',
                fontSize: '1.5rem',
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF6B6B',
                },
              },
              '& input': {
                textAlign: 'center',
                fontWeight: 'bold',
              },
            }}
          />

          {error && (
            <Typography
              variant="h6"
              sx={{
                color: '#FF6B6B',
                textAlign: 'center',
                mb: 2,
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{
              py: 2,
              borderRadius: '10px',
              backgroundColor: '#FF6B6B',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#FF5252',
              },
            }}
          >
            Controleer
          </Button>

          <Typography
            variant="h5"
            sx={{
              color: 'white',
              textAlign: 'center',
              mt: 4,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Score: {score}
          </Typography>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default JoepRekenenScreen; 