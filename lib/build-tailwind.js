/**
 * Experimenting with generating tailwind into
 * css programtically using postcss API
 *
 * This will be used for generating static page and purging
 * unused styles so client css is small as possible
 */

import fs from 'fs'
import path from 'path'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import cssnano from 'cssnano'

/**
 * Post CSS Plugins
 * We can pass in a custom config file with our tailwind plugin
 * CSS Nano is used to compress css and remove whitespace
 */
const POST_CSS_PLUGINS = [
    tailwindcss(path.join(process.cwd(), 'lib/tailwind.config.cjs')),
    autoprefixer,
    cssnano,
]

/**
 * Initialize postcss with plugins
 */
postcss(POST_CSS_PLUGINS)
    .process(
        /**
         * PostCSS needs the initial css file to start
         */
        fs.readFileSync(path.join(process.cwd(), 'lib/tailwind.css'))
    )
    .then((result) => {
        /**
         * Once compiled, we now have styles purged and css classes
         * compressed. Here we could write this to a file or do
         * whatever we want with it now.
         */
        console.log(result.css)
    })
