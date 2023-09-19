"use client";
import { useRef } from "react";
import {
  Container,
  TextField,
  Typography,
  Grid,
  Box,
  Button,
  Link,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useAuthContext } from "@/app/context/auth/AuthProvider";

export default function ResetPassWord() {
  const { auth } = useAuthContext();
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
   const {result} = await auth.resetPassWord(emailRef.current);
    if (result === null){
        alert("email incorrect")
    }else {
        alert("check your email");
        
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      emailRef.current = value;
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset password
          </Button>
        </form>

        <Grid container>
          <Grid item>
            <Link href="/login" variant="body2">
              {"Remember your password?"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
