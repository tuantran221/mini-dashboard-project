"use client";

export default function Profile() {
  const showUserName = () => {
    const userInf = JSON.parse(localStorage.getItem("token"));
    return <h2>{userInf.userName}</h2>;
  };
  return <div>{showUserName()}</div>;
}
