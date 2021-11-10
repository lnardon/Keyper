import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import firebase from "../public/firebase";

import styles from "../styles/Login.module.css";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        router.push("/homepage");
      }
    });
  }, []);

  return (
    <div className={styles.loginContainer}>
      <Head>
        <title>Keyper - Login</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <span className={styles.pathTop}></span>
      <span className={styles.pathBottom}></span>
      <div className={styles.loginDiv}>
        <h1 className={styles.title}>Sign Up</h1>
        <div className={styles.loginForm}>
          <div className={styles.inputDiv}>
            <label htmlFor="username"></label>
            <input
              type="email"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="username"></label>
            <input
              type="password"
              id="username"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
        <button
          className={styles.loginBtn}
          onClick={() =>
            firebase
              .auth()
              .createUserWithEmailAndPassword(username, password)
              .then((data) => {
                if (typeof window !== "undefined") {
                  localStorage.setItem("@userId", data.user.uid);
                  router.push("/homepage");
                }
              })
              .catch((err) => alert(err))
          }
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
