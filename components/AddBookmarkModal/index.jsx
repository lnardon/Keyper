import { useState } from "react";

import bookmarkIcon from "../../public/assets/bookmark.png";
import styles from "../../styles/AddModal.module.css";

function AddBookmarkModal({ createBookmark }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className={styles.addModalContainer}>
      <h1 className={styles.title}>Bookmark</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #5200ff",
          marginBottom: "1rem",
          borderRadius: "0.25rem",
        }}
      >
        <img
          src={bookmarkIcon}
          alt="Folder Icon"
          className={styles.folderIcon}
          style={{ height: "20px", margin: "5px" }}
        />
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          placeholder="Title"
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #5200ff",
          marginBottom: "1rem",
          borderRadius: "0.25rem",
        }}
      >
        <img
          src={bookmarkIcon}
          alt="Folder Icon"
          className={styles.folderIcon}
          style={{ height: "20px", margin: "5px" }}
        />
        <input
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          className={styles.input}
          placeholder="https://keyper-bookmarks.web.app"
        />
      </div>
      <button
        onClick={() => createBookmark({ title, url })}
        className={styles.createBtn}
      >
        Add
      </button>
    </div>
  );
}

export default AddBookmarkModal;
