import {
  provideHttpClient,
  withInterceptors,
  withRequestsMadeViaParent,
} from '@angular/common/http';
import { Routes } from '@angular/router';
import { planetInterceptor } from './interceptors/planet.interceptor';

export const PLANET_ROUTES: Routes = [
  {
    path: 'list',
    loadComponent: () =>
      import('./planets/planets.component').then((m) => m.PlanetsComponent),
  },
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full',
  },
];
