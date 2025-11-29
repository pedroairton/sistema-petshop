import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  constructor() {
    this.checkAuth().subscribe();
  }
  // auth

  // loginAdmin(admData: any) {
  //   return this.http.post(this.apiUrl + '/api/login', admData);
  // }
  loginAdmin(admData: any) {
    return this.http
      .post(this.apiUrl + '/api/login', admData, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          this.isAuthenticatedSubject.next(true);
          this.currentAdminSubject.next(response.admin);
        })
      );
  }
  logout() {
    return this.http
      .post(this.apiUrl + '/api/auth/logout', {}, { withCredentials: true })
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
          }
        })
      );
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  get currentAdmin(): Admin | null {
    return this.currentAdminSubject.value;
  }
}
