"use client";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

export default function Profile() {
  const [userName, setUserName] = useState("");
  
  // get username of user from localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let userInf = JSON.parse(localStorage.getItem("token"));
      setUserName(userInf.userName);
    }
  }, []);

  return (
    <div>
      <Typography variant="h5">{userName}</Typography>
    </div>
  );
}
