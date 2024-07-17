import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ItemsService } from '../../services/items.service';
import { SwalService } from '@services/swal.service';
import { LoadingService } from '@services/loading.service';
import { InputNumberModule } from 'primeng/inputnumber';
@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    InputNumberModule,
  ],
  templateUrl: './create-item.component.html',
})
export class CreateItemComponent {
  private _menuItem = inject(ItemsService);
  private _swal = inject(SwalService);
  private _loading = inject(LoadingService);

  @Output() createItem = new EventEmitter();
  productForm!: FormGroup;
  categories = [
    { label: 'Doce', value: 'dessert' },
    { label: 'Prato Salgado', value: 'dinner' },
    { label: 'Lanche', value: 'snack' },
    { label: 'Bebida', value: 'drink' },
  ];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      stock: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this._loading.show();
      this._menuItem.createItem(this.productForm.value).subscribe((value) => {
        this._loading.hide();
        this.createItem.emit();
        if (value.error) {
          this._swal.error('Ops', value.error.message);
        } else {
          this._swal.success('Sucesso', 'Item criado com sucesso');
          this.productForm.reset();
        }
      });
    }
  }
}
