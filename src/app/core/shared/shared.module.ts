import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatTextPipe } from './components/pipe/format-text.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FormatTextPipe],
  exports: [FormatTextPipe],
})
export class SharedModule {}
