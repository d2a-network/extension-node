const {foxql} = window


function publishTweetOnD2a()
{
    const value = document.querySelector('.DraftEditor-root').innerText
    const url = window.location.href
    if(value.trim() == '') return;

    console.log({
        url: url,
        platform: 'twitter',
        content: value
    })
}


const d2aButtonTemplate = `<div class="css-1dbjc4n r-1awozwy r-18u37iz" id = "d2a-tweet-btn" style = "cursor: pointer;">
<div aria-disabled="true" role="button" tabindex="-1" class="css-1dbjc4n r-l5o3uw r-42olwf r-sdzlij r-1phboty r-rs99b7 r-19u6a5r r-2yi16 r-1qi8awa r-1ny4l3l r-ymttw5 r-o7ynqc r-6416eg r-lrvibr" data-testid="tweetButtonInline" style = "background-color: #2d2a29;">
  <div dir="ltr" class="css-901oao r-1awozwy r-jwli3a r-6koalj r-18u37iz r-16y2uox r-37j5jr r-a023e6 r-b88u0q r-1777fci r-rjixqe r-bcqeeo r-q4m81j r-qvutc0">
    <span class="css-901oao css-16my406 css-1hf3ou5 r-poiln3 r-a023e6 r-rjixqe r-bcqeeo r-qvutc0">
      <span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Send d2a</span>
    </span>
  </div>
</div>
</div>`

function findStatusElement()
{
    setInterval(()=> {

        const element = document.querySelector(`div[data-testid=toolBar]`) || null;
        const d2aButton = document.querySelector('#d2a-tweet-btn') || null;

        if(element != null && d2aButton == null) { // dedected
            document.querySelector(`div[data-testid=toolBar] div:nth-child(2) div[role=button]`).insertAdjacentHTML('afterend', d2aButtonTemplate)

            document.querySelector('#d2a-tweet-btn').addEventListener("click", publishTweetOnD2a);
        }

        document.querySelector(`div[data-testid=toolBar]`)
    }, 500)
}


findStatusElement()