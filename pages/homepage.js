import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Head from "next/head";
import firebase from "../public/firebase";

import styles from "../styles/Homepage.module.css";
import Header from "../components/Header";
import Foldercard from "../components/Foldercard";
import AddFolderModal from "../components/AddFolderModal";
import AddBookmarkModal from "../components/AddBookmarkModal";
import Folder from "../components/Folder";
import closeIcon from "../public/assets/close.png";

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
  const router = useRouter();

  useEffect(() => {
    dataRef.ref(`users/${userId}/folders`).on("value", (snap) => {
      setFolders(snap.val());
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.push("/");
      }
    });
  }, []);

  function createFolder(folderName) {
    let newFolders = folders;
    newFolders.push({ title: folderName, bookmarks: [] });
    dataRef.ref(`users/${userId}/folders`).set(newFolders);
    setAddFolderModal(false);
  }

  function deleteFolder(index) {
    let r = confirm("Click OK to delete the folder or Cancel to exit.");
    if (r) {
      let newFolders = folders;
      newFolders.splice(index, 1);
      setFolders(newFolders);
      dataRef.ref(`users/${userId}/folders/${index}`).remove();
    }
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

  function reOrganizeList(props) {
    const source = props.source.index;
    const destination = props.destination?.index;
    if (destination) {
      folders.splice(destination, 0, folders.splice(source, 1)[0]);
    }
  }

  return (
    <>
      {folders.length > 0 ? (
        <div className={styles.homepageContainer}>
          <Head>
            <title>Keyper Bookmarks</title>
          </Head>
          <div className={styles.homepageContent}>
            <Header
              showBackBtn={selectedFolder !== null}
              backBtn={() => setSelectedFolder(null)}
              logoutBtn={() => {
                localStorage.removeItem("@userId");
                firebase
                  .auth()
                  .signOut()
                  .then(() => window.open(window.location.origin, "_self"));
              }}
            />
            <DragDropContext onDragEnd={(props) => reOrganizeList(props)}>
              <Droppable droppableId="droppable-2">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {selectedFolder === null && (
                      <div style={{ marginTop: "2rem" }}>
                        {folders.map((folder, index) => {
                          return (
                            <Draggable
                              draggableId={`${index}`}
                              index={index}
                              key={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <Foldercard
                                    title={folder.title}
                                    onClick={() => setSelectedFolder(index)}
                                    index={index}
                                    dragHandle={provided.dragHandleProps}
                                    deleteBtn={() => deleteFolder(index)}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {addFolderModal && <AddFolderModal createFolder={createFolder} />}
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
              className={
                addFolderModal || addBookmarkModal
                  ? styles.addBtn + " " + styles.addBtnOpen
                  : styles.addBtn + " " + styles.addBtnClose
              }
              onClick={() => {
                if (selectedFolder !== null) {
                  setAddBookmarkModal(!addBookmarkModal);
                } else {
                  setAddFolderModal(!addFolderModal);
                }
              }}
            >
              <img
                className={styles.addIcon}
                src={closeIcon}
                alt="Add button"
              />
            </button>
          </div>
          {addBookmarkModal || addFolderModal ? (
            <div className={styles.modalBg}></div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
