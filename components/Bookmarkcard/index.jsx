import { useEffect, useRef } from "react";
import styles from "../../styles/Bookmarkcard.module.css";
import deleteIcon from "../../public/assets/delete.png";
import bookmarkIcon from "../../public/assets/bookmark.png";

function Bookmarkcard({ title, url, deleteBtn, dragHandle, index }) {
  const bookmarkCardRef = useRef();

  useEffect(() => {
    bookmarkCardRef.current.style.animationDelay = `${index * 75}ms`;
  }, [bookmarkCardRef]);

  return (
    <div className={styles.foldercardContainer} ref={bookmarkCardRef}>
      <div
        style={{ display: "flex", cursor: "pointer", width: "90%" }}
        onClick={() => window.open(url)}
        {...dragHandle}
      >
        <img src={bookmarkIcon} alt="Favicon" className={styles.favicon} />
        <h1 className={styles.foldercardTitle}>{title}</h1>
      </div>
      <img
        src={deleteIcon}
        alt="delete"
        className={styles.deleteBtn}
        onClick={deleteBtn}
      />
    </div>
  );
}

export default Bookmarkcard;
