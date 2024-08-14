import { Routes } from '@angular/router';

export const PLANET_ROUTES: Routes = [
  {
    path: 'list',
    loadComponent: () =>
      import('./planets/planets.component').then((m) => m.PlanetsComponent),
  },
  {
    path: '',
    redirectTo: '/planet/list',
    pathMatch: 'full',
  },
];
