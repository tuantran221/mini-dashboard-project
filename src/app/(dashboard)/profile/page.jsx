"use client";
import { useAuthContext } from "@/app/context/auth/AuthProvider";

export default function Profile() {
  const { user } = useAuthContext();

  const showUserName = () => {
    const userInf = JSON.parse(localStorage.getItem("token"));
    return <h2>{userInf.userName}</h2>;
  };
  return <div>{showUserName()}</div>;
}
