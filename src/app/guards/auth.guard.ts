import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isPlatformBrowser: boolean = inject(PLATFORM_ID) === 'browser';

  return authService.checkAuth().pipe(
    map((response: any) => {
      if (response.authenticated) {
        console.log('Usuário logado');

        return true;
      } else {
        if (isPlatformBrowser) {
          alert('Usuário não autenticado, redirecionando para login');
        }
        router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }
    }),
    catchError((error) => {
      if (isPlatformBrowser) {
        alert('Erro ao verificar autenticação:');
      }
      router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return of(false);
    }),
  );
};
