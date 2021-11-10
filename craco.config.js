module.exports = {
    style: {
      postcss: {
        plugins: [
          // tailwindcss('./tailwind.config'),
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  }