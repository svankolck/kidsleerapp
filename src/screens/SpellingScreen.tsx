import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import confetti from 'canvas-confetti';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100px',
  height: '100px',
  borderRadius: '20px',
  margin: theme.spacing(1),
  fontSize: '2rem',
  fontWeight: 'bold',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
  },
}));

const questions = [
  {
    id: 1,
    question: "Waar hoor je z-?",
    options: ["bodem", "eng", "zaal"],
    correctAnswer: "zaal"
  },
  {
    id: 2,
    question: "Waar hoor je s-?",
    options: ["spinnen", "kring", "zee"],
    correctAnswer: "spinnen"
  },
  {
    id: 3,
    question: "Waar hoor je z-?",
    options: ["duwtje", "zak", "sterk"],
    correctAnswer: "zak"
  },
  {
    id: 4,
    question: "Waar hoor je s-?",
    options: ["stank", "voorjaar", "zeven"],
    correctAnswer: "stank"
  },
  {
    id: 5,
    question: "Waar hoor je z-?",
    options: ["staf", "zoen", "tong"],
    correctAnswer: "zoen"
  },
  {
    id: 6,
    question: "Waar hoor je s-?",
    options: ["wind", "knecht", "stoef"],
    correctAnswer: "stoef"
  },
  {
    id: 7,
    question: "Waar hoor je z-?",
    options: ["letter", "zalf", "venijn"],
    correctAnswer: "zalf"
  },
  {
    id: 8,
    question: "Waar hoor je s-?",
    options: ["streek", "grijpe", "zefs"],
    correctAnswer: "streek"
  },
  {
    id: 9,
    question: "Waar hoor je z-?",
    options: ["zink", "verkoop", "stop"],
    correctAnswer: "zink"
  },
  {
    id: 10,
    question: "Waar hoor je s-?",
    options: ["zecht", "stoel", "kleur"],
    correctAnswer: "stoel"
  },
  {
    id: 11,
    question: "Waar hoor je s-?",
    options: ["bergen", "zwaard", "straal"],
    correctAnswer: "straal"
  }
];

const SpellingScreen: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSubmit = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
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
          navigate('/child/saar');
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
              onClick={() => navigate('/child/saar')}
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
              Spelling - s/z
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
                    key={option}
                    value={option}
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
                        {option}
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

export default SpellingScreen; 