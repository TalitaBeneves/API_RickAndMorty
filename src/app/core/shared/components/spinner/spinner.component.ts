import { SpinnerService } from './../../../services/spinner/spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="overlay" *ngIf="isLoading$ | async">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  `,
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  isLoading$ = this.spinnerService.isLoading$;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit(): void {}
}
src/app/core/services/spinner/ src/app/core/shared/components/spinner/ src/app/core/shared/interceptors/ src/app/app.component.html src/app/app.module.ts src/app/core/services/characterService/character.service.ts
