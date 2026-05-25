/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",       // ✅ includes Next.js 13+ `app` directory if you're using it
    "./utils/**/*.{js,ts,jsx,tsx}",     // ✅ includes emotionStyles or any utility files
  ],
  theme: {
    extend: {
      colors: {
        // optional: custom emotion colors for better control
        happy: "#FEF3C7",   // bg-yellow-100
        sad: "#DBEAFE",     // bg-blue-100
        angry: "#FECACA",   // bg-red-100
        anxious: "#E9D5FF", // bg-purple-100
        neutral: "#F3F4F6", // bg-gray-100
      },
    },
  },
  plugins: [],
};
