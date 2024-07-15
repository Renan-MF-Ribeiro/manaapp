import { Component, inject } from '@angular/core';
import { LoadingService } from '@services/loading.service';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [],
  template: `
    @if (_loading.getStatus()) {
      <div class="loading-spinner animate-pulse">
        <img src="../../../../assets/logo.png" alt="Loading..." />
      </div>
    }
  `,
  styles: `
    .loading-spinner {
      z-index: 99999999;
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.8;
      position: absolute;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
})
export class LoadingComponent {
  _loading = inject(LoadingService);
}
