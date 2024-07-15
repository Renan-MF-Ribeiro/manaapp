import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-password-checker',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    PasswordModule,
    ReactiveFormsModule,
    FloatLabelModule,
  ],
  templateUrl: './password-checker.component.html',
})
export class PasswordCheckerComponent implements OnInit {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;

  strongRegex =
    '/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.{8,}$).*$/';

  checks = [
    { name: 'lowercase', label: 'Uma letra minúscula', status: false },
    { name: 'uppercase', label: 'Uma letra maiúscula', status: false },
    { name: 'number', label: 'Um número', status: false },
    { name: 'special', label: 'Um caractere especial', status: false },
    { name: 'characters', label: '8 caractéres', status: false },
  ];

  ngOnInit(): void {
    this.form.get(this.controlName)?.valueChanges.subscribe((value: string) => {
      this.checks = this.checks.map((check) => {
        switch (check.name) {
          case 'lowercase':
            check.status = /[a-z]/.test(value);
            break;
          case 'uppercase':
            check.status = /[A-Z]/.test(value);
            break;
          case 'number':
            check.status = /[0-9]/.test(value);
            break;
          case 'characters':
            check.status = value.length >= 8;
            break;
          case 'special':
            check.status = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            break;
        }
        return check;
      });
      console.log(
        '>>>>>',
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.{8,}$).*$/.test(
          value,
        ),
      );
    });
  }
}
