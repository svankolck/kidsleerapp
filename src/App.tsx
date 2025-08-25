import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomeScreen from './screens/HomeScreen';
import ChildScreen from './screens/ChildScreen';
import TablesScreen from './screens/TablesScreen';
import SpellingScreen from './screens/SpellingScreen';
import RekenScreen from './screens/RekenScreen';
import PlusScreen from './screens/PlusScreen';
import PlusMeerkeuze1Screen from './screens/PlusMeerkeuze1Screen';
import PlusMeerkeuze2Screen from './screens/PlusMeerkeuze2Screen';
import PlusMeerkeuze3Screen from './screens/PlusMeerkeuze3Screen';
import PlusInvullenScreen from './screens/PlusInvullenScreen';
import PlusVlekScreen from './screens/PlusVlekScreen';
import PlusTempotoetsScreen from './screens/PlusTempotoetsScreen';
import PlusDiplomaScreen from './screens/PlusDiplomaScreen';
import JoepScreen from './screens/JoepScreen';
import LettersScreen from './screens/LettersScreen';
import JoepRekenenScreen from './screens/JoepRekenenScreen';
import AdminScreen from './screens/AdminScreen';
import AdminExportScreen from './screens/AdminExportScreen';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/child/:name" element={<ChildScreen />} />
          <Route path="/tables/:table" element={<TablesScreen />} />
          <Route path="/spelling/:category" element={<SpellingScreen />} />
          <Route path="/rekenen" element={<RekenScreen />} />
          <Route path="/rekenen/plus" element={<PlusScreen />} />
          <Route path="/rekenen/plus/meerkeuze1" element={<PlusMeerkeuze1Screen />} />
          <Route path="/rekenen/plus/meerkeuze2" element={<PlusMeerkeuze2Screen />} />
          <Route path="/rekenen/plus/meerkeuze3" element={<PlusMeerkeuze3Screen />} />
          <Route path="/rekenen/plus/invullen" element={<PlusInvullenScreen />} />
          <Route path="/rekenen/plus/vlek" element={<PlusVlekScreen />} />
          <Route path="/rekenen/plus/tempotoets" element={<PlusTempotoetsScreen />} />
          <Route path="/rekenen/plus/diploma" element={<PlusDiplomaScreen />} />
          <Route path="/child/joep/games" element={<JoepScreen />} />
          <Route path="/child/joep/letters" element={<LettersScreen />} />
          <Route path="/child/joep/woordjes" element={<LettersScreen />} />
          <Route path="/child/joep/letterspel" element={<LettersScreen />} />
          <Route path="/child/joep/cijfers" element={<LettersScreen />} />
          <Route path="/child/joep/rekenen" element={<JoepRekenenScreen />} />
          <Route path="/child/joep/schrijven" element={<LettersScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/admin/export" element={<AdminExportScreen />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 