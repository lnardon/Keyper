import { useState, useEffect } from "react";
import Head from "next/head";
import firebase from "../public/firebase";

import styles from "../styles/Homepage.module.css";
import Foldercard from "../components/Foldercard";
import AddModal from "../components/AddModal";

export default function Homepage() {
  let userId;
  let dataRef;
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("@userId");
    dataRef = firebase.database();
  }
  const [addModal, setAddModal] = useState(false);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    dataRef.ref(`users/${userId}/folders`).on("value", (snap) => {
      setFolders(snap.val());
      console.log(snap.val());
    });
  }, []);

  function createBookmark(folderName, obj) {
    const newFolders = fodlers[]
    dataRef
      .ref(`users/${userId}/folders/`)
      .set([folders, { name: folderName, bookmarks: obj }]);
  }

  return (
    <div className={styles.homepageContainer}>
      <Head>
        <title>Keyper</title>
      </Head>
      <div className={styles.homepageContent}>
        {folders.map((folder) => {
          return <Foldercard title={folder.name} />;
        })}

        {addModal ? <AddModal createBookmark={createBookmark} /> : null}
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
