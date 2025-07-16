import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {TokenModelService} from '../../shared';

// Крепит access токен к запросу
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenModelService = inject(TokenModelService);
  const tokens = tokenModelService.getTokens();
  let tokenizedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${tokens.accessToken}`
    }
  })
  return next(tokenizedReq);
};
