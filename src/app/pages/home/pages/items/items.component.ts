import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ItemsService } from './services/items.service';
import { map, Observable, of, tap } from 'rxjs';
import { MenuItem } from './models/item.model';
import { HeaderComponent } from '@components/header/header.component';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { SidebarModule } from 'primeng/sidebar';
import { ItemComponent } from './components/item/item.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CreateItemComponent,
    SidebarModule,
    ItemComponent,
  ],
  templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
  private _menuItems = inject(ItemsService);

  items$!: Observable<MenuItem[]>;
  createItem = false;
  item!: MenuItem;
  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.items$ = this._menuItems.getAllItems();
  }

  createdItem() {
    this.createItem = false;
    this.loadItems();
  }

  editItem(item: MenuItem) {
    this.createItem = true;
    this.item = item;
  }

  searchItems(search: string) {
    this.items$ = this._menuItems.searchItems(search);
  }
}
