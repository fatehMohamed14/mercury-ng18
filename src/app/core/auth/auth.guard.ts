import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthStore } from '../../store/auth.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(AuthStore);
  const router = inject(Router);
  return toObservable(store.isLoggedIn).pipe(
    map((isloggedIn) => {
      if (isloggedIn) return true;
      else return router.createUrlTree(['/auth/login']);
    })
  );
};
export const authChildGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => authGuard(route, state);
