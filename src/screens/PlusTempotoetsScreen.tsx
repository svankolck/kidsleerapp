import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import confetti from 'canvas-confetti';

const questions = [
  { id: 1, num1: 45, num2: 36, answer: 81 },
  { id: 2, num1: 67, num2: 24, answer: 91 },
  { id: 3, num1: 38, num2: 43, answer: 81 },
  { id: 4, num1: 52, num2: 29, answer: 81 },
  { id: 5, num1: 73, num2: 18, answer: 91 },
  { id: 6, num1: 46, num2: 35, answer: 81 },
  { id: 7, num1: 58, num2: 31, answer: 89 },
  { id: 8, num1: 64, num2: 27, answer: 91 },
  { id: 9, num1: 42, num2: 39, answer: 81 },
  { id: 10, num1: 55, num2: 34, answer: 89 }
];

const TOTAL_TIME = 300; // 5 minutes in seconds

const PlusTempotoetsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showError, setShowError] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStarted && !isFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsFinished(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, isFinished, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsStarted(true);
  };

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
        setIsFinished(true);
      }
    } else {
      setShowError(true);
    }
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
    setShowError(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && userAnswer) {
      handleAnswerSubmit();
    }
  };

  if (isFinished) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #46178f 0%, #2b0b47 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            sx={{
              p: 4,
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
              Tijd is om!
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                mb: 4,
              }}
            >
              Je score: {score} van de {currentQuestionIndex + 1}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/rekenen/plus')}
              sx={{
                backgroundColor: '#FF6B6B',
                '&:hover': {
                  backgroundColor: '#FF8E8E',
                },
                fontSize: '1.2rem',
                padding: '10px 30px',
              }}
            >
              Terug naar menu
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

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
              Tempotoets
            </Typography>
          </Box>

          {!isStarted ? (
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
                variant="h4"
                sx={{
                  color: 'white',
                  mb: 4,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Klaar voor de tempotoets?
              </Typography>
              <Typography
                sx={{
                  color: 'white',
                  mb: 4,
                  fontSize: '1.2rem',
                }}
              >
                Je hebt 5 minuten om zoveel mogelijk sommen te maken.
              </Typography>
              <Button
                variant="contained"
                onClick={handleStart}
                sx={{
                  backgroundColor: '#FF6B6B',
                  '&:hover': {
                    backgroundColor: '#FF8E8E',
                  },
                  fontSize: '1.2rem',
                  padding: '10px 30px',
                }}
              >
                Start
              </Button>
            </Paper>
          ) : (
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
              <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                <CircularProgress
                  variant="determinate"
                  value={(timeLeft / TOTAL_TIME) * 100}
                  size={80}
                  thickness={4}
                  sx={{ color: '#FF6B6B' }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: 'white' }}
                  >
                    {formatTime(timeLeft)}
                  </Typography>
                </Box>
              </Box>

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
                onKeyPress={handleKeyPress}
                variant="outlined"
                autoFocus
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
                  Score: {score}
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
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PlusTempotoetsScreen; 