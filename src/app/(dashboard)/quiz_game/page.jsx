"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { QuestionCard } from "@/app/components/QuestionCard";
import multipleChoiceQuestions from "@/app/questions_data/MultipleCoiceQuestion";
export default function QuizGame() {
  const [startQuiz, setStartQuiz] = useState(false);
  console.log("start", startQuiz);
  return (
    <div style={{ paddingTop: "64px" }}>
      {startQuiz === false ? (
        <div>
          <h2>Quiz Game</h2>
          <Button
            variant="contained"
            onClick={() => {
              setStartQuiz(!startQuiz);
            }}
          >
            start game
          </Button>
        </div>
      ) : (
        <div>
          multiple choices
          <Button
            variant="contained"
            onClick={() => {
              setStartQuiz(!startQuiz);
            }}
          >restart game</Button>
        </div>
      )}
    </div>
  );
}
