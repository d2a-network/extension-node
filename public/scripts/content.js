const d2aPopupBtnTemplate = `<div style = "
        position: fixed;
        width: 32px;
        height: 32px;
        background: rgb(29, 155, 240);
        color: #eee;
        cursor: pointer;
        padding: 1rem;
        right: 32px;
        bottom: 100px;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    " id = "d2a-popup-btn" >
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M7 18H17V16H7V18Z" fill="currentColor" />
            <path d="M17 14H7V12H17V14Z" fill="currentColor" />
            <path d="M7 10H11V8H7V10Z" fill="currentColor" />
            <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
            fill="currentColor"
            />
        </svg>
    </div>`

const d2aTopicTemplate = `<div style = "
    width: 100%; 
    display: flex;
    border:0.8px solid rgb(47, 51, 54);
">
    My first topic :D
</div>`

const d2aContentAreaTemplate = `<div style = "
    position: fixed;
    background: #111;
    padding: 1rem;
    color: #eee;
    width: 600px;
    height: auto;
    max-height: 512px;
    overflow-y: auto;
    right: 32px;
    bottom: 168px;
    display: none;
" id = "d2a-threads">
    <div style = "font-weight: 600; font-size: 1.1rem;">D2A Threads</div>
    <div style = "padding:0.5rem;" id = "d2a-content-area">
        ${d2aTopicTemplate}
    </div>
</div>`

    document.querySelector(`body`).insertAdjacentHTML('afterend', d2aPopupBtnTemplate)
    document.querySelector(`body`).insertAdjacentHTML('afterend', d2aContentAreaTemplate)


    document.querySelector('#d2a-popup-btn').addEventListener('click', ()=> {
        const el = document.querySelector('#d2a-threads')
        const showing = el.style.display == 'block'

        if(showing) {
            document.querySelector('#d2a-threads').style.display = "none"
            return
        }

        document.querySelector('#d2a-threads').style.display = "block"
    })
