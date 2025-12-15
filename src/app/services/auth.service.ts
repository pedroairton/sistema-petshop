import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Admin, AuthResponse } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:8000'
      : 'https://api1.srv1109011.hstgr.cloud';
  // private apiUrl = 'https://api1.srv1109011.hstgr.cloud';

  private http = inject(HttpClient);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentAdminSubject = new BehaviorSubject<Admin | null>(null);

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentAdmin$ = this.currentAdminSubject.asObservable();

  private accessToken: string | null = null
  private refreshTokenKey: string | null = null

  private readonly TOKEN_KEY = 'auth_token';
  private readonly ADMIN_KEY = 'auth_admin';

  constructor() {
    // this.checkAuth().subscribe();
  }
  // auth

  loginAdmin(admData: any) {
    return this.http
      .post(this.apiUrl + '/api/login', admData, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          if(response.token && response.admin) {
            localStorage.setItem(this.TOKEN_KEY, response.token)
            localStorage.setItem(this.ADMIN_KEY, response.admin)

            this.setToken(response.token)

            this.isAuthenticatedSubject.next(true)
            this.currentAdminSubject.next(response.admin)
          }
          this.isAuthenticatedSubject.next(true)
          this.currentAdminSubject.next(response.admin)
        })
      );
  }
  logout() {
    return this.http
      .post(this.apiUrl + '/api/logout', {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.isAuthenticatedSubject.next(false);
          this.currentAdminSubject.next(null);
        })
      );
  }
  checkAuth(): Observable<AuthResponse> {
    return this.http
      .get<AuthResponse>(this.apiUrl + '/api/auth/check', {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.isAuthenticatedSubject.next(response.authenticated);
          if (response.authenticated && response.admin) {
            this.currentAdminSubject.next(response.admin);
            console.log('Usuário está autenticado');
          } else {
            this.currentAdminSubject.next(null);
            console.log('Não está autenticado')
          }
        })
      );
  }
  refreshToken() {
    return this.http.post(`${this.apiUrl}/auth/refresh`, {}, {
      headers: { skip: 'true' } // Pode usar header customizado para ignorar interceptor
    }).pipe(
      catchError(() => {
        // Se falhar o refresh, faz logout
        this.logout();
        return throwError(() => new Error('Falha ao renovar sessão'));
      })
    );
  }
  getToken(): string | null {
      return localStorage.getItem(this.TOKEN_KEY)
  }

  setToken(token: string): void {
    this.accessToken = token;
  }
  removeToken(): void {
    this.accessToken = null
    this.refreshTokenKey = null
    this.clearStorage()
  }
  private saveToStorage(token: string, admin: Admin): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.ADMIN_KEY, JSON.stringify(admin));
  }
  private clearStorage(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ADMIN_KEY);
    this.isAuthenticatedSubject.next(false);
    this.currentAdminSubject.next(null);
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  get currentAdmin(): Admin | null {
    return this.currentAdminSubject.value;
  }
}
