import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ApiService } from '../services/api.service';
import { catchError, map, Observable, of } from 'rxjs';

export class AuthGuard implements CanActivate {
  private authService = inject(ApiService);
  private router = inject(Router);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkAuth().pipe(
      map((response: any) => {
        if (response.authenticated) {
          return true;
        } else {
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
      }),
      catchError((error) => {
        console.error('Erro ao verificar autenticação:', error);
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        return of(false);
      })
    );
  }
}
