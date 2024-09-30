import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { CashierService } from './services/cashier.service';
import { ChartModule } from 'primeng/chart';
import { forkJoin } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { SwalService } from '@services/swal.service';

@Component({
  selector: 'app-cashier',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ChartModule, ButtonModule],
  templateUrl: './cashier.component.html',
})
export class CashierComponent implements OnInit {
  private cashierService = inject(CashierService);
  private _swalService = inject(SwalService);

  totalValueCard!: number;
  totalValueCash!: number;
  totalValuePix!: number;
  totalValuePending!: number;
  totalValueCredit!: number;
  totalValueTotal!: number;

  data: any;

  options: any;

  ngOnInit(): void {
    this.getValues();
  }

  setChartOptions() {
    this.data = {
      labels: ['Cartão', 'Dinheiro', 'Pix', 'Pendente', 'Anotado'],
      datasets: [
        {
          label: 'Valor: R$',
          backgroundColor: [
            '#04a24c',
            '#005100',
            '#004100',
            '#fcdc0c',
            '#e21c3d',
          ],
          hoverBackgroundColor: [
            '#04a24c',
            '#005100',
            '#004100',
            '#fcdc0c',
            '#e21c3d',
          ],
          data: [
            this.totalValueCard,
            this.totalValueCash,
            this.totalValuePix,
            this.totalValuePending,
            this.totalValueCredit,
          ],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          position: 'left',
          labels: {
            usePointStyle: true,
            color: '#FFFFFF',
            text: '',
          },
        },
      },
    };
  }
  getValues() {
    forkJoin([
      this.cashierService.getTotalValueByStatus('paid-card', 'open'),
      this.cashierService.getTotalValueByStatus('paid-cash', 'open'),
      this.cashierService.getTotalValueByStatus('paid-pix', 'open'),
      this.cashierService.getTotalValueByStatus('pending', 'open'),
      this.cashierService.getTotalValueByStatus('credit', 'open'),
      this.cashierService.getTotalValueAllOrders('open'),
    ]).subscribe(([card, cash, pix, pending, credit, total]) => {
      this.totalValueCard = card;
      this.totalValueCash = cash;
      this.totalValuePix = pix;
      this.totalValuePending = pending;
      this.totalValueCredit = credit;
      this.totalValueTotal = total;
      this.setChartOptions();
    });
  }

  closeAllOrders() {
    this.cashierService.closeAllOrders().subscribe(() => {
      this.getValues();
      this._swalService.success('Pedidos fechados com sucesso');
    });
  }
}
