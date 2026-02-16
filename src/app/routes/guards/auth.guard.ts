import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenExpiredError} from '@shared/model';
import {TokenApiService} from '@entity/token/api/token-api.service';
import {UserApiService} from '@entity/user/api/user-api.service';
import {TokenModelService} from '@entity/token/model';
import {USER_TOKEN} from '@entity/user/model/models';

// Довольно длинный гуард, который пытается запросить пользователя по токену из хранилища, если в сторе его еще нет
// Если в результате запроса возвращается ошибка что аксес токен экспайред, токены перезапрашиваются и запрос делается снова
// И если на каком-то этапе ошибка возвращается вновь - гуард выкидывает пользователя
export const authGuard: CanActivateFn = (route, state) => {
  const currentUser$ = inject(USER_TOKEN);
  const tokenModelService = inject(TokenModelService);
  const tokenApiService = inject(TokenApiService);
  const router = inject(Router);
  if (currentUser$.value) return of(true);
  else {
    const userApiService = inject(UserApiService);
    return userApiService.getUser().pipe(
      tap((user) => currentUser$.next(user)),
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
                  currentUser$.next(user);
                  return blockRoute()
                }),
                catchError((err) => {
                  return blockRoute()
                })
              )
          } catch (err) {
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
