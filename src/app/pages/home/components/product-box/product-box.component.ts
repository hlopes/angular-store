import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'

import { Product } from '../../../../types/product'

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent {
  @Input()
  fullWidthMode = false

  product?: Product = {
    id: 1,
    title: 'Sneackers',
    price: 150,
    category: 'shoes',
    description: 'Description',
    image: 'https://via.placeholder.com/150',
  }

  @Output()
  addToCart = new EventEmitter<Product>()

  onAddToCart() {
    this.addToCart.emit(this.product)
  }
}
