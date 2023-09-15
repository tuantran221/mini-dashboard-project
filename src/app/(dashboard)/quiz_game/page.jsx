"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { quiz } from "@/app/questions_data/MultipleChoiceQuestion";

export default function QuizGame() {
  // ---------------store all states ---------------
  const [startQuiz, setStartQuiz] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [checkCorrect, setCheckCorrect] = useState();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [countdown, setCountDown] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState(false);

  // ------------ handle login countdown time -----------------
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdown > 0 && selectedAnswer === false) {
        setCountDown((prev) => prev - 1);
      } else if (selectedAnswer == true) {
        clearInterval(intervalId);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });
  // --------------- notified right or wrong answer View -----------------
  const displayResultAnwser = () => {
    if (checkCorrect === true) {
      return (
        <Typography variant="h6" sx={{ color: "green" }}>
          Good job! correct answer
        </Typography>
      );
    } else if (checkCorrect === false) {
      return (
        <Typography variant="h6" sx={{ color: "red" }}>
          wrong answer
        </Typography>
      );
    } else if (countdown === 0) {
      return (
        <Typography variant="h6" sx={{ color: "red" }}>
          Time up
        </Typography>
      );
    }
  };

  // --------- store data questions -----------
  const { questions } = quiz;
  const { question, choices, correctAnswer, numberQuestion } =
    questions[activeQuestion];

  // ---------- handle function ------
  const onClickNext = () => {
    setCheckCorrect(null);
    setSelectedAnswerIndex(null);
    setSelectedAnswer(false);
    setActiveQuestion((prev) => prev + 1);
    setCountDown(20);

    if (activeQuestion === questions.length - 1) {
      setStartQuiz(false);
      setActiveQuestion(0);
    }
  };

  const onCheckError = (answer, index) => {
    setSelectedAnswer(true);
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setCheckCorrect(true);
    } else {
      setCheckCorrect(false);
    }
  };
  // -----------shuffle questions function ------------
  const suffleQuestion = () => {
    setStartQuiz(!startQuiz);
    questions.sort((a, b) => 0.5 - Math.random());
  };

  // ------------------------- View ------------------------

  return (
    <div>
      {!startQuiz ? (
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
              <ListItem key={answer}>
                <Button
                  onClick={() => onCheckError(answer, index)}
                  style={{
                    textTransform: "none",
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
                    width: "500px",
                  }}
                  disabled={countdown === 0 || selectedAnswer === true}
                >
                  <ListItemText
                    sx={{
                      display: "flex",
                      textAlign: "start",
                      color: "inherit",
                    }}
                  >
                    {answer}
                  </ListItemText>
                </Button>
              </ListItem>
            ))}
          </List>
          <Typography>Time remaining: {countdown}</Typography>
          {displayResultAnwser()}
          {selectedAnswer === true || countdown === 0 ? (
            <div>
              <Button variant="contained" onClick={onClickNext}>
                {activeQuestion === questions.length - 1
                  ? "restart question"
                  : "Next Question"}
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
