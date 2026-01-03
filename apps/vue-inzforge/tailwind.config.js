const baseConfig = require('../../tailwind.config.base.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Extend the shared base config (which loads tailwindcss-animate)
  presets: [baseConfig],

  // These are fallback paths. The runtime now prioritizes @source in CSS.
  content: [
    './src/**/*.{html,js,ts,vue}',
    '../../libs/vue/**/*.{html,js,ts,vue}',
    '../../libs/shared/**/*.{html,js,ts,vue}',
  ],
};
