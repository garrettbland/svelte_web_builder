<script>
    import clone from 'just-clone'
    import { count } from '../store'
    import { example_blocks } from '../lib/example-blocks'
    import { generate_html } from '../lib/builder'

    const increment = () => {
        count.update((n) => n + 1)
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
</script>

{#if example_blocks}
    <div>
        {@html generate_html(example_blocks)}
    </div>
{/if}

<button on:click={() => add_block()}>Add Block</button>

{#if example_blocks}
    <pre>
        <code>{JSON.stringify(example_blocks,null,2)}</code>
    </pre>
{/if}

<div>
    Current Count: {$count}
</div>
<button on:click={() => increment()}>Add Count</button>
