import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output, inject } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'

import { Product } from '../../../../types/product'

import { AuthService } from '../../../../services/auth.service'

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent {
  authService = inject(AuthService)

  @Input()
  fullWidthMode = false

  @Input()
  product?: Product

  @Output()
  addToCart = new EventEmitter<Product>()

  onAddToCart() {
    this.addToCart.emit(this.product)
  }
}
