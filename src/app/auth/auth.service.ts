import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthResponse } from './models/auth-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  public signUp(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlVT_dcJpntW8ND0CH7vKizDUFN4XLB9k',
      { email, password, returnSecureToken: true }
    )
      .pipe(catchError((err) => this.errorHandler(err, email)));
  }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDlVT_dcJpntW8ND0CH7vKizDUFN4XLB9k',
      { email, password, returnSecureToken: true }
    )
      .pipe(catchError((err) => this.errorHandler(err, email)));
  }

  private errorHandler(errorRes: HttpErrorResponse, email: string): ObservableInput<AuthResponse> {
    let errorMessage = 'An unknown error has occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = `The email: '${email}' address is already in use by another account`;
      break;
    case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'Password sign-in is disabled for this project.';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'Wrong password';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = `${email} isn't registered.`;
      break;
    case 'USER_DISABLED':
      errorMessage = `The user account with email: '${email}' has been disabled by an administrator.`;
      break;
    default:
      errorMessage;
    }
    return throwError(errorMessage);
  }
}
