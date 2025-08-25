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

const generateRandomQuestion = () => {
  const targetSum = Math.floor(Math.random() * 99) + 2;
  const num1 = Math.floor(Math.random() * (targetSum - 1)) + 1;
  const num2 = targetSum - num1;
  
  return {
    num1,
    num2,
    answer: targetSum
  };
};

const generateQuestions = () => {
  const questions = [];
  for (let i = 0; i < 10; i++) {
    questions.push({
      id: i + 1,
      ...generateRandomQuestion()
    });
  }
  return questions;
};

const PlusInvullenScreen: React.FC = () => {
  const navigate = useNavigate();
  const [questions] = useState(generateQuestions());
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
              Plussommen
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
              {currentQuestion.num1} + {currentQuestion.num2} = ?
            </Typography>

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

export default PlusInvullenScreen; 