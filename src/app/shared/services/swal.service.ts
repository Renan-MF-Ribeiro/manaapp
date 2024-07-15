import { Injectable } from '@angular/core';
import swal, { SweetAlertResult } from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class SwalService {
  success(title: string, underText?: string): Promise<SweetAlertResult> {
    return swal.fire({
      title: title,
      text: underText,
      icon: 'success',
      confirmButtonColor: 'green',
      customClass: 'auto-width',
      heightAuto: false,
    });
  }

  warning(title: string, underText?: string) {
    return swal.fire({
      title: title,
      text: underText,
      icon: 'info',
      confirmButtonColor: 'orange',
      customClass: 'auto-width warning-swal',
      heightAuto: false,
    });
  }

  error(title: string, underText?: string) {
    return swal
      .fire({
        title: title,
        html: underText,
        icon: 'error',
        confirmButtonColor: 'green',
        customClass: 'auto-width',
        heightAuto: false,
      })
      .then((accept) => {
        if (underText === 'Sessão expirada!') {
          location.reload();
        }
      });
  }

  errorHtml(title: string, html?: string) {
    swal.fire({
      title: title,
      html,
      icon: 'error',
      confirmButtonColor: 'green',
      customClass: 'auto-width',
      heightAuto: false,
    });
  }

  confirm(title: string, text?: string) {
    return swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      customClass: 'auto-width',
      heightAuto: false,
    });
  }
}
