import { useDrag } from "react-dnd";

import styles from "../../styles/Foldercard.module.css";
import close from "../../public/close.svg";

function Foldercard({ title, onClick, deleteBtn }) {
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "CARD" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={dragRef} className={styles.foldercardContainer} onClick={onClick}>
      <h1 className={styles.foldercardTitle}>{title}</h1>
      <img
        src={close}
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
