import { Component, OnInit, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'

import { Cart, CartItem } from '../../types/cart'

import { CartService } from '../../services/cart.service'
import { CheckoutService } from '../../services/checkout.service'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  private readonly cartService: CartService = inject(CartService)
  private readonly checkoutService: CheckoutService = inject(CheckoutService)

  cart?: Cart

  // dataSource: CartItem[] = []

  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ]

  get dataSource() {
    return this.cart?.items ?? []
  }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => (this.cart = _cart))
    // this.dataSource = this.cart?.items ?? []
  }

  getTotal(): number {
    return this.cartService.getTotal()
  }

  onClearCart() {
    this.cartService.clearCart()
  }

  onRemoveItem(item: CartItem) {
    this.cartService.removeItem(item)
  }

  onDecreaseQuantity(item: CartItem) {
    this.cartService.decreaseQuantity(item)
  }

  onIncreaseQuantity(item: CartItem) {
    this.cartService.addToCart(item)
  }

  onCheckout() {
    this.checkoutService.checkout(this.cart?.items ?? [])
  }
}
