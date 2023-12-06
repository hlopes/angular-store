import { Injectable, inject } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'

import { Cart, CartItem } from '../types/cart'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] })

  snackBar = inject(MatSnackBar)

  constructor() {}

  addToCart(itemToAdd: CartItem) {
    const items = [...this.cart.value.items]
    const itemInCart = items.find((item) => item.id === itemToAdd.id)

    if (itemInCart) {
      itemInCart.quantity += 1
    } else {
      items.push(itemToAdd)
    }

    this.cart.next({ items })
    this.snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 })
    console.log('### ', this.cart.value)
  }
}
