import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AuthService } from '../core/auth/auth.service';
import { Observable, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Credentials } from '../core/auth/auth.model';
import {
  withDevtools,
  withStorageSync,
} from '@angular-architects/ngrx-toolkit';

type AuthState = {
  isLoading: boolean;
  isLoggedIn: boolean;
  username: string;
  error: string;
};

const initialState: AuthState = {
  isLoading: false,
  isLoggedIn: false,
  username: '',
  error: '',
};

export const AuthStore = signalStore(
  // { protectedState: false }, // make the store mutable
  { providedIn: 'root' },
  withStorageSync({
    key: 'auth',
    autoSync: true,
    storage: () => localStorage,
  }),
  withDevtools('auth'),
  withState(initialState),
  withMethods((store, authService = inject(AuthService)) => {
    function successLogin(username: string): void {
      patchState(store, (state) => ({
        ...state,
        isLoading: false,
        isLoggedIn: true,
        username,
        error: '',
      }));
    }
    function failedLogin(error: string): void {
      patchState(store, (state) => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error,
      }));
    }
    function logOut(): void {
      patchState(store, (state) => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
        username: '',
      }));
    }
    // login api call
    const login = rxMethod<Credentials>(
      pipe(
        tap((_) => patchState(store, { isLoading: true })),
        switchMap((credentials) =>
          authService.login$(credentials).pipe(
            tap({
              next: (credentials) => {
                setTimeout(() => {
                  successLogin(credentials.username);
                }, 2000);
              },
              error: (error) => {
                failedLogin(error.message);
              },
            })
          )
        )
      )
    );
    return { login, logOut };
  }),
  withHooks({
    onInit(store) {
      console.log('init store');
    },
    onDestroy(store) {
      console.log('destroy store');
    },
  })
);
