import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Product } from '../types/product'

// TODO: add env var
const STORE_BASE_URL = 'https://fakestoreapi.com'

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
      ? `${STORE_BASE_URL}/products/category/${category}`
      : `${STORE_BASE_URL}/products`

    return this.http.get<Product[]>(`${urlWithCategory}${queryString}`)
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${STORE_BASE_URL}/products/categories`)
  }
}
