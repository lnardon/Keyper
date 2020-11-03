import { useState } from "react";

import styles from "../../styles/AddModal.module.css";

function AddModal({ createBookmark }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [folder, setFolder] = useState("Inbox");

  return (
    <div className={styles.addModalContainer}>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <input type="text" onChange={(e) => setLink(e.target.value)} />
      <button onClick={() => createBookmark(folder, { name, link })}>
        Create
      </button>
    </div>
  );
}

export default AddModal;
