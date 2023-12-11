import { Component, Input, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatBadgeModule } from '@angular/material/badge'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'

import { Cart } from '../../types/cart'

import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private readonly cartService: CartService = inject(CartService)

  cart?: Cart

  get itemsQuantity() {
    return this.cartService.cart.value.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    )
  }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => (this.cart = _cart))
  }

  getTotal(): number {
    return this.cartService.getTotal()
  }

  onClearCart() {
    this.cartService.clearCart()
  }

  onLogout() {
    throw new Error('Method not implemented.')
  }
}
