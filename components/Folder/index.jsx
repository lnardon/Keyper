import styles from "../../styles/Folder.module.css";
import Bookmarkcard from "../Bookmarkcard";

function Folder({ folder, folderIndex, dataRef }) {
  const userId = localStorage.getItem("@userId");
  function addBookmark(title, url) {
    bookmarks.push({ title: title, url: url });
  }

  function deleteBookmark(index) {
    let r = confirm("Click OK to delete the bookmark or Cancel to exit.");
    if (r) {
      let folders;
      let auxBookmarks = folder.bookmarks;
      dataRef.ref(`users/${userId}/folders`).on("value", (snap) => {
        folders = snap.val();
      });
      auxBookmarks.splice(index, 1);
      folders[folderIndex].bookmarks = auxBookmarks;
      dataRef.ref(`users/${userId}/folders`).set(folders);
    }
  }

  return (
    <div className={styles.folderContainer}>
      <h1 className={styles.folderTitle}>{folder.title}</h1>
      <div className={styles.bookmarksList}>
        {folder.bookmarks &&
          folder.bookmarks.map((bookmark, index) => {
            return (
              <Bookmarkcard
                title={bookmark.title}
                url={bookmark.url}
                deleteBtn={() => deleteBookmark(index)}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Folder;
