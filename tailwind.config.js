const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "320px",
                sm: "576px",
                md: "768px",
                lg: "992px",
                xl: "1200px",
            },

            colors: {
                "menu-dark": "rgba(0, 0, 0, 0.1)",
                bg: "#202741",
                "bg-light": "#1e293b",
                secondary: {
                    50: "#e6fafc",
                    100: "#b3eff7",
                    200: "#9aeaf5",
                    300: "#35d5ea",
                    400: "#1bcfe8",
                    500: "#02cae5",
                    600: "#02b6ce",
                    700: "#02a2b7",
                    800: "#018da0",
                    900: "#017989",
                },
                "dark-orange": {
                    50: "#fbdbde",
                    100: "#fac9ce",
                    200: "#f4949d",
                    300: "#f1707d",
                    400: "#ef5e6c",
                    500: "#ed4c5c",
                    600: "#d54453",
                    700: "#be3d4a",
                    800: "#a63540",
                    900: "#8e2e37",
                },
                "light-orange": {
                    50: "#fce7da",
                    100: "#fadbc8",
                    200: "#f5b891",
                    300: "#f1a06d",
                    400: "#f0945a",
                    500: "#ee8848",
                    600: "#d67a41",
                    700: "#be6d3a",
                    800: "#a75f32",
                    900: "#8f522b",
                },
                purplish: {
                    50: "#f5f0f8",
                    100: "#ebe0f1",
                    200: "#d5bfe2",
                    300: "#c09ed3",
                    400: "#b484c9",
                    500: "#a96bbe",
                    600: "#9a5cb0",
                    700: "#8a4da2",
                    800: "#7b3e94",
                    900: "#6c2f86",
                },

                "text-light": "#fbfcf5",
                text: "#f4f8f9",
                "text-dark": "#cbcac8",
                transparent: "transparent",
            },
        },

        fontFamily: {
            poppins: ["Poppins", ...fontFamily.sans],
        },
    },
    plugins: [],
};
