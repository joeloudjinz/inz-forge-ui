import { getAngularLibViteConfig } from '../../../../tools/build-configs/angular/lib/vite.config';

export default getAngularLibViteConfig({
  root: __dirname,
  cacheDir: '../../../../node_modules/.vite/libs/angular/hyperui/side-menu',
  testName: 'ng-side-menu',
  reportsDirectory: '../../../../coverage/libs/angular/hyperui/side-menu',
});
