import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DockModule } from 'primeng/dock';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, DockModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  actions = [
    { router: 'items', display: 'Itens', icon: 'pi-receipt' },
    { router: 'order', display: 'Pedidos', icon: 'pi-shopping-bag' },
    { router: 'Pagamentos', display: 'Caixa', icon: 'pi-shop' },
    { router: 'Debts ', display: 'Dívidas', icon: 'pi-address-book' },
    { router: 'profile ', display: 'Perfil', icon: 'pi-user' },
  ];
}
