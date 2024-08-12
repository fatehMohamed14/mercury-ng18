import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '../core/auth/auth.service';
import { Observable, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Credentials } from '../core/auth/auth.model';

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
    function LoggedOut(): void {
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
        switchMap((credentials) =>
          authService.login$(credentials).pipe(
            tap({
              next: (credentials) => {
                successLogin(credentials.username);
              },
              error: (error) => {
                failedLogin(error);
              },
            })
          )
        )
      )
    );
    return { login };
  })
);
