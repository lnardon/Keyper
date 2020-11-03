import { useState, useEffect } from "react";
import Head from "next/head";
import firebase from "../public/firebase";

import styles from "../styles/Homepage.module.css";

export default function Homepage() {
  useEffect(() => {
    const userId = localStorage.getItem("@userId");
    const dataRef = firebase.database().ref("users/" + userId);
  }, []);

  return (
    <div className={styles.homepageContainer}>
      <Head>
        <title>Keyper</title>
      </Head>
      <div>
        <h1 className={styles.title}>Homepage</h1>
      </div>
    </div>
  );
}
