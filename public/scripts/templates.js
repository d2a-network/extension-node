const d2aButtonTemplate = `<div class="css-1dbjc4n r-1awozwy r-18u37iz" id = "d2a-tweet-btn" style = "cursor: pointer;">
<div aria-disabled="true" role="button" tabindex="-1" class="css-1dbjc4n r-l5o3uw r-42olwf r-sdzlij r-1phboty r-rs99b7 r-19u6a5r r-2yi16 r-1qi8awa r-1ny4l3l r-ymttw5 r-o7ynqc r-6416eg r-lrvibr" data-testid="tweetButtonInline" style = "background-color: #2d2a29;">
  <div dir="ltr" class="css-901oao r-1awozwy r-jwli3a r-6koalj r-18u37iz r-16y2uox r-37j5jr r-a023e6 r-b88u0q r-1777fci r-rjixqe r-bcqeeo r-q4m81j r-qvutc0">
    <span class="css-901oao css-16my406 css-1hf3ou5 r-poiln3 r-a023e6 r-rjixqe r-bcqeeo r-qvutc0">
      <span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Sahiplen</span>
    </span>
  </div>
</div>
</div>`


const d2aShowThreadBtn = `<div id = "d2a-show-thread-btn" class="css-1dbjc4n" style="display: inline-grid; justify-content: inherit; transform: rotate(0deg) scale(1) translate3d(0px, 0px, 0px); -webkit-box-pack: inherit;">
<div class="css-1dbjc4n r-18u37iz r-1h0z5md">
  <div aria-expanded="false" aria-haspopup="menu" aria-label="Tweet paylaş" role="button" tabindex="0" class="css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr">
    <div dir="ltr" class="css-901oao r-1awozwy r-1bwzh9t r-6koalj r-37j5jr r-a023e6 r-16dba41 r-1h0z5md r-rjixqe r-bcqeeo r-o7ynqc r-clp7b1 r-3s2u2q r-qvutc0">
      <div class="css-1dbjc4n r-xoduu5">
        <div class="css-1dbjc4n r-1niwhzg r-sdzlij r-1p0dtai r-xoduu5 r-1d2f490 r-xf4iuw r-1ny4l3l r-u8s1d r-zchlnj r-ipm5af r-o7ynqc r-6416eg"></div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C17.5915 3 22.2898 6.82432 23.6219 12C22.2898 17.1757 17.5915 21 12 21C6.40848 21 1.71018 17.1757 0.378052 12C1.71018 6.82432 6.40848 3 12 3ZM12 19C7.52443 19 3.73132 16.0581 2.45723 12C3.73132 7.94186 7.52443 5 12 5C16.4756 5 20.2687 7.94186 21.5428 12C20.2687 16.0581 16.4756 19 12 19Z" fill="currentColor" /></svg>
      </div>
    </div>
  </div>
</div>
</div>`

const twitterContentTemplate = `<div style = "
position: relative;
width: 100%;
background: #0c0c0c;
padding: 0.5rem;
border-bottom: 0.9px solid #333;
color: #eee;
display: flex;
flex-direction: row;
font-family: TwitterChirp;
" class = "css-1dbjc4n">
<div class = "d2a-avatar" style = "padding: 0.5rem;">
    <img src = "https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png" style = "width: 48px; height: 48px; border-radius: 900px;">
</div>
<div class = "d2a-tweet-content" style = "
  padding: 0.5rem;
  width: 100%;
">

<div id = "d2a-tweet-header" style = "display:flex; align-items: center;">
  <b>{name}</b> <small style = "margin-left: auto; color: #444;">@{node_id}</small>
</div>
<div id = "d2a-tweet-area" style = "
  margin-top:0.5rem;
">
  {document_content}
</div>

<div id = "d2a-tweed-footer" style = "display: flex; margin-top: 1rem;">
  <div dir="ltr" class="css-901oao r-1awozwy r-1bwzh9t r-6koalj r-37j5jr r-a023e6 r-16dba41 r-1h0z5md r-rjixqe r-bcqeeo r-o7ynqc r-clp7b1 r-3s2u2q r-qvutc0" style="color:#ccc; cursor: pointer;"
  data-documentkey="{document_key}" id = "d2a-document-{document_key}">
    <div class="css-1dbjc4n r-xoduu5">
      <div class="css-1dbjc4n r-1niwhzg r-sdzlij r-1p0dtai r-xoduu5 r-1d2f490 r-xf4iuw r-1ny4l3l r-u8s1d r-zchlnj r-ipm5af r-o7ynqc r-6416eg"></div>
      <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
        <g>
          <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
        </g>
      </svg>
    </div>
    <div class="css-1dbjc4n r-xoduu5 r-1udh08x">
      <span data-testid="app-text-transition-container" style="transition-property: transform; transition-duration: 0.3s; transform: translate3d(0px, 0px, 0px);">
        <span class="css-901oao css-16my406 r-poiln3 r-n6v787 r-1cwl3u0 r-1k6nrdp r-1e081e0 r-qvutc0">
          <span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">{recieve_count}</span>
        </span>
      </span>
    </div>
  </div>
</div>

</div>
</div>`