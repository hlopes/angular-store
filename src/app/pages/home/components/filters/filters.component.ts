import { Component, EventEmitter, Output } from '@angular/core'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatListModule } from '@angular/material/list'

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MatExpansionModule, MatListModule],
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  categories = ['shoes', 'sports']

  @Output()
  showCategory = new EventEmitter<string>()

  onShowCategory(category: string): void {
    this.showCategory.emit(category)
  }
}
