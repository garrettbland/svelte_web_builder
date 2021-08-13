/**
 * Main builder
 * Accepts array of blocks and returns html
 */

const LAYOUTS_TAGS = ['section', 'div']
const CONTENT_TAGS = ['h1', 'h2', 'h3', 'p', 'img']

export const generate_html = (blocks) => {
    /**
     * Map through blocks array and join array without
     * spaces to build the html to be rendered
     */
    return blocks
        .map((block) => {
            if (LAYOUTS_TAGS.includes(block.tag)) {
                return `
                    <${block.tag} class="${block.classes.join(' ')}">
                        ${generate_html(block.children)}
                    </${block.tag}>
                `
            } else if (CONTENT_TAGS.includes(block.tag)) {
                return `
                    <${block.tag} class="${block.classes.join(' ')}">
                        ${block.data.content}
                    </${block.tag}>
                `
            }
        })
        .join('')
}
