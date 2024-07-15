import { AbstractControl } from '@angular/forms';

function passwordMatchValidator(
  group: AbstractControl,
): { [key: string]: boolean } | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  if (password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  return null;
}

function passwordValidator(
  control: AbstractControl,
): { [key: string]: boolean } | null {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,}).*$/;
  if (control.value && !regex.test(control.value)) {
    return { invalidPassword: true };
  }
  return null;
}

export { passwordMatchValidator, passwordValidator };
