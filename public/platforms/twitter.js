const {foxql, saveDocument, showNotification} = window

async function publishTweetOnD2a()
{
    const value = document.querySelector('.DraftEditor-root').innerText
    const url = window.location.href
    if(value.trim() == '') return;

    const status = await saveDocument({
      url: url,
      platform: 'twitter',
      content: value
    })
}

async function loadD2aDocuments()
{
  const answer = await node.ask({
    transportPackage: {
      p2pChannelName: "find-documents",
      url: window.location.href,
    },
    stickyNode: true,
    livingTime: 2000
  });

  console.log(answer)
}


function findStatusElement()
{
    setInterval(()=> {
        const currentPath = window.location.pathname.split('/')[2] || ''
        if(currentPath != 'status') { // Sadece bir tweet detayına bakılıyorsa çalışır 
          return;
        }

        const element = document.querySelector(`div[data-testid=toolBar]`) || null;
        const d2aButton = document.querySelector('#d2a-tweet-btn') || null;

        if(element != null && d2aButton == null) { // dedected
            document.querySelector(`div[data-testid=toolBar] div:nth-child(2) div[role=button]`).insertAdjacentHTML('afterend', d2aButtonTemplate)

            document.querySelector('#d2a-tweet-btn').addEventListener("click", publishTweetOnD2a);
        }

        const btnGroupElement = document.querySelector(`article[role=article] div[role=group]:nth-child(1)`) || null
        const d2aShowBtnElement = document.querySelector('#d2a-show-thread-btn') || null
        if(btnGroupElement != null && d2aShowBtnElement == null) {
          document.querySelector(`article[role=article] div[role=group]:nth-child(1)`).insertAdjacentHTML('beforeend', d2aShowThreadBtn)
          document.querySelector('#d2a-show-thread-btn').addEventListener('click', loadD2aDocuments)
        }
    }, 500)
}


findStatusElement()