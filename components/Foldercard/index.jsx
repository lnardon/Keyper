import styles from "../../styles/Foldercard.module.css";

function Foldercard({ title, onClick, index }) {
  return (
    <div className={styles.foldercardContainer} onClick={onClick}>
      <h1 className={styles.foldercardTitle}>{title}</h1>
    </div>
  );
}

export default Foldercard;
