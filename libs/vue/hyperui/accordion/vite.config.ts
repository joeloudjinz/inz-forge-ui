import { createVueLibViteConfig } from '../../../../tools/build-configs/vue/lib/vite.config';

export default createVueLibViteConfig({
  root: import.meta.dirname,
  name: 'accordion',
  // Optional overrides
  // cacheDir: '../../../../node_modules/.vite/libs/vue/hyperui/accordion',
});
