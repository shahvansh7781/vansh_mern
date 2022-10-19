import React from "react";
import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();
  const { user } = router.query;
  const logoutHandler = async () => {
    const response = await fetch("/api/logout");
    const data = await response.json();
    if (data.success) {
      alert(data.message);
      router.push("/");
    }
  };
  return (
    <>
      <h1>Welcome, {user}!</h1>
      <button onClick={logoutHandler}>Log Out</button>
    </>
  );
};

export default User;
