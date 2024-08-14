import { inject, Injectable } from '@angular/core';
import { Credentials } from './auth.model';
import { of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

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
    console.log('credentials', credentials);
    if (
      credentials.username.trim() === 'admin' &&
      credentials.password.trim() === 'P@ssw0rd'
    ) {
      return of({ loggedin: true, username: 'admin' });
    } else {
      return this.errorWithTimestamp$;
    }
  };
}
