import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Keyper - Login</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
