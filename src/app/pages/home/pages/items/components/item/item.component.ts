import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../models/item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  @Output() editItem = new EventEmitter<MenuItem>();
  @Input({ required: true }) item!: MenuItem;

  imageType: { [x: string]: string } = {
    dessert: '../../../../../../../assets/images/dessert.png',
    dinner: '../../../../../../../assets/images/dinner.png',
    snack: '../../../../../../../assets/images/snack.png',
    drink: '../../../../../../../assets/images/drink.png',
  };

  get image() {
    return this.imageType[this.item.category];
  }
}
