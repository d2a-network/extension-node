const {
  foxql,
  saveDocument,
  showNotification,
  checkDocumentInDb,
  deleteInDb,
  findDocumentInDb,
} = window;

let documentMap = {};

async function publishTweetOnD2a() {
  const value = document.querySelector(".DraftEditor-root").innerText;
  const url = window.location.href;
  if (value.trim() == "") return;

  await saveDocument({
    url: url,
    platform: "twitter",
    content: value,
  });
  showNotification("success", "🤫 Şimdilik kaydettim");
  document
    .querySelector(".DraftEditor-root")
    .dispatchEvent(new KeyboardEvent("keydown", { key: "8" }));
  await loadD2aDocuments();
}

async function handleClick() {
  const documentKey = this.dataset.documentkey;
  const target = documentMap[documentKey] || false;

  if (!target) return; // document is not found

  const _document = target.document;

  const checkInLocal = await checkDocumentInDb(documentKey);
  let color = "rgb(249, 24, 128)";

  if (!checkInLocal) {
    await saveDocument(_document);
  } else {
    color = "#ccc";
    await deleteInDb(documentKey);
  }
  document.querySelector("#d2a-document-" + documentKey).style.color = color;
  await loadD2aDocuments();
}

async function loadD2aDocuments() {
  document.querySelectorAll("#d2a-tweet").forEach((e) => e.remove());
  showNotification("success", "D2A Tweetleri kontrol ediliyor 🥳");
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
    showNotification("success", "😱 Eyvah kimseyi bulamadım");
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

  if (count > 0) {
    documentMap = {};
    data.forEach(({ documents, node_metadata, node_id }) => {
      console.log(node_metadata);
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

    const el = document.querySelector(
      `main[role=main] div[data-testid=primaryColumn] section div[data-testid=cellInnerDiv]:nth-of-type(2)`,
    );

    Object.values(documentMap).forEach(async (item) => {
      const documentKey = item.document.documentKey;
      let template = twitterContentTemplate;
      template = template.replace("{name}", escapeXSS(item.node_metadata.name));
      template = template.replace(
        "{document_content}",
        escapeXSS(item.document.content),
      );
      //template = template.replace('{recieve_count}', escapeXSS(item.recieve_count))
      template = template.replace("{node_id}", escapeXSS(item.node_id));
      template = template.replace(/{document_key}/gi, escapeXSS(documentKey));
      template = template.replace(
        "{avatar_url}",
        escapeXSS(item.node_metadata.avatar),
      );
      el.insertAdjacentHTML("afterbegin", template);

      const targetElement = document.querySelector(
        "#d2a-document-" + documentKey,
      );

      targetElement.addEventListener("click", handleClick);
      const checkInLocal = await checkDocumentInDb(documentKey);
      if (checkInLocal) {
        targetElement.style.color = "rgb(249, 24, 128)";
        return;
      }
      targetElement.style.color = "#ccc";
    });
  }
}

function findStatusElement() {
  setInterval(() => {
    const currentPath = window.location.pathname.split("/")[2] || "";
    if (currentPath != "status") {
      // Sadece bir tweet detayına bakılıyorsa çalışır
      return;
    }

    const element = document.querySelector(`div[data-testid=toolBar]`) || null;
    const d2aButton = document.querySelector("#d2a-tweet-btn") || null;

    if (element != null && d2aButton == null) {
      // dedected
      document
        .querySelector(
          `div[data-testid=toolBar] div:nth-child(2) div[role=button]`,
        )
        .insertAdjacentHTML("afterend", d2aButtonTemplate);

      document
        .querySelector("#d2a-tweet-btn")
        .addEventListener("click", publishTweetOnD2a);
    }

    const btnGroupElement =
      document.querySelector(
        `article[role=article] div[role=group]:nth-child(1)`,
      ) || null;
    const d2aShowBtnElement =
      document.querySelector("#d2a-show-thread-btn") || null;
    if (btnGroupElement != null && d2aShowBtnElement == null) {
      document
        .querySelector(`article[role=article] div[role=group]:nth-child(1)`)
        .insertAdjacentHTML("beforeend", d2aShowThreadBtn);
      document
        .querySelector("#d2a-show-thread-btn")
        .addEventListener("click", loadD2aDocuments);
    }
  }, 500);
}

findStatusElement();
