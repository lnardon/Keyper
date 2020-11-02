import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import firebase from "../public/firebase";

import styles from "../styles/Login.module.css";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.loginContainer}>
      <Head>
        <title>Keyper - Login</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className={styles.loginDiv}>
        <h1 className={styles.title}>Login</h1>
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
              .signInWithEmailAndPassword(username, password)
              .then(() => router.push("/homepage"))
              .catch((err) => alert(err))
          }
        >
          Login
        </button>
      </div>
    </div>
  );
}
