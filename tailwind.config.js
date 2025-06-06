// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#3b82f6", // Blue for buttons, highlights
                secondary: "#10b981", // Green for charts
            },
        },
    },
    plugins: [],
};
