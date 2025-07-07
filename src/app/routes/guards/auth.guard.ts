import {CanActivateFn, Router} from '@angular/router';
import {UserModelService} from '../../../entity';
import {inject} from '@angular/core';
import {UserApiService} from '../../../shared/api';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenExpiredError, TokenModelService} from '../../../shared';
import {TokenApiService} from '../../../shared/api/token/token-api.service';

// Довольно длинный гуард, который пытается запросить пользователя по токену из хранилища, если в сторе его еще нет
// Если в результате запроса возвращается ошибка что аксес токен экспайред, токены перезапрашиваются и запрос делается снова
// И если на каком-то этапе ошибка возвращается вновь - гуард выкидывает пользователя
export const authGuard: CanActivateFn = (route, state) => {
  const userModelService = inject(UserModelService);
  const tokenModelService = inject(TokenModelService);
  const tokenApiService = inject(TokenApiService);
  const router = inject(Router);
  if (userModelService.currentUser$.value) return of(true);
  else {
    const userApiService = inject(UserApiService);
    return userApiService.getUser().pipe(
      tap((user) => userModelService.currentUser$.next(user)),
      catchError((err: HttpErrorResponse) => {
        if (err.error.message == TokenExpiredError) {
          const refreshToken = tokenModelService.getTokens().refreshToken;
          if (!refreshToken) return blockRoute()
          try {
            return tokenApiService.refreshTokens(refreshToken)
              .pipe(
                switchMap((tokens) => {
                  tokenModelService.setTokens(tokens);
                  return userApiService.getUser()
                }),
                map((user) => {
                  userModelService.currentUser$.next(user);
                  return blockRoute()
                })
              )
          } catch (err) {
            console.error(err);
            return blockRoute()
          }
        } else return blockRoute()
      }),
      map((user) => !!user),
    )
  }

  function blockRoute() {
    router.navigate(['/auth/login'])
    return of(false);
  }
};
