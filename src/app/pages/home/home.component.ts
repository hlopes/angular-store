import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatGridListModule } from '@angular/material/grid-list'
import { Subscription } from 'rxjs'

import { Product } from '../../types/product'

import { ProductHeaderComponent } from './components/product-header/product-header.component'
import { FiltersComponent } from './components/filters/filters.component'
import { ProductBoxComponent } from './components/product-box/product-box.component'

import { CartService } from '../../services/cart.service'
import { StoreService } from '../../services/store.service'
import { HttpClientModule } from '@angular/common/http'

const ROW_HEIGHTS: { [key: number]: number } = {
  1: 400,
  3: 335,
  4: 350,
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    MatSidenavModule,
    ProductHeaderComponent,
    FiltersComponent,
    MatGridListModule,
    ProductBoxComponent,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly cartService = inject(CartService)
  private readonly storeService = inject(StoreService)

  cols = 3
  category?: string
  rowHeight = ROW_HEIGHTS[this.cols]

  products?: Product[]
  // TODO: add a enum
  sort = 'desc'
  count = '12'
  productsSubscription?: Subscription

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((products) => (this.products = products))
  }

  onColumnCountChange(colsNum: number) {
    this.cols = colsNum
    this.rowHeight = ROW_HEIGHTS[this.cols]
  }

  onItemCountChange(itemsCount: number) {
    this.count = `${itemsCount}`

    this.getProducts()
  }

  onSortChange(sort: string) {
    this.sort = sort

    this.getProducts()
  }

  onShowCategory(newCategory: string) {
    this.category = newCategory

    this.getProducts()
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    })
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription?.unsubscribe()
    }
  }
}
