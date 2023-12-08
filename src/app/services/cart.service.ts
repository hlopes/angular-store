import { Injectable, inject } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'

import { Cart, CartItem } from '../types/cart'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  snackBar = inject(MatSnackBar)

  cart = new BehaviorSubject<Cart>({ items: [] })

  addToCart(itemToAdd: CartItem) {
    const items = [...this.cart.value.items]
    const itemInCart = items.find((item) => item.id === itemToAdd.id)

    if (itemInCart) {
      itemInCart.quantity += 1
    } else {
      items.push(itemToAdd)
      this.snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 })
    }

    this.cart.next({ items })
  }

  getTotal(): number {
    return this.cart.value.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    )
  }

  clearCart() {
    this.cart.next({ items: [] })
    this.snackBar.open('Cart is empty.', 'Ok', { duration: 3000 })
  }

  removeItem(item: CartItem) {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    )

    this.cart.next({
      items: filteredItems,
    })
    this.snackBar.open('1 Item removed from the Cart.', 'Ok', {
      duration: 3000,
    })
  }

  decreaseQuantity(item: CartItem) {
    const items = [...this.cart.value.items]
    const itemInCart = items.find((_item) => _item.id === item.id)

    if (itemInCart) {
      itemInCart.quantity -= 1

      const withoutItemsNoQuantity = items.filter((_item) => item.quantity)

      this.cart.next({ items: withoutItemsNoQuantity })
    }
  }
}
