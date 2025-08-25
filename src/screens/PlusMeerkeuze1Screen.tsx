import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import confetti from 'canvas-confetti';

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion(id: number) {
  const targetSum = getRandomInt(2, 100);
  const num1 = getRandomInt(1, targetSum - 1);
  const num2 = targetSum - num1;
  const correct = num1 + num2;
  // Generate two distractors
  let distractor1 = correct + getRandomInt(-10, 10);
  let distractor2 = correct + getRandomInt(-20, 20);
  // Ensure distractors are not equal to correct answer and within 1-100
  const used = new Set([correct]);
  [distractor1, distractor2] = [distractor1, distractor2].map(d => {
    while (used.has(d) || d < 1 || d > 100) {
      d = correct + getRandomInt(-20, 20);
    }
    used.add(d);
    return d;
  });
  // Shuffle options
  const options = [
    { answer: String(correct), isCorrect: true },
    { answer: String(distractor1), isCorrect: false },
    { answer: String(distractor2), isCorrect: false },
  ].sort(() => Math.random() - 0.5);
  return {
    id,
    question: `${num1} + ${num2} = ?`,
    options,
  };
}

function generateQuestions() {
  return Array.from({ length: 10 }, (_, i) => generateQuestion(i + 1));
}

const PlusMeerkeuze1Screen: React.FC = () => {
  const navigate = useNavigate();
  const [questions] = useState(generateQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSubmit = () => {
    const selectedOption = currentQuestion.options.find(opt => opt.answer === selectedAnswer);
    if (selectedOption?.isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setScore(score + 1);
      setShowError(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
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
    setSelectedAnswer(event.target.value);
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
              variant="h4"
              sx={{
                color: 'white',
                mb: 4,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {currentQuestion.question}
            </Typography>

            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <RadioGroup
                value={selectedAnswer}
                onChange={handleAnswerChange}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {currentQuestion.options.map((option) => (
                  <FormControlLabel
                    key={option.answer}
                    value={option.answer}
                    control={
                      <Radio
                        sx={{
                          color: 'white',
                          '&.Mui-checked': {
                            color: '#FF6B6B',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          color: 'white',
                          fontSize: '1.5rem',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        }}
                      >
                        {option.answer}
                      </Typography>
                    }
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '10px',
                      margin: '5px 0',
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

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
              disabled={!selectedAnswer}
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

export default PlusMeerkeuze1Screen; 