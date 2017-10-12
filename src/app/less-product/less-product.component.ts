import { Component, OnInit, Input } from '@angular/core';
import { Inventario } from '../inventario/inventario';
import { MasProducto } from '../inventario/agregar-inventario/masProducto';
import { InventarioService } from '../inventario/inventario.service';


@Component({
  selector: 'app-less-product',
  templateUrl: './less-product.component.html',
  styleUrls: ['./less-product.component.css']
})
export class LessProductComponent implements OnInit {

    @Input() productos: Array<Inventario>;

    lessProduct: Array<Inventario> = [];    

    constructor(private _inventarioService: InventarioService) { }

    ngOnInit() {
        this.filtrarProductos();            
    }

  agregar(informacion: MasProducto) {      
      this._inventarioService.add(informacion)
          .then(
          res => this.sincronizarInventario(res),
              error => alert('Por el momento no dispone de conexion para actualizar el Inventario')
          )
  }

  sincronizarInventario(res: Inventario) {
      for (let product of this.productos) {
          if (product.id == res.id) {
              product.inventario = res.inventario;
          }
      }


      this.filtrarProductos();
  }

  filtrarProductos() {
      this.lessProduct = [];
      for (let product of this.productos) {
          if (product.inventario <= product.reorden) {
              this.lessProduct.push(product);
          }
      }
  }

}
