import styles from "../../styles/Foldercard.module.css";
import close from "../../public/close.svg";

function Foldercard({ title, onClick, deleteBtn }) {
  return (
    <div className={styles.foldercardContainer} onClick={onClick}>
      <h1 className={styles.foldercardTitle}>{title}</h1>
      <img
        src={close}
        alt="delete"
        className={styles.deleteBtn}
        onClick={deleteBtn}
      />
    </div>
  );
}

export default Foldercard;
