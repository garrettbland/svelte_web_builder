/**
 * Example blocks to test out the builder with
 */
import { nanoid } from 'nanoid'

export const example_blocks = [
    {
        id: nanoid(),
        classes: ['bg-gray-200', 'py-24'],
        tag: 'section',
        children: [
            {
                id: nanoid(),
                classes: [
                    'max-w-4xl',
                    'mx-auto',
                    'grid',
                    'grid-cols-1',
                    'md:grid-cols-2',
                    'gap-8',
                ],
                tag: 'div',
                children: [
                    {
                        id: nanoid(),
                        tag: 'div',
                        classes: ['bg-blue-100', 'p-4'],
                        children: [
                            {
                                id: nanoid(),
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
                    {
                        id: nanoid(),
                        tag: 'div',
                        classes: ['bg-red-100', 'p-4'],
                        children: [
                            {
                                id: nanoid(),
                                classes: [
                                    'text-pink-500',
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
                ],
            },
        ],
    },
]
