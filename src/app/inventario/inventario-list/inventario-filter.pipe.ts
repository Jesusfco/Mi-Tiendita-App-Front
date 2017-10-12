import { Pipe, PipeTransform } from '@angular/core';
import { Inventario } from '../inventario';

@Pipe({
  name: 'inventarioFilter'
})


export class InventarioFilterPipe implements PipeTransform {        

  transform(productos: any, search: string): any {
    if(search === undefined) return productos;
            
    return productos.filter(function(producto){

        return producto.producto.toLowerCase().includes(search.toLowerCase()) 
                || producto.codigo.toLowerCase().includes(search.toLowerCase());
        
        
    })
        
        
    
    
  }

}
