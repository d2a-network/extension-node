const {
  foxql,
  saveDocument,
  showNotification,
  checkDocumentInDb,
  deleteInDb,
  findDocumentInDb,
} = window;

let documentMap = {};

async function handleClick() {
  const documentKey = this.dataset.documentkey;
  const target = documentMap[documentKey] || false;

  if (!target) return; // document is not found
  const _document = target.document;

  const checkInLocal = await checkDocumentInDb(documentKey);
  let color = "#81C14B";

  if (!checkInLocal) {
    await saveDocument(_document);
  } else {
    color = "unset";
    await deleteInDb(documentKey);
  }
  document.querySelector("#d2a-document-" + documentKey).style.fill = color;
}

async function publishOnD2A() {
  const value = document.querySelector("textarea").value;

  if (value.trim() == "") return;
  if (value.trim().length > 1000) return;

  await saveDocument({
    url: window.location.href,
    platform: "eksisozluk",
    content: value,
    create_date: new Date().toString(),
  });
  showNotification(
    "success",
    `
        Bu entry çok acayip bir yere gitti.
      `,
  );

  location.reload();
}

async function loadDocuments() {
  const url = window.location.href;
  const searchInLocal = await findDocumentInDb(url);
  const myNodeId = foxql.nodeId;
  const myNodeMeta = foxql.nodeMetaData;

  const ask = await node.ask({
    transportPackage: {
      p2pChannelName: "find-documents",
      url: url,
    },
    stickyNode: true,
    livingTime: 1700,
  });

  if (!ask && searchInLocal.length <= 0) {
    return;
  }
  let {
    results: { count, data },
  } = ask || {
    results: {
      count: 0,
      data: [],
    },
  };

  if (searchInLocal.length > 0) {
    data.push({
      documents: searchInLocal,
      node_metadata: myNodeMeta,
      node_id: myNodeId,
    });
    count += 1;
  }

  if (count <= 0) return;
  documentMap = {};
  data.forEach(({ documents, node_metadata, node_id }) => {
    documents.forEach((document) => {
      if (documentMap[document.documentKey] == undefined) {
        documentMap[document.documentKey] = {
          document: document,
          recieve_count: 1,
          node_metadata: node_metadata,
          node_id: node_id,
        };
      } else {
        documentMap[document.documentKey].recieveCount += 1;
      }
    });
  });

  const entrysEl = document.querySelector("#entry-item-list");

  Object.values(documentMap).forEach(async (item) => {
    const documentKey = item.document.documentKey;
    let template = eksisozlukD2aEntryTemplate;
    template = template.replace("{name}", escapeXSS(item.node_metadata.name));
    template = template.replace(
      "{document_content}",
      escapeXSS(item.document.content),
    );
    //template = template.replace('{recieve_count}', escapeXSS(item.recieve_count))
    template = template.replace(
      "{node_id}",
      escapeXSS(item.node_id.slice(0, 7)),
    );
    template = template.replace(/{document_key}/gi, escapeXSS(documentKey));
    template = template.replace(
      "{avatar_url}",
      escapeXSS(item.node_metadata.avatar),
    );
    const date = new Date(item.document.create_date);
    template = template.replace(
      "{date_string}",
      escapeXSS(date.toLocaleDateString() + " " + date.toLocaleTimeString()),
    );
    entrysEl.insertAdjacentHTML("beforeend", template);

    const targetElement = document.querySelector(
      "#d2a-document-" + documentKey,
    );

    targetElement.addEventListener("click", handleClick);
    const checkInLocal = await checkDocumentInDb(documentKey);
    if (checkInLocal) {
      targetElement.style.fill = "#81C14B";
      return;
    }
    targetElement.style.color = "unset";
  });
}

let showEntrysInterval = setInterval(() => {
  if (foxql.status != "ready") return;

  loadDocuments();

  clearInterval(showEntrysInterval);
}, 100);

function d2aInit() {
  let interval = setInterval(() => {
    if (foxql.status != "ready") return;

    const editorElement =
      document.querySelector(".entry-edit-form-container") || null;

    if (editorElement == null) return;

    const actionsElement = editorElement.querySelector(".actions") || null;

    if (actionsElement == null) return;

    actionsElement.insertAdjacentHTML(
      "afterbegin",
      eksisozlukD2aPublishDocumentBtnTemplate,
    );

    document
      .querySelector("#d2a-entry-btn")
      .addEventListener("click", publishOnD2A);

    clearInterval(interval);
  }, 200);
}

d2aInit();
