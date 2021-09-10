// tailwind.config.js
module.exports = {
    purge: [],
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        screen: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1028px",
            "2xl": "1536px",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}