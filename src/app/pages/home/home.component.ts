import { Component } from '@angular/core'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatGridListModule } from '@angular/material/grid-list'

import { ProductHeaderComponent } from './components/product-header/product-header.component'
import { FiltersComponent } from './components/filters/filters.component'
import { ProductBoxComponent } from './components/product-box/product-box.component'

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
export class HomeComponent {
  cols = 3
  category?: string
  rowHeight = ROW_HEIGHTS[this.cols]

  onColumnCountChange(colsNum: number) {
    this.cols = colsNum
    this.rowHeight = ROW_HEIGHTS[this.cols]
  }

  onShowCategory(newCategory: string) {
    this.category = newCategory
  }
}
