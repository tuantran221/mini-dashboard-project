"use client";
import { createContext, useContext, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // handle function light/dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  
  // create type of theme
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
