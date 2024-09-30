import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from '@services/loading.service';
import { SwalService } from '@services/swal.service';
import { calculateTotalValue, Order } from '../../model/order.model';
import { OrdersService } from '../../services/orders.service';
import { ItemsService } from '@pages/home/pages/items/services/items.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { map } from 'rxjs';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    InputNumberModule,
    MultiSelectModule,
  ],
  templateUrl: './create-order.component.html',
})
export class CreateOrderComponent implements OnChanges {
  private _menuOrder = inject(OrdersService);
  private _items = inject(ItemsService);
  private _swal = inject(SwalService);
  private _loading = inject(LoadingService);

  @Output() createOrder = new EventEmitter();
  @Input() order!: Order;
  @Input() lastOrderIndex!: number;
  productForm!: FormGroup;
  status = [
    { label: 'Pendente', value: 'pending' },
    { label: 'Pago - Cartão', value: 'paid-card' },
    { label: 'Pago - Dinheiro', value: 'paid-cash' },
    { label: 'Pago - Pix', value: 'paid-pix' },
    { label: 'Crédito', value: 'credit' },
  ];

  items$ = this._items.getAllItems();

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      customerName: [this.lastOrderIndex, [Validators.required]],
      items: [[]],
      status: ['', [Validators.required]],
      closed: [false],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.lastOrderIndex || this.lastOrderIndex === 0) {
      this.productForm.patchValue({
        customerName:
          'Pedido ' + this.lastOrderIndex.toString().padStart(2, '0'),
      });
    }
    if (this.order) {
      this.productForm.patchValue(this.order);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this._loading.show();
      const order = this.productForm.getRawValue();
      order.date = new Date();
      order.totalValue = calculateTotalValue(order.items);
      if (this.order) {
        this.updateOrder(order);
      } else {
        this.create(order);
      }
    }
  }

  updateOrder(order: Order) {
    this._menuOrder.updateOrder(this.order.id, order).subscribe((value) => {
      this._loading.hide();
      if (!value) {
        this.handleError('Erro ao atualizar pedido');
      } else {
        this.handleSuccess('Pedido atualizado com sucesso');
      }
    });
  }

  create(order: Order) {
    this._menuOrder.createOrder(order).subscribe((value) => {
      this._loading.hide();
      if (!value) {
        this.handleError('Erro ao criar pedido');
      } else {
        this.handleSuccess('Pedido criado com sucesso');
      }
    });
  }

  private handleError(message: string) {
    this._swal.error('Ops', message);
    this._loading.hide();
  }

  private handleSuccess(message: string) {
    this._swal.success('Sucesso', message);
    this.productForm.reset();
    this.createOrder.emit();
  }
}
