"use client";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const router = useRouter();
  const [openSnack, setOpenSnack] = useState(false);

  // hard account for login dashboard
  const accountUser = {
    userName: "trieutuan22012001@gmail.com",
    passWord: "123456",
  };

  // handle login to dashboar
  const login = (username, password) => {
    if (
      username === accountUser.userName &&
      password === accountUser.passWord
    ) {
      router.push("/");
      const key = "token";
      const value = {
        userName: username,
        passWord: password,
      };
      localStorage.setItem(key, JSON.stringify(value));
      setOpenSnack(false);
    } else {
      setOpenSnack(true);
    }
  };
  // handle logOut dashboard
  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  // handle clode snackbar
  const handleCloseSnackBar = () => {
    setOpenSnack(false);
  };

  return (
    <AuthContext.Provider
      value={{ openSnack, login, logOut, handleCloseSnackBar }}
    >
      {children}
    </AuthContext.Provider>
  );
}
