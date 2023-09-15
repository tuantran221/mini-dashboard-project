"use client";
import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "../context/theme/ThemeProvider";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const router = useRouter(); //using useRouter to route page

  // check if the user is logged in or not
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token")) === null) {
      router.push("/login");
    } else {
      window.history.pushState(null, window.location);
      window.onpopstate = function () {
        window.history.pushState(null, window.location);
      };
    }
  });

  // handle open and close SideBar
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
        <SideBar open={open} handleDrawerClose={handleDrawerClose} />
        <main
          style={{
            paddingTop: "80px",
            paddingLeft: "20px",
            height: "100vh",
            width: "100%",
          }}
        >
          {children}
        </main>
      </Box>
    </ThemeProvider>
  );
}
