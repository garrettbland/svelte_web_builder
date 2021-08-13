<script>
    import clone from 'just-clone'
    let blocks = [
        {
            id: '1234',
            classes: ['bg-gray-200', 'py-24'],
            tag: 'section',
            children: [
                {
                    id: '323292',
                    classes: [
                        'text-red-500',
                        'text-center',
                        'text-3xl',
                    ],
                    tag: 'h1',
                    data: {
                        content: 'Heading Text',
                    },
                },
            ],
        },
    ]

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

    const generate_html = (blocks) => {
        /**
         * Map through blocks array and join array without
         * spaces to build the html to be rendered
         */
        return blocks
            .map((block) => {
                if (block.tag === 'section') {
                    return `
                    <${block.tag} class="${block.classes.join(' ')}">
                        ${generate_html(block.children)}
                    </${block.tag}>
                `
                } else if (block.tag === 'h1') {
                    return `
                    <${block.tag} class="${block.classes.join(' ')}">
                        ${block.data.content}
                    </${block.tag}>
                `
                }
            })
            .join('')
    }
</script>

<div>
    {@html generate_html(blocks)}
</div>
<button on:click={() => add_block()}>Add Block</button>
