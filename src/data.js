export const questions = [
  {
    questionText: "How much do you train every week?",
    answerOptions: [
      { answerText: "2-3 times", trainingAmount: "beginner"},
      { answerText: "3-4 times", trainingAmount: "intermediate"},
      { answerText: "4-6 times", trainingAmount: "advanced"},
    ]
  },
  {
    questionText: "What type of training do you want to focus on?",
    answerOptions: [
      { answerText: "Weight lifting", trainingType: "weightLifting"},
      { answerText: "Weight loss", trainingType: "weightLoss"},
      { answerText: "Conditioing", trainingType: "conditioing"},
    ]
  },
  {
    questionText: "What level of training do you want to aim for?",
    answerOptions: [
      { answerText: "Keep on going where im at", goalTrainingAmount: 0},
      { answerText: "Go one step up", goalTrainingAmount: 1},
      { answerText: "Climb to the top of the ladder", goalTrainingAmount: 2},
    ]
  },
]


//TODO Hitta "intermediate" sidor + fler sidor till allt.
export const result = {
  weightLifting: {
    beginner: {
      1: "https://www.verywellfit.com/complete-beginners-guide-to-strength-training-1229585",
      2: "https://www.healthline.com/health/how-to-start-lifting-weights#weight-training-exercises"
    },
    intermediate: {
      1: "www.example1.com",
      2: "www.example2.com"
    },
    advanced: {
      1: "https://www.muscleandstrength.com/workouts/finishing-strong-ultimate-8-week-workout-for-advanced-lifters"
    },

  },
  weightLoss: {
    beginner: {
      1: "https://betterme.world/articles/how-to-start-losing-weight-for-beginners/"
    },
    intermediate: {
      1: "www.example1.com",
      2: "www.example2.com"
    },
    advanced: {
      1: "https://jerseystrong.com/blog/lose-weight-fast/"
    },

  },
  conditioing: {
    beginner: {
      1: "https://www.healthline.com/health/exercise-fitness/body-conditioning#exercises"
    },
    intermediate: {
      1: "www.example1.com",
      2: "www.example2.com"
    },
    advanced: {
      1: "https://www.rehab.research.va.gov/mono/lowerlimb/conditioning.pdf"
    },
  }
}