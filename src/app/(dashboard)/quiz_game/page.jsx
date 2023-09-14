"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { quiz } from "@/app/questions_data/MultipleChoiceQuestion";

export default function QuizGame() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [checkCorrect, setCheckCorrect] = useState();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [seconds, setSeconds] = useState(5); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(intervalId);
        
      }
    }, 1000);

    return () => {
      clearInterval(intervalId); 
    };
    
  }, [seconds]);

  const displayResultAnwser = () => {
    if (checkCorrect === true) {
      return (
        <Typography variant="h6" sx={{ color: "green" }}>
          correct answer
        </Typography>
      );
    } else if (checkCorrect === false) {
      return (
        <Typography variant="h6" sx={{ color: "red" }}>
          wrong answer
        </Typography>
      );
    } else if (seconds === 0){
      return (
        <Typography variant="h6" sx={{ color: "red" }}>Time up</Typography>
      )
    }
  };
  // console.log(selectedAnswerIndex);
  // --------- store data -----------
  const { questions } = quiz;
  const { question, choices, correctAnswer, numberQuestion } =
    questions[activeQuestion];
  // console.log(correctAnswer)

  // ---------- handle function ------
  const onClickNext = () => {
    setCheckCorrect(null);
    setSelectedAnswerIndex(null);
    setActiveQuestion((prev) => prev + 1);
    setSeconds(5)
    if (activeQuestion === questions.length - 1) {
      setStartQuiz(false);
      setActiveQuestion(0);
    }
  };
  const onCheckError = (answer, index) => {
    // console.log(answer)
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setCheckCorrect(true);
    } else {
      setCheckCorrect(false);
    }
  };

  const suffleQuestion = () => {
    setStartQuiz(!startQuiz);
    questions.sort((a, b) => 0.5 - Math.random());
  };
  return (
    <div style={{ paddingTop: "70px", paddingLeft: "20px" }}>
      {startQuiz === false ? (
        <div>
          <h2>Quiz Game</h2>
          <Button variant="contained" onClick={suffleQuestion}>
            start game
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="h6">
            <span style={{ marginRight: "8px" }}>{numberQuestion}</span>
            <span>{question}</span>
          </Typography>
          <List>
            {choices.map((answer, index) => (
              <ListItem
                onClick={() => onCheckError(answer, index)}
                key={answer}
              >
                <ListItemButton
                  style={{
                    border:
                      selectedAnswerIndex === index
                        ? checkCorrect === true
                          ? "2px solid green"
                          : "2px solid red"
                        : null,
                  }}
                  sx={{
                    "&:hover": {
                      border: "1px solid black",
                    },
                  }}
                >
                  <ListItemText> {answer}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Typography>{seconds}</Typography>
          {displayResultAnwser()}

          <div>
            <Button
              variant="contained"
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null || seconds === 0}
            >
              {activeQuestion === questions.length - 1
                ? "restart question"
                : "Next Question"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
