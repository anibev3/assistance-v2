import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any): any {
    if (value) {
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(value, 'dd MMM yyyy HH:mm');
      return formattedDate;
    }
    return value;
  }
}
