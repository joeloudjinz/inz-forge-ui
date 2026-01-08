import { getAngularLibViteConfig } from '../../../../tools/build-configs/angular/lib/vite.config';

export default getAngularLibViteConfig({
  root: __dirname,
  testName: 'ng--hyperui-side-menu' // Used for coverage reporting
});
