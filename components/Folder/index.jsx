import { useState } from "react";

import styles from "../../styles/Folder.module.css";
import Bookmarkcard from "../Bookmarkcard";

function Folder({ title, bookmarks }) {
  function addBookmark(title, url) {
    bookmarks.push({ title: title, url: url });
  }
  return (
    <div className={styles.folderContainer}>
      <h1>{title}</h1>
      {bookmarks &&
        bookmarks.map((bookmark, index) => {
          return (
            <Bookmarkcard
              title={bookmark.title}
              url={bookmark.url}
              key={index}
            />
          );
        })}
    </div>
  );
}

export default Folder;
