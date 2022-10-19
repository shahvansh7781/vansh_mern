import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const About = ({ token }) => {
  const router = useRouter();
  const [message, setmessage] = useState("");

  useEffect(() => {
    dataHandler();
  }, []);
  const dataHandler = async () => {
    try {
      const myResponse = await fetch("/api/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      });
      const mydata = await myResponse.json();
      // console.log(mydata);
      if (!mydata.success) {
        setmessage("You are not logged in!");
      }
      console.log(mydata.user.firstName);
      setmessage(`Welcome, ${mydata.user.firstName}!`);
    } catch (error) {
      alert(error);
    }
    
  };
  const logoutHandler = async () => {
    await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    });
    alert("Successfully logged out");
    router.push("/login");
  };
  return (
    <>
      <h1>{message}</h1>
      <button onClick={logoutHandler}>Log Out</button>
      <br />
    </>
  );
};

export default About;

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  return {
    props: {
      token: cookies || "",
    },
  };
}
