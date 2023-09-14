"use client";
import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "../context/theme/ThemeProvider";

export default function DashboardLayout({ children }) {
  const router = useRouter();

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

  const [open, setOpen] = useState(false);

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
        <main style={{ paddingTop: "64px",paddingLeft: "20px" }}>{children}</main>
      </Box>
    </ThemeProvider>
  );
}
