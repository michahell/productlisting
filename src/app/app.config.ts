import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { corsProxyInterceptor } from './interceptors/cors-proxy-interceptor';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideHeart, lucideInfo } from '@ng-icons/lucide';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([corsProxyInterceptor])),
    provideIcons({ lucideHeart, lucideChevronRight, lucideInfo }),
  ],
};
