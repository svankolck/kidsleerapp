import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Paper, Typography, Button, IconButton, TextField, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type SessionItem = {
  completedAt: string;
  mode: string;
  totalScore: number;
  medals: number;
  durationMs: number;
  items: Array<{ a: number; b: number; correct: number; timeMs: number; firstTryCorrect: boolean; medal: boolean }>;
  childName?: string;
};

const AdminExportScreen: React.FC = () => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [child, setChild] = useState('');
  const [assignment, setAssignment] = useState('tables');

  const sessions: SessionItem[] = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('tablesResults') || '[]');
    } catch {
      return [];
    }
  }, []);

  const childOptions = useMemo(() => {
    const set = new Set<string>();
    sessions.forEach(s => { if (s.childName) set.add(s.childName); });
    return Array.from(set);
  }, [sessions]);

  const filtered = useMemo(() => {
    return sessions.filter(s => {
      if (assignment === 'tables' && !s.mode.startsWith('table') && s.mode !== 'random') return false;
      if (child && s.childName !== child) return false;
      if (fromDate && new Date(s.completedAt) < new Date(fromDate)) return false;
      if (toDate && new Date(s.completedAt) > new Date(toDate)) return false;
      return true;
    });
  }, [sessions, fromDate, toDate, child, assignment]);

  const exportCsv = () => {
    const rows: string[] = [];
    rows.push(['completedAt','childName','mode','totalScore','medals','durationMs','a','b','correct','timeMs','firstTryCorrect','medal'].join(','));
    filtered.forEach(s => {
      s.items.forEach(it => {
        rows.push([
          s.completedAt,
          s.childName || '',
          s.mode,
          String(s.totalScore),
          String(s.medals),
          String(s.durationMs),
          String(it.a),
          String(it.b),
          String(it.correct),
          String(it.timeMs),
          it.firstTryCorrect ? 'true' : 'false',
          it.medal ? 'true' : 'false',
        ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','));
      });
    });
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #46178f 0%, #2b0b47 100%)', py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <IconButton
            onClick={() => navigate('/admin')}
            sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', flex: 1 }}>
            Exporteren resultaten
          </Typography>
        </Box>

        <Paper sx={{ p: 4, borderRadius: '20px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 2 }}>
            <TextField
              type="date"
              label="Vanaf"
              InputLabelProps={{ shrink: true }}
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
              sx={{ background: 'white', borderRadius: '8px' }}
            />
            <TextField
              type="date"
              label="Tot"
              InputLabelProps={{ shrink: true }}
              value={toDate}
              onChange={e => setToDate(e.target.value)}
              sx={{ background: 'white', borderRadius: '8px' }}
            />
            <TextField
              select
              label="Kind"
              value={child}
              onChange={e => setChild(e.target.value)}
              sx={{ background: 'white', borderRadius: '8px' }}
            >
              <MenuItem value="">Alle</MenuItem>
              {childOptions.map(c => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Opdracht"
              value={assignment}
              onChange={e => setAssignment(e.target.value)}
              sx={{ background: 'white', borderRadius: '8px' }}
            >
              <MenuItem value="tables">Tafels</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button variant="contained" onClick={exportCsv} sx={{ backgroundColor: '#FF6B6B', '&:hover': { backgroundColor: '#FF8E8E' } }}>
              Exporteren (CSV)
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminExportScreen;

