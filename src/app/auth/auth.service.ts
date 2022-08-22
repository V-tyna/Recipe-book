import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RecipeService } from '../recipes/services/recipe.service';
import { AuthResponse } from './models/auth-response.model';
import { User } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user = new BehaviorSubject<User | null>(null);
  private tokenTimer: ReturnType<typeof setTimeout> | null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  public signUp(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlVT_dcJpntW8ND0CH7vKizDUFN4XLB9k',
      { email, password, returnSecureToken: true }
    )
      .pipe(catchError((err) => this.errorHandler(err, email)), tap((respData: AuthResponse) => {
        this.handleAuthentication(
          respData.email,
          respData.localId,
          respData.idToken,
          +respData.expiresIn
        );
      }));
  }

  public autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } | null = JSON.parse(localStorage.getItem('userData') as string);
    if (userData) {
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.user.next(loadedUser);
    }
  }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDlVT_dcJpntW8ND0CH7vKizDUFN4XLB9k',
      { email, password, returnSecureToken: true }
    )
      .pipe(catchError((err) => this.errorHandler(err, email)), tap((respData: AuthResponse) => {
        this.handleAuthentication(
          respData.email,
          respData.localId,
          respData.idToken,
          +respData.expiresIn
        );
      }));
  }

  public autoLogout(expirationDuration: number): void {
    this.tokenTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  public logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.recipeService.setRecipes([]);
    this.router.navigate(['/auth']);
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.tokenTimer = null;
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private errorHandler(errorRes: HttpErrorResponse, email: string): ObservableInput<AuthResponse> {
    let errorMessage = 'An unknown error has occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
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
