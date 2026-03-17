import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideHeart, lucideInfo, lucideXSquare } from '@ng-icons/lucide';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideIcons({ lucideHeart, lucideChevronRight, lucideInfo, lucideXSquare }),
  ],
};
