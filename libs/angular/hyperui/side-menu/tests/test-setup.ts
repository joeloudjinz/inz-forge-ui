import '@analogjs/vitest-angular/setup-snapshots';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

/**
 * Initialize the Angular testing environment.
 *
 * Since Angular v21 is used, enable 'zoneless: true'.
 * This removes the need for 'zone.js' and 'zone.js/testing' imports.
 */
setupTestBed({
  zoneless: true,
});
