/**
 * Testing
 */

window.addEventListener(
    'message',
    (event) => {
        // console.log(event.data)
        console.log('message event firing...')
        console.log(event.data)
        if (event.data.name) {
            console.log('WORKKKK')
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
