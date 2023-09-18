"use client";
import React, { createContext, useContext } from "react";
import useFirebaseAuth from "@/firebase/lib/useFirebaseAuth";
export const AuthContext = createContext({ authUser: null, loading: true });

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <AuthContext.Provider value={{ auth }}>
     {children}
    </AuthContext.Provider>
  );
};
