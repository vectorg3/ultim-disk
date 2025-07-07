import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {TokenExpiredError, TokenModelService} from '../../shared';
import {inject} from '@angular/core';
import {TokenApiService} from '../../shared/api/token/token-api.service';
import {Router} from '@angular/router';

// Ловит ошибку если access token истек, обновляет токены
export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenApiService = inject(TokenApiService);
  const tokenModelService = inject(TokenModelService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.error.message == TokenExpiredError && !req.url.includes('/user/me')) {
        const refreshToken = tokenModelService.getTokens().refreshToken;
        if (!refreshToken) return throwError(err);
        tokenApiService.refreshTokens(refreshToken).subscribe({
          next: (tokens) => {
            tokenModelService.setTokens(tokens);
          },
          error: (err: HttpErrorResponse) => {
            tokenModelService.clearTokens();
            router.navigate(['/']);
          }
        });
      }
      return throwError(err);
    })
  );
};
