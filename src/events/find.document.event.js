export const listenerName = "find-documents";

/**
 *
 * @param {string} url
 */
async function findDocuments(db, url) {
  const store = db
    .transaction("documents", "readonly")
    .objectStore("documents");
  const cursorRequest = store.openCursor();

  let foundedDocuments = [];

  return new Promise((resolve) => {
    cursorRequest.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        const document = cursor.value;
        if (document.url == url) {
          foundedDocuments.push(document);
        }
        cursor.continue();
      } else {
        resolve(foundedDocuments);
      }
    };
  });
}

export async function listener({ sender, url }, simulate = false) {
  const { indexedDb } = this;
  const documents = await findDocuments(indexedDb, url);
  if (simulate) {
    // work on proof case
    return documents.length > 0;
  }

  this.reply(sender, {
    documents: documents,
    node_metadata: this.nodeMetaData,
    node_id: this.nodeId,
  });
}
