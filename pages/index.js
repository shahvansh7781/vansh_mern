import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
// import { useRouter } from "next/router";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export default function Home() {
  // const router = useRouter();
  const [userDetails, setuserDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // firstName: userDetails.firstName,
        // lastName: userDetails.lastName,
        // phoneNumber: userDetails.phoneNumber,
        // email: userDetails.email,
        // password: userDetails.password,
        // confirmPassword: userDetails.confirmPassword,
        ...userDetails,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (!data.success) {
      // alert(data.error);
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
      // alert(data.message);
      // router.push("/success");
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      setuserDetails({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      <main className={styles.main}>
        <h1 className={styles.myUncode}>Uncode.</h1>
        <p>
          A Central Hub where teams can work,plan <br /> and achieve amazing
          things together.
        </p>
        <div className={styles.myForm}>
          <div>
            <Image src="/landing_pic.jpg" alt="" height={780} width={970} />
          </div>

          <div className={styles.headingDiv}>
            <div className={styles.infoDiv}>
              <h3 className={styles.myH3}>Start For Free</h3>
              <h1 className={styles.myH1}>Sign up to Uncode.</h1>
              <h3 className={styles.myH3}>
                <span style={{ color: "#e3866a" }}> Already a member? </span>
                <Link href="/login">
                  <a style={{ color: "#446e90" }}>Log in</a>
                </Link>
              </h3>
            </div>
            <form method="post" onSubmit={submitHandler} autoComplete="on">
              <div className={styles.parentDiv}>
                <div className={styles.childDiv}>
                  <div>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter First Name"
                      required
                      minLength="3"
                      maxLength="30"
                      value={userDetails.firstName}
                      onChange={(e) => {
                        setuserDetails({
                          ...userDetails,
                          firstName: e.target.value,
                        });
                      }}
                      className={styles.myInput}
                    />
                  </div>

                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter Phone Number"
                    required
                    pattern="[6-9]{1}[0-9]{9}"
                    title="Phone Number should start from 6-9 and must be of 10 digits"
                    value={userDetails.phoneNumber}
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        phoneNumber: e.target.value,
                      });
                    }}
                    className={styles.myInput}
                  />

                  <input
                    type="password"
                    name=""
                    id=""
                    placeholder="Enter Password"
                    required
                    value={userDetails.password}
                    minLength="8"
                    title="Password should be of minimum 8 characters"
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        password: e.target.value,
                      });
                    }}
                    className={styles.myInput}
                  />
                </div>
                <div className={styles.childDiv}>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter Last Name"
                    maxLength="30"
                    required
                    value={userDetails.lastName}
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        lastName: e.target.value,
                      });
                    }}
                    className={styles.myInput}
                  />

                  <input
                    type="email"
                    name=""
                    id=""
                    placeholder="Enter Email"
                    required
                    value={userDetails.username}
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        username: e.target.value,
                      });
                    }}
                    className={styles.myInput}
                  />

                  <input
                    type="password"
                    name=""
                    id=""
                    value={userDetails.confirmPassword}
                    required
                    minLength="8"
                    onChange={(e) => {
                      setuserDetails({
                        ...userDetails,
                        confirmPassword: e.target.value,
                      });
                    }}
                    placeholder="Enter Confirm Password"
                    className={styles.myInput}
                  />
                </div>
              </div>
              <div className={styles.buttonDiv}>
                {/* <Link href="/api/register">
                <a className={styles.myButton} onClick={submitHandler}>
                  Create an Account
                </a>
              </Link> */}
                <button type="submit" className={styles.myButton}>
                  Create an Account
                </button>
                {/* <a href="/api/register" className={styles.myButton} onClick={submitHandler}>
                Create an Account
              </a> */}
              </div>
            </form>
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
}
