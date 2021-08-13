const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.svelte', './src/**/*.css', './src/**/*.js'],
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
