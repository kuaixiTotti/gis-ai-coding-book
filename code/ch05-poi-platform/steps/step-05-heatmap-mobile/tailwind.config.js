/** @type {import('tailwindcss').Config} */
export default {
  // 告诉 Tailwind 去哪些文件里找用到的 class,只打包用到的样式
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
