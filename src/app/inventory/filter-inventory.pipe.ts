import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterInventory'
})
export class FilterInventoryPipe implements PipeTransform {

  transform(products: any, search: any): any {

    if(search === undefined) return products;

    

    return products.filter(function(product){
      if(product.code != undefined)
      return (product.name.includes(search.toUpperCase()) || product.code.includes(search));
      return (product.name.includes(search.toUpperCase()));
    })
    
  }

}
