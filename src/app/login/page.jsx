"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuthContext } from "../context/auth/AuthProvider";
export default function Page() {
  const {accountUser} = useAuthContext();
  // const accountUser = {
  //   userName: "trieutuan22012001@gmail.com",
  //   passWord: "123456",
  // };
  const router = useRouter();

  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      usernameRef.current = value;
    } else if (name === "password") {
      passwordRef.current = value;
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };

    // Validate username (must be an email with at least 8 characters)
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameRef.current) ||
      usernameRef.current.length < 8
    ) {
      newErrors.username =
        "Username must be a valid email with at least 8 characters.";
      isValid = false;
    }

    // Validate password (must have at least 6 characters)
    if (passwordRef.current.length < 6) {
      newErrors.password = "Password must have at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (
        usernameRef.current === accountUser.userName &&
        passwordRef.current === accountUser.passWord
      ) {
        router.push("/");
        const key = "token";
        const value = {
          userName: usernameRef.current,
          passWord: passwordRef.current,
        };
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleInputChange}
            error={Boolean(errors.username)}
            helperText={errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
