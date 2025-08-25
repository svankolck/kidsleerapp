import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import confetti from 'canvas-confetti';

const questions = [
  { id: 1, num1: '?', num2: 35, answer: 46, total: 81 },
  { id: 2, num1: 67, num2: '?', answer: 24, total: 91 },
  { id: 3, num1: '?', num2: 43, answer: 38, total: 81 },
  { id: 4, num1: 52, num2: '?', answer: 29, total: 81 },
  { id: 5, num1: '?', num2: 18, answer: 73, total: 91 },
  { id: 6, num1: 46, num2: '?', answer: 35, total: 81 },
  { id: 7, num1: '?', num2: 31, answer: 58, total: 89 },
  { id: 8, num1: 64, num2: '?', answer: 27, total: 91 },
  { id: 9, num1: '?', num2: 39, answer: 42, total: 81 },
  { id: 10, num1: 55, num2: '?', answer: 34, total: 89 }
];

const PlusVlekScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showError, setShowError] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSubmit = () => {
    const parsedAnswer = parseInt(userAnswer);
    if (parsedAnswer === currentQuestion.answer) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setScore(score + 1);
      setShowError(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserAnswer('');
      } else {
        // All questions completed
        setTimeout(() => {
          navigate('/rekenen/plus');
        }, 2000);
      }
    } else {
      setShowError(true);
    }
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
    setShowError(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #46178f 0%, #2b0b47 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <IconButton
              onClick={() => navigate('/rekenen/plus')}
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
                textAlign: 'center',
              }}
            >
              Vleksommen
            </Typography>
          </Box>

          <Paper
            sx={{
              p: 4,
              width: '100%',
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: 'white',
                mb: 4,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {currentQuestion.num1} + {currentQuestion.num2} = {currentQuestion.total}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  mb: 2,
                }}
              >
                Wat is het getal op de vlek?
              </Typography>
            </Box>

            <TextField
              type="number"
              value={userAnswer}
              onChange={handleAnswerChange}
              variant="outlined"
              sx={{
                width: '150px',
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  fontSize: '2rem',
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
                },
              }}
              inputProps={{
                min: 0,
                max: 999,
              }}
            />

            {showError && (
              <Typography
                sx={{
                  color: '#FF6B6B',
                  mt: 2,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}
              >
                Probeer het nog eens!
              </Typography>
            )}

            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  mb: 2,
                }}
              >
                Score: {score}/10
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'white',
                }}
              >
                Vraag {currentQuestionIndex + 1} van 10
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={handleAnswerSubmit}
              disabled={!userAnswer}
              sx={{
                mt: 4,
                backgroundColor: '#FF6B6B',
                '&:hover': {
                  backgroundColor: '#FF8E8E',
                },
                fontSize: '1.2rem',
                padding: '10px 30px',
              }}
            >
              Controleer
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default PlusVlekScreen; 