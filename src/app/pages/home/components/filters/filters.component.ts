import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatListModule } from '@angular/material/list'

import { StoreService } from '../../../../services/store.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MatExpansionModule, MatListModule],
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {
  private readonly storeService = inject(StoreService)

  categories?: string[]
  categoriesSubscription?: Subscription

  @Output()
  showCategory = new EventEmitter<string>()

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories))
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category)
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription?.unsubscribe()
    }
  }
}
