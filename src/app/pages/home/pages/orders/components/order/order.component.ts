import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Order,
  calculateTotalValue,
  joinItemNames,
} from '../../model/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
})
export class OrderComponent {
  @Output() editOrder = new EventEmitter<Order>();
  @Input({ required: true }) order!: Order;

  get total() {
    return calculateTotalValue(this.order.items);
  }

  get itemsName() {
    return joinItemNames(this.order.items);
  }

  get formOfPayment() {
    return this.order.status === 'paid-card'
      ? 'Cartão'
      : this.order.status === 'paid-cash'
        ? 'Dinheiro'
        : this.order.status === 'paid-pix'
          ? 'Pix'
          : 'Crédito';
  }
}
