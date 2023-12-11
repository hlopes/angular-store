import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { loadStripe } from '@stripe/stripe-js'

import { environment } from '../../environments/environment'

import { CartItem } from '../types/cart'

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly http = inject(HttpClient)

  checkout(items: CartItem[]) {
    this.http
      .post<{ id: string }>(`${environment.checkoutApiBaseUrl}/checkout`, {
        items,
      })
      .subscribe(async (res) => {
        let stripe = await loadStripe(environment.stripeKey)

        stripe?.redirectToCheckout({
          sessionId: res.id,
        })
      })
  }
}
