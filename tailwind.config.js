/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'node-root': '#F59E0B',    // Amber 500
        'node-security': '#3B82F6', // Blue 500
        'node-availability': '#EC4899', // Pink 500
        'node-continuity': '#10B981', // Emerald 500
        'node-risk': '#F97316',    // Orange 500
        'node-sla': '#8B5CF6',     // Violet 500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
