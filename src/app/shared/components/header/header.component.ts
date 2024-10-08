import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() label!: string;
  @Input() labelButton!: string;
  @Input() isSearchable = true;
  @Input() hasButton!: boolean;
  @Output() buttonClick = new EventEmitter();
  @Output() searchEvent = new EventEmitter<string>();

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  ngOnInit(): void {
    this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.searchEvent.emit(value.search ?? '');
    });
  }
}
