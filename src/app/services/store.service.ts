import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { environment } from '../../environments/environment'

import { Product } from '../types/product'

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly http = inject(HttpClient)

  getAllProducts(
    limit = '12',
    sort = 'desc',
    category = ''
  ): Observable<Product[]> {
    const queryString = `?sort=${sort}&limit=${limit}`
    const urlWithCategory = category
      ? `${environment.storeApiBaseUrl}/products/category/${category}`
      : `${environment.storeApiBaseUrl}/products`

    return this.http.get<Product[]>(`${urlWithCategory}${queryString}`)
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.storeApiBaseUrl}/products/categories`
    )
  }
}
