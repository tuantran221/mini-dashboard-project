"use client";

import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

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
