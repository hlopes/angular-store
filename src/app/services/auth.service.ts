import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'

import { environment } from '../../environments/environment'

import { User } from '../types/user'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient)

  register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.authApiBaseUrl}/users`, {
      ...user,
      // name: {
      //   firstname: 'John',
      //   lastname: 'Doe',
      // },
      // address: {
      //   city: 'kilcoole',
      //   street: '7835 new road',
      //   number: 3,
      //   zipcode: '12926-3874',
      //   geolocation: {
      //     lat: '-37.3159',
      //     long: '81.1496',
      //   },
      // },
      // phone: '1-570-236-7033',
    })
  }
}
