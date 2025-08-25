import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
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

const PlusDiplomaScreen: React.FC = () => {
  const navigate = useNavigate();
  const [questions] = useState(generateQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (questionId: number, value: string) => {
    setSelectedAnswer(value);
  };

  const handleSubmit = () => {
    if (selectedAnswer === currentQuestion.options.find(o => o.isCorrect)?.answer) {
      setScore(prev => prev + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      setIsFinished(true);
      if (score >= 8) { // 80% or better
        confetti({
          particleCount: 200,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
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
              {score >= 8 ? 'Gefeliciteerd!' : 'Helaas!'}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                mb: 4,
              }}
            >
              Je score: {score} van de 10
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                mb: 4,
              }}
            >
              {score >= 8 
                ? 'Je hebt je diploma gehaald!' 
                : 'Blijf oefenen en probeer het nog een keer.'}
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
      <Container maxWidth="md">
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
              Diploma
            </Typography>
          </Box>

          <Paper
            sx={{
              p: 4,
              width: '100%',
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
              }}
            >
              {currentQuestion.question}
            </Typography>

            <FormControl>
              <RadioGroup
                value={selectedAnswer}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              >
                {currentQuestion.options.map((option) => (
                  <FormControlLabel
                    key={option.answer}
                    value={option.answer}
                    control={<Radio />}
                    label={option.answer}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                sx={{
                  backgroundColor: '#FF6B6B',
                  '&:hover': {
                    backgroundColor: '#FF8E8E',
                  },
                  fontSize: '1.2rem',
                  padding: '10px 30px',
                }}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Volgende vraag' : 'Controleer antwoorden'}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default PlusDiplomaScreen; 