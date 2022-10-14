import Image from "next/image";
import React from "react";
import styles from "../styles/Login.module.css";
import Head from "next/head";
import Link from "next/link";
const login = () => {
  return (
    <div className={styles.container}>
      <main>
        <h1 style={{marginLeft:"5vmax",color:"#446e90"}}>Uncode.</h1>
        <div className={styles.myParentDiv}>
          <div className={styles.childDiv1}>
            <Image src="/login1_next.jpg" width={800} height={850} alt="" />
          </div>
          <div className={styles.childDiv2}>
            <span className={styles.myH1}>Welcome Back!</span>
            <input
              type="email"
              name=""
              id=""
              placeholder="Enter Email"
              className={styles.myInput}
            />
            <input
              type="password"
              name=""
              id=""
              placeholder="Enter Password"
              className={styles.myInput}
            />
            <a href="#" className={styles.myButton}>
              Sign In
            </a>
            <div>
              <h3 className={styles.myH3}>
                <span style={{ marginRight: "2px" }}>
                  
                  Don&apos;t Have an account?
                </span>
                <Link href="/">
                  <a style={{color:"#d45472"}}>Sign Up</a>
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

export default login;
