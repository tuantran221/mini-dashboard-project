'use client'
import React, {useState} from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  console.log(open)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
       <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
      <main>{children}</main>
    </Box>
  );
}
