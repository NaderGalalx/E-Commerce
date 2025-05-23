import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes , withViewTransitions(),
      withInMemoryScrolling({scrollPositionRestoration : "enabled"})),
      importProvidersFrom( BrowserAnimationsModule ) ,
      provideToastr(),
      provideClientHydration(),
      provideHttpClient( withFetch() ) 
    ]
};
