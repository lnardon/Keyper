import { useState, useEffect } from "react";
import Head from "next/head";
import firebase from "../public/firebase";

import styles from "../styles/Homepage.module.css";
import Foldercard from "../components/Foldercard";

export default function Homepage() {
  const [addModal, setAddModal] = useState(false);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("@userId");
    const dataRef = firebase.database();

    dataRef.ref(`users/${userId}/folders`).on("value", (snap) => {
      setFolders(snap.val());
    });
  }, []);

  return (
    <div className={styles.homepageContainer}>
      <Head>
        <title>Keyper</title>
      </Head>
      <div className={styles.homepageContent}>
        {folders.map((folder) => {
          return <Foldercard title={folder.name} />;
        })}

        {addModal && <AddModal />}
        <button
          className={styles.addBtn}
          onClick={() => setAddModal(!addModal)}
        >
          +
        </button>
      </div>
    </div>
  );
}
