import { FormSearchComponent } from './components/form-search/form-search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatTextPipe } from './components/pipe/format-text.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormatTextPipe, FormSearchComponent],
  exports: [FormatTextPipe, FormSearchComponent],
})
export class SharedModule {}
