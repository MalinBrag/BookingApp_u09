import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { userAuthInterceptor } from './core/interceptors/user-auth.interceptor';
import { adminAuthInterceptor } from './core/interceptors/admin-auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([userAuthInterceptor, adminAuthInterceptor]),
      withFetch()
    ), provideAnimationsAsync(),
  ]
};
