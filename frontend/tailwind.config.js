module.exports = {
    content: [
        `./components/**/*.{vue,js}`,
        `./layouts/**/*.vue`,
        `./pages/**/*.vue`,
        `./plugins/**/*.{js,ts}`
    ],
    safelist: [
        
    ],
    theme: {
        extend: {
            fontFamily: {
                headline: ['Audiowide', 'sans-serif'],
                body: ['Play', 'sans-serif'],
                sans: ['Play', 'sans-serif'],
            },
            borderRadius: {
                
            },
            spacing: {
                
            },
            fontSize: {
                
            },
            colors: {

            },
            dropShadow: {
                intensedark: '1px 2px 5px rgba(0, 0, 0, 0.8)',
            }
        },
    },

    plugins: [],
}
