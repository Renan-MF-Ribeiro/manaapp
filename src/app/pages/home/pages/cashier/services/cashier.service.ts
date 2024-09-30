import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Order } from '../../orders/model/order.model';
import { OrdersService } from '../../orders/services/orders.service';

type OrderStatus =
  | 'paid-card'
  | 'paid-cash'
  | 'paid-pix'
  | 'pending'
  | 'credit';
type FilterType = 'all' | 'closed' | 'open';

@Injectable({
  providedIn: 'root',
})
export class CashierService {
  constructor(private ordersService: OrdersService) {}

  private filterOrders(orders: Order[], filterType: FilterType): Order[] {
    switch (filterType) {
      case 'closed':
        return orders.filter((order) => order.closed);
      case 'open':
        return orders.filter((order) => !order.closed);
      default:
        return orders;
    }
  }

  getTotalValueByStatus(
    status: OrderStatus,
    filterType: FilterType = 'all',
  ): Observable<number> {
    return this.ordersService.getAllOrders().pipe(
      map((orders) =>
        this.filterOrders(orders, filterType)
          .filter((order) => order.status === status)
          .reduce((total, order) => total + order.totalValue, 0),
      ),
    );
  }

  getOrderCountByStatus(
    status: OrderStatus,
    filterType: FilterType = 'all',
  ): Observable<number> {
    return this.ordersService
      .getAllOrders()
      .pipe(
        map(
          (orders) =>
            this.filterOrders(orders, filterType).filter(
              (order) => order.status === status,
            ).length,
        ),
      );
  }

  getTotalValueAllOrders(filterType: FilterType = 'all'): Observable<number> {
    return this.ordersService
      .getAllOrders()
      .pipe(
        map((orders) =>
          this.filterOrders(orders, filterType).reduce(
            (total, order) => total + order.totalValue,
            0,
          ),
        ),
      );
  }

  getAverageOrderValue(filterType: FilterType = 'all'): Observable<number> {
    return this.ordersService.getAllOrders().pipe(
      map((orders) => {
        const filteredOrders = this.filterOrders(orders, filterType);
        const totalValue = filteredOrders.reduce(
          (total, order) => total + order.totalValue,
          0,
        );
        return filteredOrders.length > 0
          ? totalValue / filteredOrders.length
          : 0;
      }),
    );
  }

  getMostCommonStatus(
    filterType: FilterType = 'all',
  ): Observable<OrderStatus | null> {
    return this.ordersService.getAllOrders().pipe(
      map((orders) => {
        const filteredOrders = this.filterOrders(orders, filterType);
        const statusCounts = filteredOrders.reduce(
          (counts, order) => {
            counts[order.status] = (counts[order.status] || 0) + 1;
            return counts;
          },
          {} as Record<OrderStatus, number>,
        );

        return (
          (Object.entries(statusCounts).reduce((a, b) =>
            a[1] > b[1] ? a : b,
          )[0] as OrderStatus) || null
        );
      }),
    );
  }

  getTotalValueByPaymentMethod(
    filterType: FilterType = 'all',
  ): Observable<Record<OrderStatus, number>> {
    return this.ordersService.getAllOrders().pipe(
      map((orders) => {
        const filteredOrders = this.filterOrders(orders, filterType);
        return filteredOrders.reduce(
          (totals, order) => {
            totals[order.status] =
              (totals[order.status] || 0) + order.totalValue;
            return totals;
          },
          {} as Record<OrderStatus, number>,
        );
      }),
    );
  }

  closeAllOrders(): Observable<Order[]> {
    return this.ordersService.updateAllOrders((order) => ({
      ...order,
      closed: true,
    }));
  }
}
