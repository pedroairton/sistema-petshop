import { 
  HttpInterceptorFn, 
  HttpRequest, 
  HttpHandlerFn, 
  HttpErrorResponse 
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>, 
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Obtém o token
  const token = authService.getToken();
  
  // Clona a requisição para adicionar headers
  let authReq = req;
  
  if (token && !isPublicRoute(req.url)) {
    authReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
  
  // Processa a requisição
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Tratamento de erros de autenticação
      if (error.status === 401) {
        alert('Erro com a sessão de usuário: 401')
        // Limpa o token e redireciona para login
        authService.logout();
        router.navigate(['/login'], {
          queryParams: { returnUrl: router.url }
        });
      }
      
      if (error.status === 403) {
        alert('Erro com a sessão de usuário: 403')
        router.navigate(['/unauthorized']);
      }
      
      // Repropaga o erro
      return throwError(() => error);
    })
  );
};

/**
 * Verifica se a rota é pública (não precisa de autenticação)
 */
const isPublicRoute = (url: string): boolean => {
  const publicRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/refresh'
  ];
  
  return publicRoutes.some(route => url.includes(route));
};