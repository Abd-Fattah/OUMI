/** @type {import('tail').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './hooks/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#fafafa',   // пример цвета фона
        foreground: '#111827',   // пример цвета текста
      },
    },
  },
  plugins: [],
}

