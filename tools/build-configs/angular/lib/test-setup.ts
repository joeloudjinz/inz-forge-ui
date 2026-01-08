import '@angular/compiler'; // MANDATORY for TestBed in JSDOM
import '@analogjs/vitest-angular/setup-snapshots';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

setupTestBed({
  zoneless: true,
});
