<script>
    /**
     * Proof of concepting rendered html in iframe idea
     * Currently, the flow looks like this.
     * Blocks can be updated or whatever, and then the window
     * postMessage has to be used to pass in the rendered HTML. Then,
     * inside the iFrame I can listen for 'message' and then update
     * the iframes innerHTML with the rendered HTML from blocks.
     * I can't just throw state into the srcdoc of the iframe, otherwise
     * each time a new block is added/changed, the iframe reloads and
     * flashes white. Y U C K
     * No idea if this will be a good idea doing it this way or will
     * be performant. Will still need to pass data from iframe to parent
     * and I haven't figured that part out yet. Currently this will update
     * blocks in our app and the iframe will show new HTML without flash.
     */

    import clone from 'just-clone'
    import { onMount } from 'svelte'
    import { example_blocks } from '../lib/example-blocks'
    import { generate_html } from '../lib/builder'

    let blocks = clone(example_blocks)

    onMount(() => {
        console.log('mounted')
    })

    /**
     * Reactively make rendered_html the latest html string from blocks
     */
    $: rendered_html = generate_html(blocks)

    /**
     * Here I just made a test button outside of the iframe
     * to test out the window postMessage feature.
     * > https://blog.logrocket.com/the-ultimate-guide-to-iframes/
     * > https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
     * The second argument in the postMessage method is the target Origin.
     */
    const test_button = () => {
        /**
         * Here I render the state to string, otherwise it renders some
         * special svelte reactivty stuff as a object
         */
        const _html = `${rendered_html}`
        const target_frame = document.getElementById('preview_iframe')
        target_frame.contentWindow.postMessage(_html, '*')
    }

    const add_block = () => {
        /**
         * Example block adding
         */
        blocks = [
            ...blocks,
            {
                id: '4232225',
                classes: ['bg-gray-200', 'py-24'],
                tag: 'section',
                children: [
                    {
                        id: '323292',
                        classes: [
                            'text-red-500',
                            'text-center',
                            'text-3xl',
                            'bg-blue-100',
                        ],
                        tag: 'h1',
                        data: {
                            content: 'Heading Text',
                        },
                    },
                ],
            },
        ]
    }

    /**
     * Script to run from iframe. This will listen for the window
     * postMessage. From the event argument we get a few things,
     * but most importantly, the 'data' object which is the rendered
     * html we passed in from the window postMessage above
     * Once we get that HTML string, we replace the document body with
     * the latest HTML and bam, no reload
     */
    const script_test = `
        window.addEventListener("message", (event) => {
            // console.log(event.data)
            document.body.innerHTML = event.data
        }, false);
    `
</script>

<div>
    <h1>Svelte Iframe Test</h1>
    <iframe
        title="preview"
        sandbox="allow-scripts"
        class="w-full"
        onload="console.log('loaded...')"
        id="preview_iframe"
        srcdoc={`
            <html>
                <head>
                    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
                    <!-- Have to do this weird script template literal hack -->
                    <!-- Otherwise prettier will jack it all up -->
                    <scrip${'t'}>${script_test}</scrip${'t'}>
                </head>
                <body>
                    <div>
                        <h1>test</h1>
                    </div>
                </body>
            </html>
        `}
    />
</div>
<button on:click={() => add_block()}>Add Block</button>
<button on:click={() => test_button()}>Outside Button</button>
