import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'receiptType'
})
export class ReceiptTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
