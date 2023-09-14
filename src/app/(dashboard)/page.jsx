"use client";
import React from "react";
import Button from "@mui/material/Button";
import { useThemeContext } from "../context/theme/ThemeProvider";
export default function Home() {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        height: "100%",
      }}
    >
      <Button
        variant="contained"
        sx={{ ml: 1 }}
        color="inherit"
        onClick={toggleTheme}
      >
        Toggle theme {isDarkMode ? "To Light" : "To Dark"}
      </Button>
    </div>
  );
}
