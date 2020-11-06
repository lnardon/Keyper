import { useState, useEffect } from "react";
import Head from "next/head";
import firebase from "../public/firebase";

import styles from "../styles/Homepage.module.css";
import Header from "../components/Header";
import Foldercard from "../components/Foldercard";
import AddFolderModal from "../components/AddFolderModal";
import AddBookmarkModal from "../components/AddBookmarkModal";
import Folder from "../components/Folder";

export default function Homepage() {
  let userId;
  let dataRef;
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("@userId");
    dataRef = firebase.database();
  }
  const [addFolderModal, setAddFolderModal] = useState(false);
  const [addBookmarkModal, setAddBookmarkModal] = useState(false);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    dataRef.ref(`users/${userId}/folders`).on("value", (snap) => {
      setFolders(snap.val());
    });
  }, []);

  function createFolder(folderName) {
    let newFolders = folders;
    newFolders.push({ title: folderName, bookmarks: [] });
    dataRef.ref(`users/${userId}/folders`).set(newFolders);
    setAddFolderModal(false);
  }

  function deleteFolder(index) {
    let newFolders = folders;
    newFolders.splice(index, 1);
    setFolders(newFolders);
    dataRef.ref(`users/${userId}/folders/${index}`).remove();
  }

  function createBookmark(bookmark) {
    let auxFolders = folders;
    if (auxFolders[selectedFolder].bookmarks) {
      auxFolders[selectedFolder].bookmarks = [
        ...auxFolders[selectedFolder].bookmarks,
        bookmark,
      ];
    } else {
      auxFolders[selectedFolder].bookmarks = [bookmark];
    }
    dataRef.ref(`users/${userId}/folders/`).set(auxFolders);
    setAddBookmarkModal(false);
  }

  return (
    <>
      {folders.length > 0 ? (
        <div className={styles.homepageContainer}>
          <Head>
            <title>Keyper</title>
          </Head>
          <div className={styles.homepageContent}>
            <Header
              showBackBtn={selectedFolder !== null}
              backBtn={() => setSelectedFolder(null)}
            />
            {selectedFolder === null && (
              <div>
                {folders.map((folder, index) => {
                  return (
                    <Foldercard
                      title={folder.title}
                      onClick={() => setSelectedFolder(index)}
                      index={index}
                      deleteBtn={() => deleteFolder(index)}
                    />
                  );
                })}
                {addFolderModal && (
                  <AddFolderModal createFolder={createFolder} />
                )}
              </div>
            )}
            <div>
              {addBookmarkModal && (
                <AddBookmarkModal createBookmark={createBookmark} />
              )}
              {selectedFolder !== null && (
                <Folder
                  folder={folders[selectedFolder]}
                  folderIndex={selectedFolder}
                  dataRef={dataRef}
                />
              )}
            </div>
            <button
              className={styles.addBtn}
              onClick={() => {
                if (selectedFolder !== null) {
                  setAddBookmarkModal(!addBookmarkModal);
                } else {
                  setAddFolderModal(!addFolderModal);
                }
              }}
            >
              +
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
