import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import localeDe from '@angular/common/locales/de';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {registerLocaleData} from '@angular/common';
import {provideNativeDateAdapter} from '@angular/material/core';
import {provideHttpClient, withFetch} from '@angular/common/http';

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
    }

  ]
};
