import { Component, OnInit, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'

import { Cart, CartItem } from '../../types/cart'
import { CartService } from '../../services/cart.service'

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
  cartService: CartService = inject(CartService)

  cart?: Cart

  dataSource: CartItem[] = []

  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ]

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => (this.cart = _cart))
    this.dataSource = this.cart?.items ?? []
  }

  getTotal(): number {
    return this.cartService.getTotal()
  }
}
