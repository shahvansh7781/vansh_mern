import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import Link from "next/link";
const About = ({ token }) => {
  const router = useRouter();
  const [message, setmessage] = useState("");
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
        setmessage("You are not logged in!");
      } else {
        setauth(true);
        // console.log(mydata.user.firstName);
        setmessage(`Welcome, ${mydata.user.firstName}!`);
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
    alert("Successfully logged out");
    router.push("/login");
  };
  let mylog;
  if (auth) {
    mylog = (
      <button onClick={logoutHandler} className={styles.myButton}>
        Log Out
      </button>
    );
  } else {
    mylog = (
      <Link href="/login">
        <button className={styles.myButton}>Log in</button>
      </Link>
    );
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1>{message}</h1>
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
