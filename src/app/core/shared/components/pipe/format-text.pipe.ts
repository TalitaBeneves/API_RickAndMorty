import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText',
})
export class FormatTextPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value == 'Male') {
      return 'Masculino';
    }

    if (value == 'Female') {
      return 'Feminino';
    }

    return value;
  }
}
