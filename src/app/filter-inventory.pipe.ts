import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterInventory'
})
export class FilterInventoryPipe implements PipeTransform {

  transform(products: any, search: any): any {

    if(search === undefined) return products;

    return products.filter(function(product){
      return product.name.toLowerCase().includes(search.toLowerCase());
    })
    
  }

}
