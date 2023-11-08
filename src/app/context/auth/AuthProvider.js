"use client";
import React, { createContext, useContext } from "react";
import useFirebaseAuth from "@/firebase/lib/useFirebaseAuth";
import LoadingSpinner from "@/app/components/LoadingSpinner";
export const AuthContext = createContext({ authUser: null, loading: true });

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <AuthContext.Provider value={{ auth }}>
      {auth.loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
