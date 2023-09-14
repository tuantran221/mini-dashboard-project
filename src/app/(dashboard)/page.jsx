"use client";
import React from "react";
import { useAuthContext } from "../context/auth/AuthProvider";
export default function Home() {
  const {accountUser} = useAuthContext();
  const showUserName = () => {
    if (accountUser !== null) {
      return <h1>{accountUser.userName}</h1>;
    } else {
      return null;
    }
  };

  return <div >{showUserName()}</div>;
}
