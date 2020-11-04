import { useState } from "react";

import styles from "../../styles/AddModal.module.css";

function AddFolderModal({ createFolder }) {
  const [name, setName] = useState("");

  return (
    <div className={styles.addModalContainer}>
      <h1 className={styles.title}>Create folder</h1>
      {/* <label className={styles.inputLabel}>Folder name:</label> */}
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
        placeholder="Folder name"
      />
      <button onClick={() => createFolder(name)} className={styles.createBtn}>
        Create
      </button>
    </div>
  );
}

export default AddFolderModal;
