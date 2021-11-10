import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  function reOrganizeList(props) {
    const source = props.source.index;
    const destination = props.destination?.index;
    if (destination) {
      folder.bookmarks.splice(
        destination,
        0,
        folder.bookmarks.splice(source, 1)[0]
      );
      dataRef
        .ref(`users/${userId}/folders/${folderIndex}/bookmarks`)
        .set(folder.bookmarks);
    }
  }

  return (
    <div className={styles.folderContainer}>
      <h1 className={styles.folderTitle}>{folder.title}</h1>
      <div className={styles.folderTitleLine}></div>
      <DragDropContext onDragEnd={(props) => reOrganizeList(props)}>
        <Droppable droppableId="droppable-1">
          {(provided) => (
            <div
              ref={provided.innerRef}
              className={styles.bookmarksList}
              {...provided.droppableProps}
            >
              {folder.bookmarks &&
                folder.bookmarks.map((bookmark, index) => {
                  return (
                    <Draggable
                      draggableId={`${index}`}
                      index={index}
                      key={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          className={styles.bookmarkCardDiv}
                          {...provided.draggableProps}
                        >
                          <Bookmarkcard
                            title={bookmark.title}
                            url={bookmark.url}
                            deleteBtn={() => deleteBookmark(index)}
                            dragHandle={provided.dragHandleProps}
                            index={index}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Folder;
