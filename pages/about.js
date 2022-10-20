import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import Link from "next/link";
const About = ({ token }) => {
  const router = useRouter();
  const [message, setmessage] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
  });
  const [notLoggedin, setnotLoggedin] = useState("");
  const [auth, setauth] = useState(null);
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
  
        if (!mydata.success) {
          setnotLoggedin("You are not logged in");
        } else {
          setauth(true);
          // setmessage(`Welcome, ${mydata.user.firstName}!`);
          setmessage({ ...mydata.user });
        }
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
    setauth(false);
    alert("Successfully logged out!");
    router.push("/login");
  };
  let mylog;
  if (auth) {
    return (mylog = (
      <div style={{ textAlign: "center" }}>
        <h1>
          {" "}
          <span style={{ color: "#d45472" }}>Welcome to</span>{" "}
          <span style={{ color: "#446e90" }}>Uncode</span>{" "}
        </h1>
        <h2>
          {" "}
          Name: {message.firstName} {message.lastName}{" "}
        </h2>
        <h2> Email: {message.username} </h2>
        <h2>Phone Number: {message.phoneNumber} </h2>
        <button onClick={logoutHandler} className={styles.myButton}>
          Log Out
        </button>
      </div>
    ));
  } else {
    mylog = (
      <div>
        <h1 style={{ color: "#446e90" }}>{notLoggedin}</h1>
        <Link href="/login">
          <button className={styles.myButton}>Log in</button>
        </Link>
      </div>
    );
  }
  return (
    <div style={{ textAlign: "center" }}>
      {mylog}
      <br />
    </div>
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
