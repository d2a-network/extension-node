const tweetIdSelectors = [
  `div[data-testid='reply']`,
  `article[data-testid='tweet']`,
];

function escapeXSS(string) {
  const div = document.createElement("div");
  div.textContent = string;
  return div.innerHTML;
}

function tweetArticleTweetIdHandler(callback) {
  document.querySelectorAll(`article[data-testid='tweet']`).forEach((el) => {
    if (Object.values(el.classList).includes("d2a-added-event-listener"))
      return;

    el.classList.add("d2a-added-event-listener");
    el.addEventListener("click", function () {
      try {
        const url = this.querySelector(
          `div[data-testid='User-Names'] a[dir='ltr']`,
        ).href;
        if (url.indexOf("/status/") < 0) return;
        callback(url);
      } catch (e) {
        console.log(
          "D2A: query selector error in tweetArticleTweetIdHandler:1",
        );
      }
    });
  });

  document.querySelectorAll(`div[data-testid='reply']`).forEach((el) => {
    if (Object.values(el.classList).includes("d2a-added-event-listener"))
      return;

    el.classList.add("d2a-added-event-listener");
    el.parentElement.addEventListener("click", function () {
      let url =
        el.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
          `a[dir='ltr']`,
        ).href;
      if (url.indexOf("/status/") < 0) return;
      url = url.replace("/analytics", "");
      callback(url);
    });
  });
}

function getElapsedTime(date) {
  const now = new Date();
  const elapsedTime = now - date; // elapsed time in milliseconds
  const elapsedTimeInSeconds = elapsedTime / 1000; // elapsed time in seconds
  const elapsedTimeInMinutes = elapsedTimeInSeconds / 60; // elapsed time in minutes
  const elapsedTimeInHours = elapsedTimeInMinutes / 60; // elapsed time in hours
  const elapsedTimeInDays = elapsedTimeInHours / 24; // elapsed time in days

  if (elapsedTimeInHours < 24) {
    // less than 24 hours, return time in hours
    return `${Math.floor(elapsedTimeInHours)}s`;
  } else if (elapsedTimeInDays < 365) {
    // less than 1 year, return time in months and days
    const elapsedMonths = Math.floor(elapsedTimeInDays / 30);
    const elapsedDays = Math.floor(elapsedTimeInDays % 30);
    return `${elapsedMonths} ${elapsedDays}`;
  } else {
    // more than 1 year, return time in years, months, and days
    const elapsedYears = Math.floor(elapsedTimeInDays / 365);
    return `${elapsedYears} yıl`;
  }
}
