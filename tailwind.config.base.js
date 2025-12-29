module.exports = {
  theme: {
    extend: {
      colors: {
        inz: {
          primary: 'var(--inz-primary, #3b82f6)',
          secondary: 'var(--inz-secondary, #1e293b)',
        }
      },
      borderRadius: {'inz-md': 'var(--inz-radius, 0.5rem)'}
    },
  },
  plugins: [require('tailwindcss-animate')]
};
