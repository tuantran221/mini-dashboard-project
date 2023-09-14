"use client";
import { useAuthContext } from "@/app/context/auth/AuthProvider";
import Typography from "@mui/material/Typography";
export default function Profile(){
    const {accountUser} = useAuthContext();
    const showUserName = () => {
      if (accountUser !== null) {
        return <h2>{accountUser.userName}</h2>;
      } else {
        return null;
      }
    };
    return (
        <div>{showUserName()}</div>
    )
}