/**
 * Testing
 */

/**
 * Send an initial message on load to the parent
 * to load blocks after iframe is initialized. Ran into
 * issues where nothing would render if iframe wasn't ready,
 * this resolves that.
 */
window.addEventListener('load', () => {
    console.log("==> Posting 'LOADED' message from iframe")
    window.top.postMessage('LOADED', '*')
})

window.addEventListener(
    'message',
    (event) => {
        // console.log(event.data)
        console.log(
            `==> Window onMessage event received in iframe`,
            event.data
        )
        if (event.data.name) {
            document.getElementById('main').innerHTML =
                event.data.html
        }
    },
    false
)

// testing posting message from iframe to parent
window.addEventListener('click', (event) => {
    // Need to serialize HTMLElement because it has methods
    // var html_element = JSON.parse(JSON.stringify(event.target))
    var element_id = event.target.id
    window.top.postMessage(element_id, '*')
})

window.addEventListener('resize', (event) => {
    console.log('window has changed sized')
})
