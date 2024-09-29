import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { OrdersService } from './services/orders.service';
import { Order } from './model/order.model';
import { map, Observable } from 'rxjs';
import { SidebarModule } from 'primeng/sidebar';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { OrderComponent } from './components/order/order.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarModule,
    CreateOrderComponent,
    OrderComponent,
  ],
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  private _menuOrders = inject(OrdersService);

  orders$!: Observable<Order[]>;
  createOrder = false;
  order!: Order;
  lastOrderIndex: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orders$ = this._menuOrders.getOpenOrders();
  }

  newOrder() {
    this._menuOrders.getLastOrderIndex().subscribe((lastOrderIndex) => {
      this.lastOrderIndex = lastOrderIndex;
      this.createOrder = true;
    });
  }

  createdOrder() {
    this.createOrder = false;
    this.loadOrders();
  }

  editOrder(order: Order) {
    this.createOrder = true;
    this.order = order;
  }

  searchOrders(search: string) {
    this.orders$ = this._menuOrders.searchOrders(search);
  }
}
