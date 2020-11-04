import { useState, useEffect } from "react";
import Head from "next/head";
import firebase from "../public/firebase";

import styles from "../styles/Homepage.module.css";
import Foldercard from "../components/Foldercard";
import AddFolderModal from "../components/AddFolderModal";
import Folder from "../components/Folder";

export default function Homepage() {
  let userId;
  let dataRef;
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("@userId");
    dataRef = firebase.database();
  }
  const [addFolderModal, setAddFolderModal] = useState(false);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    dataRef.ref(`users/${userId}/folders`).on("value", (snap) => {
      setFolders(snap.val());
      console.log(snap.val());
    });
  }, []);

  function createFolder(folderName) {
    dataRef
      .ref(`users/${userId}/folders/`)
      .set([...folders, { title: folderName }]);
    setAddFolderModal(false);
  }

  return (
    <>
      {folders.length > 1 ? (
        <div className={styles.homepageContainer}>
          <Head>
            <title>Keyper</title>
          </Head>
          <div className={styles.homepageContent}>
            {folders.map((folder) => {
              return <Foldercard title={folder.title} />;
            })}

            {addFolderModal && <AddFolderModal createFolder={createFolder} />}
            <Folder title={folders[0].title} bookmarks={folders[0].bookmarks} />
            <button
              className={styles.addBtn}
              onClick={() => setAddFolderModal(!addFolderModal)}
            >
              +
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
