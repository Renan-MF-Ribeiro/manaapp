import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { TabMenuModule } from 'primeng/tabmenu';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TabMenuModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  activeItem: MenuItem | undefined;

  mobile = window.innerWidth < 700;
  constructor() {
    this.activeItem = this.actions[0];
  }
  actions: MenuItem[] = [
    { label: 'Itens', icon: 'pi pi-receipt', routerLink: 'items' },
    { label: 'Pedidos', icon: 'pi pi-shopping-bag', routerLink: 'orders' },
    { label: 'Caixa', icon: 'pi pi-shop', routerLink: 'cashier' },
    { label: 'Dívidas', icon: 'pi pi-address-book', routerLink: 'debts' },
    { label: 'Perfil', icon: 'pi pi-user', routerLink: 'profile' },
  ];

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}
