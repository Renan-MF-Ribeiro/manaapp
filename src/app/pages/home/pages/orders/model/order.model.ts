import { MenuItem } from '../../items/models/item.model';

export interface Order {
  id: string;
  items: MenuItem[];
  totalValue: number;
  customerName: string;
  date: Date;
  status: 'paid-card' | 'paid-cash' | 'paid-pix' | 'pending' | 'credit';
  closed: boolean;
}

export function calculateTotalValue(items: MenuItem[]): number {
  return items.reduce((total, item) => total + item.price, 0);
}

export function joinItemNames(items: MenuItem[]): string {
  return items.map((item) => item.name).join(', ');
}
