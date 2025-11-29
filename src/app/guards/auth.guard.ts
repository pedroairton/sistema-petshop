import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.checkAuth().pipe(
    map((response: any) => {
      if(response.authenticated){
        console.log("Usuário logado");
        return true
      } else {
        console.log("Usuário não autenticado, redirecionando para login");
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
