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

    import { fade, fly } from 'svelte/transition'
    import clone from 'just-clone'
    import { onMount } from 'svelte'
    import { example_blocks } from '../lib/example-blocks'
    import { generate_html } from '../lib/builder'
    import { clickOutside } from '../utils/clickOutside'
    import { returnFound } from 'find-and'
    import { isEqual, cloneDeep } from 'lodash'

    let preview_frame
    let showEditor = false
    let currentBlock = {}
    let has_changes = false
    let current_block_clone = {}
    let blocks = clone(example_blocks)

    onMount(() => {
        test_button()

        window.onmessage = (event) => {
            console.log('Event from iframe ==>', event.data)
            currentBlock = returnFound(cloneDeep(blocks), {
                id: event.data,
            })
            showEditor = true
        }
    })

    /**
     * Reactively make rendered_html the latest html string from blocks
     */
    $: rendered_html = generate_html(blocks)

    /**
     * Testing out watching for changes on the currentBlock
     */
    $: {
        // First check to see if object is empty
        if (Object.entries(currentBlock).length === 0) {
            console.log('0 entries in current block')
            has_changes = false
            current_block_clone = {}
        } else {
            if (Object.entries(current_block_clone).length === 0) {
                console.log('Cloning block...')
                current_block_clone = cloneDeep(currentBlock)
            } else {
                if (isEqual(current_block_clone, currentBlock)) {
                    has_changes = false
                    console.log('no changes...')
                } else {
                    has_changes = true
                    console.log('there are changes...')
                }
            }
        }
    }

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
        const message = {
            name: 'render_html',
            html: _html,
        }
        preview_frame.contentWindow.postMessage(message, '*')
    }

    const add_block = () => {
        /**
         * Example block adding
         */
        console.log('lloooddd')
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

    const update_preview_width = (width) => {
        preview_frame.style.width = width
    }
</script>

<div class="relative h-screen">
    {#if showEditor}
        <div
            transition:fade={{ duration: 200 }}
            class="fixed top-0 left-0 z-40 w-screen h-screen bg-black bg-opacity-20"
        >
            <div
                transition:fly={{ x: 400, duration: 200 }}
                use:clickOutside
                on:click_outside={() => {
                    // Make sure the window doesn't accidentaly close
                    // if there are changes
                    if (has_changes) {
                        alert('YOu have changes')
                    } else {
                        showEditor = false
                        currentBlock = {}
                    }
                }}
                class="absolute top-0 right-0 max-w-md w-full bg-white h-full overflow-y-scroll p-4 shadow-lg"
            >
                This is the sidebar thing.
                <p>
                    Are there changes? <strong>{has_changes}</strong>
                </p>
                <button
                    on:click={() => {
                        showEditor = false
                        currentBlock = {}
                    }}>Confirm Changes</button
                >
                <div>
                    {#if currentBlock.tag === 'h1'}
                        <input
                            bind:value={currentBlock.data.content}
                            class="p-4 border-2"
                        />
                    {/if}
                </div>
                <pre>
                    <code>
                        {JSON.stringify(currentBlock, null, 2)}
                    </code>
                </pre>
            </div>
        </div>
    {/if}
    <div class="relative w-full h-full" id="food-bg">
        <iframe
            title="preview"
            sandbox="allow-scripts"
            class="w-full z-10 h-full mx-auto bg-white shadow-lg"
            onload="console.log('loaded...')"
            id="preview_iframe"
            src="/builder/index.html"
            bind:this={preview_frame}
        />
    </div>
</div>
<div class="fixed bottom-0 left-0 z-30 bg-gray-400">
    <button on:click={() => add_block()}>Add Block</button>
    <button on:click={() => test_button()}>Outside Button</button>
    <button on:click={() => update_preview_width('400px')}
        >MOBILE VIEW</button
    >
    <button on:click={() => update_preview_width('100%')}
        >DESKTOP VIEW</button
    >
</div>
