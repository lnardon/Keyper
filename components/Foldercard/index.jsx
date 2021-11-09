import { useEffect, useRef } from "react";
import styles from "../../styles/Foldercard.module.css";
import deleteIcon from "../../public/assets/delete.png";
import folderIcon from "../../public/assets/folder.png";

function Foldercard({ title, onClick, deleteBtn, index, dragHandle }) {
  const folderCardRef = useRef();

  useEffect(() => {
    folderCardRef.current.style.animationDelay = `${index * 100}ms`;
  }, [folderCardRef]);

  return (
    <div
      ref={folderCardRef}
      className={styles.foldercardContainer}
      onClick={onClick}
      {...dragHandle}
    >
      <div className={styles.cardContent}>
        <img src={folderIcon} alt="Folder Icon" className={styles.folderIcon} />
        <h1 className={styles.foldercardTitle}>{title}</h1>
      </div>
      <img
        src={deleteIcon}
        alt="delete"
        className={styles.deleteBtn}
        onClick={(e) => {
          e.stopPropagation();
          deleteBtn();
        }}
      />
    </div>
  );
}

export default Foldercard;
