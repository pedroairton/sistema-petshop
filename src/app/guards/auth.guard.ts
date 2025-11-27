import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(ApiService)
  const router = inject(Router)

  return authService.checkAuth().pipe(
    map((response: any) => {
      if(response.authenticated){
        return true
      } else {
        router.navigate(['/login'], {
          queryParams: {returnUrl: state.url},
        })
        return false
      }
    }), 
    catchError((error) => {
      console.error('Erro ao verificar autenticação:', error);
      router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return of(false);
    })
  )
};
