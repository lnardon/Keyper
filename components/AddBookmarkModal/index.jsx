import { useState } from "react";

import styles from "../../styles/AddModal.module.css";

function AddBookmarkModal({ createBookmark }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className={styles.addModalContainer}>
      <h1 className={styles.title}>Create Bookmark</h1>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        placeholder="Title"
      />
      <input
        type="text"
        onChange={(e) => setUrl(e.target.value)}
        className={styles.input}
        placeholder="https://keyper-bookmarks.web.app"
      />
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
