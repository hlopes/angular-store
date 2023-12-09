import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { loadStripe } from '@stripe/stripe-js'

import { CartItem } from '../types/cart'

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly http = inject(HttpClient)

  checkout(items: CartItem[]) {
    // TODO: add env var
    this.http
      .post<{ id: string }>('http://localhost:4242/checkout', {
        items,
      })
      .subscribe(async (res) => {
        //TODO: add env var
        let stripe = await loadStripe(
          'pk_test_51OLD86L96zAJCbihmassKoobW5rfEeRxLBVlwdaboFLxtSGvLIfF3EA8rhFyCFtHlLtZyjaN7Ss0bOXlxG0ldikL00cS3oSmxT'
        )

        stripe?.redirectToCheckout({
          sessionId: res.id,
        })
      })
  }
}
