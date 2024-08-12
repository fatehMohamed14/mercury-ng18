import { inject, Injectable } from '@angular/core';
import { Credentials } from './auth.model';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  errorWithTimestamp$ = throwError(() => {
    const error: any = new Error(`Incorrect credentials`);
    return error;
  });

  login$ = (credentials: Credentials) => {
    if (
      credentials.username === 'admin' &&
      credentials.password === 'P@ssw0rd'
    ) {
      return of({ loggedin: true, username: 'admin' });
    } else {
      return this.errorWithTimestamp$;
    }
  };
}
