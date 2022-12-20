const notificationTypes = {
    success: 'background: rgb(29 155 240); color: #eee;'
}

const notificationTemplate = `<div id = "d2a-notification"
        style = "z-index: 999; position: fixed; right: 30px; bottom: 100px; padding: 0.5rem;
        {notification_type} width: 15%; border-radius: 8px; font-weight: 600; text-align:center;"
    >
    {notification_content}
</div>`



/**
 * 
 * @param {string} status success | failed
 * @param {string} content
 */
window.showNotification = (status, content)=> {

    const findCurrentNotification = document.querySelector('#d2a-notification') || null

    if(findCurrentNotification != null) {
        findCurrentNotification.remove()
    }

    let notificationBody = notificationTemplate
    notificationBody = notificationBody.replace('{notification_type}', notificationTypes[status])
    notificationBody = notificationBody.replace('{notification_content}', content)

    document.querySelector('body').insertAdjacentHTML('afterbegin', notificationBody)

    setTimeout(() => {
        const findCurrentNotification = document.querySelector('#d2a-notification') || null

        if(findCurrentNotification != null) {
            findCurrentNotification.remove()
        }
    
    }, 2500);

}