import React, {useState} from "react";

import './App.css';

// Componten imports
import Questions from "./Qustions";
import HomeScreen from "./HomeScreen";

// Mui imports
import Fade from '@mui/material/Fade';
import { Paper } from "@mui/material";
import Slide from '@mui/material/Slide';
import {ThemeProvider, createTheme} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff9800",
      light: "#ffc947",
      dark: "#c66900"
    },
    secondary: {
      main: "#424242",
      light: "#6d6d6d",
      dark: "#1b1b1b",
    }
  }
});

function App(){
  const [isQuizStarted, setIsQuizStarted] = useState(false)

  const handleStartQuiz = () => {
    setIsQuizStarted(true)
  }
  
  if(isQuizStarted) {
    return (
      <ThemeProvider theme={theme} >
        <Slide in={true} direction="right" style={{ transformOrigin: '0 0 0' }}{...(true ? { timeout: 750 } : {})}>
          <Paper className="paper-bg" elevation={8}>
            <Questions />
          </Paper>
        </Slide>
      </ThemeProvider>

    );
  }
  return (
    <ThemeProvider theme={theme} >
      <Fade in={true} style={{ transformOrigin: '0 0 0' }}{...(true ? { timeout: 1000 } : {})}>
        <Paper className="paper-bg" elevation={8} >
          <HomeScreen startQuiz={handleStartQuiz}/>
        </Paper>
      </Fade>
    </ThemeProvider>
  ); 
}

export default App;