import styles from "../../styles/Foldercard.module.css";

function Foldercard({ title, path }) {
  return (
    <div className={styles.foldercardContainer}>
      <h1 className={styles.foldercardTitle}>{title}</h1>
    </div>
  );
}

export default Foldercard;
