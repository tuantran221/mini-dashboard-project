"use client"
import React, {createContext,useContext } from "react"

const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
  }
export function AuthProvider({children}){
    const accountUser = {userName: "trieutuan22012001@gmail.com", passWord: "123456"}
    return(
        <AuthContext.Provider value={{accountUser}}>
            {children}
        </AuthContext.Provider>
    )

}