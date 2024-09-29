import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
import { MenuItem } from '../../models/item.model';
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
export class CreateItemComponent implements OnChanges {
  private _menuItem = inject(ItemsService);
  private _swal = inject(SwalService);
  private _loading = inject(LoadingService);

  @Output() createItem = new EventEmitter();
  @Input() item!: MenuItem;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.item) {
      this.productForm.patchValue(this.item);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this._loading.show();
      if (this.item) {
        this.updateItem();
      } else {
        this.create();
      }
    }
  }

  updateItem() {
    this._menuItem
      .updateItem(this.item.id, this.productForm.value)
      .subscribe((value) => {
        this._loading.hide();
        if (!value) {
          this.handleError('Erro ao atualizar item');
        } else {
          this.handleSuccess('Item atualizado com sucesso');
        }
      });
  }

  create() {
    this._menuItem.createItem(this.productForm.value).subscribe((value) => {
      this._loading.hide();
      if (!value) {
        this.handleError('Erro ao criar item');
      } else {
        this.handleSuccess('Item criado com sucesso');
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
    this.createItem.emit();
  }
}
