import { HttpInterceptorFn } from '@angular/common/http'

import { environment } from '../../environments/environment'

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const isAuthRequest = request.url.startsWith(environment.authApiBaseUrl)

  if (isAuthRequest) {
    const token = localStorage ? localStorage?.getItem('token') ?? '' : ''

    const changedRequest = request.clone({
      setHeaders: {
        Authorization: token ? `Token ${token}` : '',
      },
    })

    return next(changedRequest)
  }

  return next(request)
}
