import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.routes').then((routes) => routes.AUTH_ROUTES),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
