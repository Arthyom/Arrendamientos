import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";

import { routes } from "./app.routes";
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from "@angular/common/http";
// import { RESOURCE_NAME } from "./shared/services/service-arr-data-requester";

export const appConfig: ApplicationConfig = {
  providers: [

    // {provide: RESOURCE_NAME, useValue: '' },
    provideRouter(routes, withComponentInputBinding()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideIonicAngular({}),
    provideHttpClient(),

  ],
};
