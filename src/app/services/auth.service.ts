import { HttpClient } from '@angular/common/http'
import { Injectable, inject, signal } from '@angular/core'
import { Observable, map } from 'rxjs'

import { environment } from '../../environments/environment'

import { CreateUserRequest, LoginRequest, UserResponse } from '../types/user'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient)

  currentUserSig = signal<UserResponse | undefined | null>(undefined)

  get isAuthenticated() {
    return !!this.currentUserSig()
  }

  getCurrentUser(): Observable<UserResponse> {
    return this.http
      .get<{ user: UserResponse }>(`${environment.authApiBaseUrl}/user`)
      .pipe(map((response) => response.user))
  }

  register(user: CreateUserRequest): Observable<UserResponse> {
    return this.http
      .post<{ user: UserResponse }>(`${environment.authApiBaseUrl}/users`, {
        user,
      })
      .pipe(map((response) => response.user))
  }

  login(user: LoginRequest): Observable<UserResponse> {
    return this.http
      .post<{ user: UserResponse }>(`${environment.authApiBaseUrl}/users/login`, {
        user,
      })
      .pipe(map((response) => response.user))
  }
}
