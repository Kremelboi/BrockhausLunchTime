import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection, isDevMode
} from '@angular/core';
import localeDe from '@angular/common/locales/de';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {registerLocaleData} from '@angular/common';
import {provideNativeDateAdapter} from '@angular/material/core';
import {provideHttpClient, withFetch} from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';

registerLocaleData(localeDe);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideNativeDateAdapter(),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    {
      provide: LOCALE_ID,
      useValue: 'de-DE'
    }, provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })

  ]
};
