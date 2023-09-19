"use client";
import React, { useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/app/context/auth/AuthProvider";
export default function Page() {
  const { auth } = useAuthContext();
  const [openSnack, setOpenSnack] = useState(false);
  const router = useRouter();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // ----------- store username and password from user enter to input field --------------------
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

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

  // ---------------- handle form login-----------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      usernameRef.current = value;
    } else if (name === "password") {
      passwordRef.current = value;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
     
      const { result} = await auth.Login(
        usernameRef.current,
        passwordRef.current
      );
      if (result === null) {
        console.log("password incorrect");
        setOpenSnack(true)
      } else {
        // else successful
        console.log("account",result.user.email);
        return router.push("/");
      }
    }
  };
  // handle clode snackbar
  const handleCloseSnackBar = () => {
    setOpenSnack(false);
  };
  // ------------------------- View ------------------------

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh"
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
          <Grid container>
              <Grid item xs>
                <Link href="/reset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Box>
      <Snackbar
        open={openSnack}
        autoHideDuration={5000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Email or Password Incorrect
        </Alert>
      </Snackbar>
    </Container>
  );
}
