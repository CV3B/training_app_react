import React from "react";

import './App.css';

// Mui imports
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';

function HomeScreen(props) {
  return(
    <div className="hs-content">
      <Grow in={true} timeout={1500}>
        <Typography variant="h2" >Get training tips</Typography>
      </Grow>
      <Grow in={true} style={{ transformOrigin: '0 0 0' }}{...(true ? { timeout: 1500 } : {})}>
        <Button size="large" variant="contained" sx={{ margin: 2 }} onClick={props.startQuiz}>START</Button>
      </Grow>
      <Typography variant="body2" className="developers">Av: Calle & Emil</Typography>
    </div>
  )
}

export default HomeScreen;