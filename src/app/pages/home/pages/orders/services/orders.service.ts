import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly STORAGE_KEY = 'orders';

  getAllOrders(): Observable<Order[]> {
    return from(this.getOrdersFromStorage());
  }

  getOpenOrders(): Observable<Order[]> {
    return from(
      this.getOrdersFromStorage().then((orders) =>
        orders.filter((order) => !order.closed),
      ),
    );
  }

  getLastOrderIndex(): Observable<number> {
    return from(
      this.getOrdersFromStorage().then((orders) => orders.length + 1),
    );
  }

  getOrderById(id: string): Observable<Order | undefined> {
    return from(
      this.getOrdersFromStorage().then((orders) =>
        orders.find((order) => order.id === id),
      ),
    );
  }

  createOrder(order: Omit<Order, 'id'>): Observable<Order> {
    return from(
      this.getOrdersFromStorage().then((orders) => {
        const newOrder: Order = {
          ...order,
          id: this.generateUniqueId(),
        };
        orders.push(newOrder);
        this.saveOrdersToStorage(orders);
        return newOrder;
      }),
    );
  }

  updateOrder(
    id: string,
    updatedOrder: Partial<Order>,
  ): Observable<Order | undefined> {
    return from(
      this.getOrdersFromStorage().then((orders) => {
        const index = orders.findIndex((order) => order.id === id);
        if (index !== -1) {
          orders[index] = { ...orders[index], ...updatedOrder };
          this.saveOrdersToStorage(orders);
          return orders[index];
        }
        return undefined;
      }),
    );
  }

  deleteOrder(id: string): Observable<boolean> {
    return from(
      this.getOrdersFromStorage().then((orders) => {
        const filteredOrders = orders.filter((order) => order.id !== id);
        if (filteredOrders.length < orders.length) {
          this.saveOrdersToStorage(filteredOrders);
          return true;
        }
        return false;
      }),
    );
  }

  private generateUniqueId(): string {
    return crypto.randomUUID();
  }

  private async getOrdersFromStorage(): Promise<Order[]> {
    const storedOrders = localStorage.getItem(this.STORAGE_KEY);
    return storedOrders ? JSON.parse(storedOrders) : [];
  }

  private saveOrdersToStorage(orders: Order[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
  }

  searchOrders(search: string): Observable<Order[]> {
    return from(
      this.getOrdersFromStorage().then((orders) =>
        orders.filter((order) =>
          !search
            ? !order.closed
            : null ||
              order.id.toLowerCase().includes(search.toLowerCase()) ||
              order.customerName.toLowerCase().includes(search.toLowerCase()),
        ),
      ),
    );
  }
}
