import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  TextField,
  Alert,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import confetti from 'canvas-confetti';
import ShuffleIcon from '@mui/icons-material/Shuffle';
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

const Medal = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '70%',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '4rem',
  filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))',
  pointerEvents: 'none',
  animation: 'pop-in 600ms ease-out, floaty 2000ms ease-in-out infinite',
  '@keyframes pop-in': {
    '0%': { transform: 'translateX(-50%) scale(0.5)', opacity: 0 },
    '60%': { transform: 'translateX(-50%) scale(1.1)', opacity: 1 },
    '100%': { transform: 'translateX(-50%) scale(1)' },
  },
  '@keyframes floaty': {
    '0%': { transform: 'translateX(-50%) translateY(0px)' },
    '50%': { transform: 'translateX(-50%) translateY(-6px)' },
    '100%': { transform: 'translateX(-50%) translateY(0px)' },
  },
}));

const TablesScreen: React.FC = () => {
  const { table } = useParams<{ table: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showError, setShowError] = useState(false);
  const [score, setScore] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [questionStartAt, setQuestionStartAt] = useState<number>(Date.now());
  const FAST_ANSWER_MS = 6000;
  const [timeLeftMs, setTimeLeftMs] = useState<number>(FAST_ANSWER_MS);
  const [medalVisible, setMedalVisible] = useState(false);
  const [medalCount, setMedalCount] = useState(0);
  const [attemptedWrong, setAttemptedWrong] = useState(false);
  const [results, setResults] = useState<Array<{ a: number; b: number; correct: number; timeMs: number; firstTryCorrect: boolean; medal: boolean }>>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [finalResults, setFinalResults] = useState<typeof results | null>(null);
  const [sessionId, setSessionId] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [mode, setMode] = useState<'practice' | 'test'>('practice');
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [timed, setTimed] = useState<boolean>(true);
  const [timerSeconds, setTimerSeconds] = useState<number>(6);

  const isRandom = table === 'random';
  const effectiveIsRandom = mode === 'test' ? true : isRandom;
  const tableNumber = isRandom ? 1 : parseInt(table || '1', 10);
  const questions = useMemo(() => {
    if (effectiveIsRandom) {
      const length = mode === 'test' ? numQuestions : 10;
      return Array.from({ length }, () => ({
        a: Math.floor(Math.random() * 10) + 1,
        b: Math.floor(Math.random() * 10) + 1,
      }));
    }
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
    if (isShuffled) {
      return [...numbers].sort(() => Math.random() - 0.5);
    }
    return numbers;
  }, [isShuffled, isRandom, sessionId, mode, numQuestions]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = effectiveIsRandom
    ? (currentQuestion as { a: number; b: number }).a * (currentQuestion as { a: number; b: number }).b
    : (currentQuestion as number) * tableNumber;

  useEffect(() => {
    // Reset timer when question changes
    if (!hasStarted) return;
    setQuestionStartAt(Date.now());
    setTimeLeftMs(timerSeconds * 1000);
    setShowError(false);
    setAttemptedWrong(false);
  }, [currentQuestionIndex, effectiveIsRandom, tableNumber, hasStarted, timerSeconds]);

  useEffect(() => {
    if (!hasStarted) return;
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - questionStartAt;
      const remaining = Math.max((timed ? timerSeconds * 1000 : 0) - elapsed, 0);
      setTimeLeftMs(remaining);
    }, 100);
    return () => clearInterval(intervalId);
  }, [questionStartAt, hasStarted, timed, timerSeconds]);

  const handleAnswerSubmit = () => {
    const answer = parseInt(userAnswer, 10);
    const answeredWithinTime = timed && timeLeftMs > 0;
    if (answer === currentAnswer) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (mode === 'test' && answeredWithinTime) {
        // Extra medal celebration
        setMedalVisible(true);
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#FFD700', '#FFF2A6', '#FFA500'],
        });
        setTimeout(() => setMedalVisible(false), 1200);
        setMedalCount(medalCount + 1);
      }

      const a = effectiveIsRandom ? (currentQuestion as { a: number; b: number }).a : (currentQuestion as number);
      const b = effectiveIsRandom ? (currentQuestion as { a: number; b: number }).b : tableNumber;
      const elapsed = Date.now() - questionStartAt;
      const item = {
        a,
        b,
        correct: a * b,
        timeMs: elapsed,
        firstTryCorrect: !attemptedWrong,
        medal: answeredWithinTime,
      };

      setResults(prev => [...prev, item]);

      setScore(score + 1);
      setShowError(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // All questions completed -> show summary and persist
        const finalList = [...results, item];
        setFinalResults(finalList);
        setIsFinished(true);
        try {
          const sessions = JSON.parse(localStorage.getItem('tablesResults') || '[]');
          const session = {
            completedAt: new Date().toISOString(),
            mode: effectiveIsRandom ? 'random' : `table-${tableNumber}`,
            totalScore: score + 1,
            medals: medalCount + (answeredWithinTime ? 1 : 0),
            durationMs: finalList.reduce((acc, r) => acc + r.timeMs, 0),
            items: finalList,
            childName: localStorage.getItem('activeChildName') || undefined,
            timed,
            timerSeconds: timerSeconds,
            numQuestions,
            runType: mode,
          };
          localStorage.setItem('tablesResults', JSON.stringify([...sessions, session]));
        } catch (e) {
          // ignore persistence errors
        }
      }
    } else {
      setShowError(true);
      setAttemptedWrong(true);
    }
    setUserAnswer('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleAnswerSubmit();
    }
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setMedalCount(0);
  };

  const handleRestart = () => {
    setIsFinished(false);
    setFinalResults(null);
    setResults([]);
    setScore(0);
    setMedalCount(0);
    setCurrentQuestionIndex(0);
    setSessionId((id) => id + 1); // regenerate questions
    setHasStarted(false);
  };

  const handleStart = () => {
    // reset state for a fresh run
    setResults([]);
    setScore(0);
    setMedalCount(0);
    setCurrentQuestionIndex(0);
    setSessionId((id) => id + 1);
    setHasStarted(true);
    setQuestionStartAt(Date.now());
    setTimeLeftMs(timerSeconds * 1000);
  };

  const totalMs = timed ? timerSeconds * 1000 : 1;
  const progressValue = Math.round((Math.max(timeLeftMs, 0) / totalMs) * 100);

  if (isFinished && finalResults) {
    const totalSeconds = (finalResults.reduce((acc, r) => acc + r.timeMs, 0) / 1000).toFixed(1);
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #46178f 0%, #2b0b47 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <IconButton
              onClick={() => navigate('/child/saar')}
              sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', flex: 1 }}>
              Eindstand
            </Typography>
          </Box>

          <Paper sx={{ p: 4, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '20px' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
              <Typography variant="h5" sx={{ color: 'white' }}>Score: {score}/{Array.isArray(questions) ? (questions as any[]).length : 10}</Typography>
              <Typography variant="h5" sx={{ color: 'white' }}>🏅 {medalCount}</Typography>
              <Typography variant="h5" sx={{ color: 'white' }}>Tijd: {totalSeconds}s</Typography>
              <Typography variant="h6" sx={{ color: 'white' }}>{effectiveIsRandom ? 'Modus: Random' : `Modus: Tafel van ${tableNumber}`}</Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 2 }}>
              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>Som</Typography>
              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>Tijd</Typography>
              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>1x goed</Typography>
              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>Medaille</Typography>
              {finalResults.map((r, idx) => (
                <React.Fragment key={`${r.a}x${r.b}-${idx}`}>
                  <Typography sx={{ color: 'white' }}>{r.a} × {r.b} = {r.correct}</Typography>
                  <Typography sx={{ color: 'white' }}>{(r.timeMs/1000).toFixed(1)}s</Typography>
                  <Typography sx={{ color: r.firstTryCorrect ? '#06D6A0' : '#FF6B6B' }}>{r.firstTryCorrect ? 'Ja' : 'Nee'}</Typography>
                  <Typography sx={{ color: 'white' }}>{r.medal ? '🏅' : '—'}</Typography>
                </React.Fragment>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button
                variant="contained"
                onClick={handleRestart}
                sx={{ backgroundColor: '#FF6B6B', '&:hover': { backgroundColor: '#FF8E8E' } }}
              >
                Opnieuw
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/child/saar')}
                sx={{ borderColor: 'white', color: 'white' }}
              >
                Terug
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  if (!hasStarted) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #46178f 0%, #2b0b47 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <IconButton
              onClick={() => navigate('/child/saar')}
              sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', flex: 1 }}>
              {isRandom ? 'Random tafels' : `Tafel van ${tableNumber}`}
            </Typography>
          </Box>
          <Paper sx={{ p: 4, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '20px' }}>
            <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>Kies modus</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant={mode === 'practice' ? 'contained' : 'outlined'}
                onClick={() => setMode('practice')}
                sx={{ backgroundColor: mode === 'practice' ? '#FF6B6B' : 'transparent', color: 'white' }}
              >
                Oefenen
              </Button>
              <Button
                variant={mode === 'test' ? 'contained' : 'outlined'}
                onClick={() => setMode('test')}
                sx={{ backgroundColor: mode === 'test' ? '#FF6B6B' : 'transparent', color: 'white' }}
              >
                Toets
              </Button>
            </Box>

            {mode === 'practice' ? (
              <>
                <Typography sx={{ color: 'white', mb: 2 }}>Kies: Random of een specifieke tafel</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Button size="small" variant={isRandom ? 'contained' : 'outlined'} onClick={() => navigate('/tables/random')} sx={{ color: 'white' }}>Random</Button>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <Button key={n} size="small" variant={!isRandom && tableNumber === n ? 'contained' : 'outlined'} onClick={() => navigate(`/tables/${n}`)} sx={{ color: 'white' }}>{n}</Button>
                  ))}
                </Box>
                <Button variant="contained" onClick={() => { setTimed(false); handleStart(); }} sx={{ backgroundColor: '#FF6B6B', '&:hover': { backgroundColor: '#FF8E8E' } }}>
                  Start
                </Button>
              </>
            ) : (
              <>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                  <Box>
                    <Typography sx={{ color: 'white', mb: 1 }}>Aantal sommen</Typography>
                    <select value={numQuestions} onChange={(e) => setNumQuestions(parseInt(e.target.value))} style={{ padding: 8, borderRadius: 8 }}>
                      {Array.from({ length: 10 }, (_, i) => (i + 1) * 10).map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </Box>
                  <Box>
                    <Typography sx={{ color: 'white', mb: 1 }}>Op tijd</Typography>
                    <select value={timed ? 'ja' : 'nee'} onChange={(e) => setTimed(e.target.value === 'ja')} style={{ padding: 8, borderRadius: 8 }}>
                      <option value="ja">Ja</option>
                      <option value="nee">Nee</option>
                    </select>
                  </Box>
                </Box>
                {timed && (
                  <Box sx={{ mb: 2 }}>
                    <Typography sx={{ color: 'white', mb: 1 }}>Timer (seconden)</Typography>
                    <select value={timerSeconds} onChange={(e) => setTimerSeconds(parseInt(e.target.value))} style={{ padding: 8, borderRadius: 8 }}>
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </Box>
                )}
                <Button variant="contained" onClick={() => { setTimed(timed); handleStart(); }} sx={{ backgroundColor: '#FF6B6B', '&:hover': { backgroundColor: '#FF8E8E' } }}>
                  Start
                </Button>
              </>
            )}
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
              {effectiveIsRandom ? 'Random tafels' : `Tafel van ${tableNumber}`}
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
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {medalVisible && <Medal>🏅</Medal>}

            <Typography
              variant="h1"
              sx={{
                color: 'white',
                mb: 2,
                fontSize: '4rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {effectiveIsRandom
                ? `${(currentQuestion as { a: number; b: number }).a} × ${(currentQuestion as { a: number; b: number }).b} = ?`
                : `${currentQuestion as number} × ${tableNumber} = ?`}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 1 }}>
              <TextField
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                variant="outlined"
                sx={{
                  width: '200px',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    borderRadius: '10px',
                  },
                }}
                autoFocus
              />
              <IconButton
                onClick={toggleShuffle}
                sx={{
                  color: 'white',
                  backgroundColor: isShuffled ? '#FF6B6B' : 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: isShuffled ? '#FF8E8E' : 'rgba(255,255,255,0.2)',
                  },
                }}
              >
                <ShuffleIcon />
              </IconButton>
            </Box>

            {mode === 'test' && timed && (
            <LinearProgress
              variant="determinate"
              value={progressValue}
              sx={{
                height: 10,
                borderRadius: '5px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #FFD166 0%, #FF6B6B 100%)',
                },
              }}
            />)}
            {mode === 'test' && timed && (
              <Typography
                variant="caption"
                sx={{ color: 'white', display: 'block', mt: 1 }}
              >
                Nog {(timeLeftMs / 1000).toFixed(1)}s
              </Typography>
            )}

            {showError && (
              <Alert
                severity="error"
                sx={{
                  mt: 2,
                  borderRadius: '10px',
                }}
              >
                Probeer het nog eens!
              </Alert>
            )}

            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                  }}
                >
                  Score: {score}/{Array.isArray(questions) ? (questions as any[]).length : 10}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  {mode === 'test' ? <span role="img" aria-label="medaille">🏅</span> : null} {mode === 'test' ? medalCount : null}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: 'white',
                }}
              >
                Vraag {currentQuestionIndex + 1} van {Array.isArray(questions) ? (questions as any[]).length : 10}
              </Typography>
            </Box>
          </Paper>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            <StyledButton
              key="random"
              variant="contained"
              onClick={() => navigate(`/tables/random`)}
              sx={{
                background: isRandom
                  ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)'
                  : 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
              }}
            >
              🎲
            </StyledButton>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <StyledButton
                key={num}
                variant="contained"
                onClick={() => navigate(`/tables/${num}`)}
                sx={{
                  background: (!isRandom && num === tableNumber)
                    ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)'
                    : 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
                }}
              >
                {num}
              </StyledButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TablesScreen; 