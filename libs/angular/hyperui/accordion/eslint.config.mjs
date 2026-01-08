import baseConfig from '../../../../eslint.config.mjs';
import { angularLibEslintConfig } from '../../../../tools/build-configs/angular/lib/eslint.config.mjs';

export default [
  ...baseConfig,
  ...angularLibEslintConfig,
  {
    files: ['**/*.ts'],
    rules: {
      // Library-specific overrides only
    },
  },
];
