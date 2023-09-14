"use client";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [openSnack, setOpenSnack] = useState(false)

  const accountUser = {
    userName: "trieutuan22012001@gmail.com",
    passWord: "123456",
  };

  const login = (username, password) => {
    setUser(username);
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
      setOpenSnack(false)
    }else{
      setOpenSnack(true)
    }
  };

  const logOut = () => {
    localStorage.clear();
    router.push("/login");
  };
  const handleCloseSnackBar = () => {
    setOpenSnack(false);
  };
  return (
    <AuthContext.Provider value={{ user,openSnack, login, logOut,handleCloseSnackBar }}>
      {children}
    </AuthContext.Provider>
  );
}
