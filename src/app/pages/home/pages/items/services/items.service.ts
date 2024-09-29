import { inject, Injectable } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Observable, from } from 'rxjs';
import { MenuItem } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private readonly STORAGE_KEY = 'items';

  getAllItems(): Observable<MenuItem[]> {
    return from(this.getItemsFromStorage());
  }

  getItemById(id: string): Observable<MenuItem | undefined> {
    return from(
      this.getItemsFromStorage().then((items) =>
        items.find((item) => item.id === id),
      ),
    );
  }

  createItem(item: Omit<MenuItem, 'id'>): Observable<MenuItem> {
    return from(
      this.getItemsFromStorage().then((items) => {
        const newItem: MenuItem = {
          ...item,
          id: this.generateUniqueId(),
        };
        items.push(newItem);
        this.saveItemsToStorage(items);
        return newItem;
      }),
    );
  }

  updateItem(
    id: string,
    updatedItem: Partial<MenuItem>,
  ): Observable<MenuItem | undefined> {
    return from(
      this.getItemsFromStorage().then((items) => {
        const index = items.findIndex((item) => item.id === id);
        if (index !== -1) {
          items[index] = { ...items[index], ...updatedItem };
          this.saveItemsToStorage(items);
          return items[index];
        }
        return undefined;
      }),
    );
  }

  deleteItem(id: string): Observable<boolean> {
    return from(
      this.getItemsFromStorage().then((items) => {
        const filteredItems = items.filter((item) => item.id !== id);
        if (filteredItems.length < items.length) {
          this.saveItemsToStorage(filteredItems);
          return true;
        }
        return false;
      }),
    );
  }

  searchItems(search: string): Observable<MenuItem[]> {
    return from(
      this.getItemsFromStorage().then((items) =>
        items.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ),
    );
  }

  private generateUniqueId(): string {
    return crypto.randomUUID();
  }

  private async getItemsFromStorage(): Promise<MenuItem[]> {
    const storedItems = localStorage.getItem(this.STORAGE_KEY);
    return storedItems ? JSON.parse(storedItems) : [];
  }

  private saveItemsToStorage(items: MenuItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }
}
