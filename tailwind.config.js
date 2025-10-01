/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                'cinzel': ['var(--font-cinzel)', 'serif'],
                'lora': ['var(--font-lora)', 'serif'],
                'geist': ['var(--font-geist-sans)', 'sans-serif'],
                'geist-mono': ['var(--font-geist-mono)', 'monospace'],
                'noto-sans-jp': ['var(--font-noto-sans-jp)', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                pulseGlow: {
                    '0%': { boxShadow: '0 0 5px rgba(79, 70, 229, 0.5)' },
                    '100%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.8)' },
                },
            },
        },
    },
    plugins: [],
};
