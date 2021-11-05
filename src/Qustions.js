import React, {useState, useCallback} from "react";

import { questions, result } from './data';

// Mui imports
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Fade from '@mui/material/Fade';

const useStyles = makeStyles((theme) => ({
  backButton: {
    position: "absolute",  
    bottom: 0,
    left: 0,
  },
  instructions: {
    marginTop: 30,
    marginBottom: 10,
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}));

//* Funktionen loopar genom alla frågor som finns i "data.js -> questions" och visar dem för användaren, samt vilket steg användaren är på.
function getSteps() {
  let arr = []
  for (let i=0; i<questions.length; i++) {
    arr.push("Question " + (i+1))
  }
  return arr;
}

//* Compontenet funktionen hanterar all input användaren gör via knapp alternativen, samt visar frågerna.
function StepContent(props) {
  
  const handleSetAnswer = useCallback((answerOptions) => {
    props.handleNext();

    let newTrainingAmount;

    const difficulties = {
      "beginner": 0,
      "intermediate": 1,
      "advanced": 2,
    }

    //* Orkar inte hitta en annan lösning.
    if(answerOptions.trainingAmount !== undefined) {
      props.setAnswers(prevState => [...prevState, answerOptions.trainingAmount]);
    }
    if(answerOptions.trainingType !== undefined) {
      props.setAnswers(prevState => [...prevState, answerOptions.trainingType]);
    }
    if(answerOptions.goalTrainingAmount !== undefined) {
      switch(answerOptions.goalTrainingAmount) {
        case 1:
          newTrainingAmount = (difficulties[props.answers[0]]+1);
          if(newTrainingAmount < difficulties[Object.keys(difficulties)[Object.keys(difficulties).length - 1]]) { //Tittar så att inte newTrainingAmount är större än största talet i difficulties
            newTrainingAmount = Object.keys(difficulties)[newTrainingAmount];
          } else newTrainingAmount = props.answers[0]
          props.setAnswers([newTrainingAmount, props.answers[1], ...props.answers]);
          return;
        case 2:
          // newTrainingAmount = (difficulties[props.answers[0]]+2);
          // newTrainingAmount = Object.keys(difficulties)[newTrainingAmount];
          newTrainingAmount = "advanced"
          props.setAnswers([newTrainingAmount, props.answers[1], ...props.answers]);
          return;
        default:
          return;
      }
    }
  }, [props]);
    
  return (
    <div>
      <Typography variant="h5" color="secondary" sx={{ marginBottom: 2}} component="div">
        {questions[props.stepIndex].questionText}
      </Typography>
      <div>
        { questions[props.stepIndex].answerOptions.map((answerOptions) => (
          <Grid container direction="column" justifyContent="center" sx={{margin: 1}} key={answerOptions.answerText}>
            <Button variant="outlined" onClick={() => handleSetAnswer(answerOptions)} key={answerOptions.trainingType} >{answerOptions.answerText}</Button>
          </Grid>
        )) }
      </div>
    </div>
  );
}

//* Compontenet funktionen visar svaren som har tagits emot som input ifrån frågerna.
function ResultContent(props) {

  return(
    <div>
      <Typography variant="h6" color="secondary" key={props}>Here you have site(s) to get you started on your jounrey</Typography>
      <Typography variant="subtitle1" key={props.answers[0]}>Here are some {props.answers[0]} based training sites for you:</Typography>

      {Object.entries(result[props.answers[1]][props.answers[0]]).map(([key, siteUrl]) => {
        // console.log(`${key} ${siteUrl}`);
        let domain;
        try {
          domain = (new URL(siteUrl));
        } catch {
          console.log("URL not found")
        }

        return(
          <Typography variant="body1" sx={{ margin: 2}} key={domain} >
            <li key={siteUrl}>
              <Link href={siteUrl} underline="none" target="_blank" rel="noopener" key={key}>{domain ? domain.hostname : siteUrl}</Link>
            </li>
          </Typography>
        );
      })}
    </div>
  );
}

//* Compontenet funktionen skapar och visar alla fråger och resultat, samt hanterar majoriteten av datan.
function Questions() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [startResetAnim, setStartResetAnim] = useState(false);
  // const [isFinished, setIsFinished] = useState(false);
  
  const steps = getSteps();
  const classes = useStyles();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setAnswers([])
    setStartResetAnim(true)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setAnswers((answers) => answers.filter((_, i) => i !== answers.length - 1)) //* Tar bort sista elementet i "answers" array:en.
  };

  // useEffect(() => {
  //   if(activeStep === steps.length) setIsFinished(true)

  // }, [activeStep, steps]);

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions} color="secondary" >All steps completed</Typography>
            <ResultContent stepIndex={activeStep} answers={answers} />
            <Button className={classes.backButton} color="secondary" onClick={handleReset} >Reset</Button>
          </div>
        ) : (
          <div>
            <Fade in appear={startResetAnim} timeout={750}>
              <Typography className={classes.instructions} component="div">
                <StepContent stepIndex={activeStep} handleNext={handleNext} setAnswers={setAnswers} answers={answers}/>
              </Typography>
            </Fade>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
                color="secondary"
              >
                Back
              </Button>
              {/* <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;