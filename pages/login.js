import Image from "next/image";
import React from "react";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const Login = ({ token }) => {
  const router = useRouter();
  const [loginDetails, setloginDetails] = useState({
    username: "",
    password: "",
  });
  const changeHandler = (event) => {
    setloginDetails((prelogindetails) => {
      const { name, value } = event.target;
      return {
        ...prelogindetails,
        [name]: value,
      };
    });
  };
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
    if (!data.success) {
      toast.error(data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      if (token) {
        router.push("/about");
      }
    }
    // setloginDetails({
    //   username: "",
    //   password: "",
    // });
  };
  return (
    
    <div className={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <main>
        <h1 style={{ marginLeft: "5vmax", color: "#446e90" }}>Uncode.</h1>
        <div className={styles.myParentDiv}>
          <div className={styles.childDiv1}>
            <Image src="/login1_next.jpg" width={800} height={850} alt="" />
          </div>
          <div className={styles.childDiv2}>
            <span className={styles.myH1}>
              Welcome <span style={{ color: "#d45472" }}>Back!</span>{" "}
            </span>
            <div>
              <form
                method="post"
                onSubmit={loginHandler}
                className={styles.myLoginform}
                autoComplete="on"
              >
                <input
                  type="email"
                  name="username"
                  id=""
                  placeholder="Enter Email"
                  required
                  className={styles.myInput}
                  value={loginDetails.username}
                  onChange={changeHandler}
                />
                <input
                  type="password"
                  name="password"
                  id=""
                  placeholder="Enter Password"
                  required
                  className={styles.myInput}
                  value={loginDetails.password}
                  onChange={changeHandler}
                />
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

export async function getServerSideProps(context) {
  const cookies = await context.req.cookies;
  let auth;
  if (cookies) {
    await fetch("https://next-login-register.vercel.app/api/about", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cookies),
    });
    auth = true;
  } else {
    auth = false;
  }
  return {
    props: {
      token: auth || "",
    },
  };
}
