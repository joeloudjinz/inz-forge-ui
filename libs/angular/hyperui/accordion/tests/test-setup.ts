import '@angular/compiler'; // Required for JIT in tests
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

// Initialize the Angular testing environment with the non-deprecated platform
getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);
