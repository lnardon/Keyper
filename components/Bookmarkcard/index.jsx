import styles from "../../styles/Bookmarkcard.module.css";

function Bookmarkcard({ title, url }) {
  return (
    <div className={styles.foldercardContainer}>
      <img
        src={`https://s2.googleusercontent.com/s2/favicons?domain=${url}`}
        alt="Favicon"
      />
      <h1 className={styles.foldercardTitle}>{title}</h1>
    </div>
  );
}

export default Bookmarkcard;
