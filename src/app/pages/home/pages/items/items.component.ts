import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ItemsService } from './services/items.service';
import { map, Observable, of } from 'rxjs';
import { MenuItem } from './models/item.model';
import { HeaderComponent } from '@components/header/header.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CreateItemComponent, SidebarModule],
  templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
  private _menuItems = inject(ItemsService);

  items$!: Observable<MenuItem[]>;
  createItem = false;
  ngOnInit(): void {
    this.items$ = this._menuItems.getAllItems().pipe(
      map((response) => {
        if (response.error) {
          return [];
        }
        return response.data;
      }),
    );
  }
}