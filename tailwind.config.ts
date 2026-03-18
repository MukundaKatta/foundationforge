import type { Config } from "tailwindcss";
const config: Config = { content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], darkMode: "class", theme: { extend: { colors: { brand: { 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c" } } } }, plugins: [] };
export default config;
