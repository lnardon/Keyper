import styles from "../../styles/Bookmarkcard.module.css";
import close from "../../public/close.svg";

function Bookmarkcard({ title, url, deleteBtn }) {
  return (
    <div className={styles.foldercardContainer}>
      <div
        style={{ display: "flex", cursor: "pointer" }}
        onClick={() => window.open(url)}
      >
        <img
          src={`https://s2.googleusercontent.com/s2/favicons?domain=${url}`}
          alt="Favicon"
          className={styles.favicon}
        />
        <h1 className={styles.foldercardTitle}>{title}</h1>
      </div>
      <img
        src={close}
        alt="delete"
        className={styles.deleteBtn}
        onClick={deleteBtn}
      />
    </div>
  );
}

export default Bookmarkcard;
