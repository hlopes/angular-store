import { Component, EventEmitter, Output } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-product-header',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './product-header.component.html',
})
export class ProductHeaderComponent {
  sort = 'desc'
  itemsCount = 12

  @Output()
  columnCountChange = new EventEmitter<number>()

  onSortUpdated(newSort: string): void {
    this.sort = newSort
  }

  onItemsCountUpdated(newItemsCount: number): void {
    this.itemsCount = newItemsCount
  }

  onColumnsUpdated(colsNumber: number): void {
    this.columnCountChange.emit(colsNumber)
  }
}
