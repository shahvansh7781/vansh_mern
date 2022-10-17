import Image from "next/image";
import React from "react";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { useState } from "react";
const Login = () => {
  const [loginDetails, setloginDetails] = useState({
    email: "",
    password: "",
  });
  const loginHandler = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...loginDetails }),
    });

    const data = await response.json();
    console.log(data);
    console.log(data.success);
    if (!data.success) {
      alert(data.error);
    } else {
      alert(data.message);
    }
    setloginDetails({
      email: "",
      password: "",
    });
  };
  return (
    <div className={styles.container}>
      <main>
        <h1 style={{ marginLeft: "5vmax", color: "#446e90" }}>Uncode.</h1>
        <div className={styles.myParentDiv}>
          <div className={styles.childDiv1}>
            <Image src="/login1_next.jpg" width={800} height={850} alt="" />
          </div>
          <div className={styles.childDiv2}>
            <span className={styles.myH1}>Welcome Back!</span>
            <div>
              <form
                method="post"
                onSubmit={loginHandler}
                className={styles.myLoginform}
                autoComplete="on"
              >
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="Enter Email"
                  className={styles.myInput}
                  value={loginDetails.email}
                  onChange={(e) => {
                    setloginDetails({ ...loginDetails, email: e.target.value });
                  }}
                />
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Enter Password"
                  className={styles.myInput}
                  value={loginDetails.password}
                  onChange={(e) => {
                    setloginDetails({
                      ...loginDetails,
                      password: e.target.value,
                    });
                  }}
                />
                {/* <Link href="/api/login">
            <a className={styles.myButton} onClick={loginHandler}>
              Sign In
            </a>
            </Link> */}
                <button type="submit" className={styles.myButton}>
                  Sign In
                </button>
              </form>
            </div>
            <div>
              <h3 className={styles.myH3}>
                <span style={{ marginRight: "2px" }}>
                  Don&apos;t Have an account?
                </span>
                <Link href="/">
                  <a style={{ color: "#d45472" }}>Sign Up</a>
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        Made With
        <span className={styles.logo}>
          <Image src="/heart32.png" alt="" width={18} height={18} />
        </span>
        &nbsp; by Vansh
      </footer>
    </div>
  );
};

export default Login;
