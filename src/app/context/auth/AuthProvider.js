"use client";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const accountUser = {
    userName: "trieutuan22012001@gmail.com",
    passWord: "123456",
  };
  const router = useRouter();
  const [user, setUser] = useState(null);
  console.log("user", user);
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
    }
  };
  const logOut = () => {
    localStorage.clear();
    router.push("/login");
  };
  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
