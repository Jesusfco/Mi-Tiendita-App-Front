import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sugerencias'
})
export class SugerenciasPipe implements PipeTransform {

  transform(productos: any, search: string): any {
    if(search == '') return productos =[];
    
    return productos.filter(function(producto){
        return producto.producto.toUpperCase().includes(search.toUpperCase());                
    });
    
  }

}
