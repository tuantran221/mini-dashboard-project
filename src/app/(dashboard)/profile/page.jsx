"use client";
import { useAuthContext } from "@/app/context/auth/AuthProvider";

export default function Profile(){
    const {user} = useAuthContext();

    const showUserName = () => {
      if (user !== null) {
        return <h2>{user}</h2>;
      } else {
        return null;
      }
    };
    return (
        <div>{showUserName()}</div>
    )
}