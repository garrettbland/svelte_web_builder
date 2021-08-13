const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: ['./**/*.html'],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                ...colors,
            },
        },
    },
    variants: {},
    plugins: [],
}
