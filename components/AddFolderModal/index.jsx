import { useState } from "react";

import folderIcon from "../../public/assets/folder.png";
import styles from "../../styles/AddModal.module.css";

function AddFolderModal({ createFolder }) {
  const [name, setName] = useState("");

  return (
    <div className={styles.addModalContainer}>
      <h1 className={styles.title}>Folder</h1>
      <span className={styles.dot}></span>
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
          src={folderIcon}
          alt="Folder Icon"
          className={styles.folderIcon}
          style={{ height: "35px" }}
        />
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          placeholder="Folder name"
        />
      </div>

      <button onClick={() => createFolder(name)} className={styles.createBtn}>
        Create
      </button>
    </div>
  );
}

export default AddFolderModal;
