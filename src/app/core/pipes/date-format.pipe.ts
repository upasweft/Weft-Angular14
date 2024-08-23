import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'MM/dd/yyyy');
    return value;
  }

}
