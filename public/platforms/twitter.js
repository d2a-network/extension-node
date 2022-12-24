const {
  foxql,
  saveDocument,
  showNotification,
  checkDocumentInDb,
  deleteInDb,
  findDocumentInDb,
} = window;

let documentMap = {};
let lastTwitterPage = null;
let d2aTargetTweetReplyUrl = window.location.href;

const twitterRegex = new RegExp(/\/[^\/]+\/status\/[0-9]+/g);

async function publishTweetOnD2a() {
  const value = document.querySelector(".DraftEditor-root").innerText;
  if (value.trim() == "") return;

  await saveDocument({
    url: d2aTargetTweetReplyUrl,
    platform: "twitter",
    content: value,
    create_date: new Date().toString(),
  });
  showNotification(
    "success",
    `
    <a href = "${url}">D2A Tweet'i görüntüle</a>
  `,
  );
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
}

async function loadD2aDocuments() {
  document.querySelectorAll("#d2a-tweet").forEach((e) => e.remove());
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
    showNotification("success", "😱");
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
  const tweets = document.querySelectorAll(
    `main[role=main] div[data-testid=primaryColumn] section div[data-testid=cellInnerDiv]`,
  );
  let showing = false;
  tweets.forEach((tweet) => {
    const cc = tweet.innerHTML.match(twitterRegex);
    if (showing) return;
    const tweetUrl = cc != undefined ? cc[0] : "";
    if (tweetUrl == undefined) return;
    const completedUrl = "https://twitter.com" + tweetUrl;
    const currentPageUrl = window.location.href;
    if (
      completedUrl != window.location.href &&
      currentPageUrl != "https://twitter.com/home"
    ) {
      return;
    }
    showing = true;
    Object.values(documentMap).forEach(async (item) => {
      const documentKey = item.document.documentKey;
      let template = twitterContentTemplate;
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
      template = template.replace(
        "{date_string}",
        escapeXSS(getElapsedTime(new Date(item.document.create_date))),
      );

      if (currentPageUrl == "https://twitter.com/home") {
        tweet.insertAdjacentHTML("afterbegin", template);
      } else {
        tweet.querySelector("article").insertAdjacentHTML("afterend", template);
      }

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
  });
}

function findStatusElement() {
  setInterval(() => {
    if (foxql.status != "ready") return;

    const { pathname, href } = window.location;

    if (pathname.split("/")[1] == "compose") {
      // disable model tweet view
      //return;
    }

    if (href != lastTwitterPage && document.readyState === "complete") {
      tweetArticleTweetIdHandler((url) => {
        d2aTargetTweetReplyUrl = url;
      });
      loadD2aDocuments();
      lastTwitterPage = href;
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
  }, 100);
}

findStatusElement();
