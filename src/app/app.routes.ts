import { Routes } from '@angular/router';
import { authChildGuard, authGuard } from './core/auth/auth.guard';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { planetInterceptor } from './features/planet/interceptors/planet.interceptor';
import { PlanetService } from './features/planet/planet.service';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.routes').then((routes) => routes.AUTH_ROUTES),
  },
  {
    path: 'planet',
    loadChildren: () =>
      import('./features/planet/planet.routes').then(
        (routes) => routes.PLANET_ROUTES
      ),
    canActivateChild: [authChildGuard],
    providers: [
      PlanetService,
      provideHttpClient(withInterceptors([planetInterceptor])),
    ],
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
];
