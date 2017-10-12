import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sale } from './sale';
import { Articulos } from './articulos';
import { Inventario } from './../inventario/inventario';
import { ArticuloSearch } from './articuloSearch';
import { VentasService } from './ventas.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-sale-point',
  templateUrl: './sale-point.component.html',
  styleUrls: ['./sale-point.component.css']
})
export class SalePointComponent implements OnInit {
    @Input() productos : Array<Inventario>;        
    @Input() sales: Array<Sale>;
    @Input() sale: Sale;

    @Output() ventaEvent = new EventEmitter();
    
    articulo: Articulos;    
    comprobar: boolean = false;
    saleReady: boolean = false;
    ventaConfirm: boolean = false;
    ventaForm: boolean = false;
    ventaProcess: boolean = false;        
    cambioVenta: number;
    pago: number;
    mensaje: string;
               
    
    
    constructor(private ventaService: VentasService) { }

    ngOnInit() {
                                
    }
    
    articuloSearch(articuloSearch: ArticuloSearch){
        
        
        for(let producto of this.productos){
            if (producto.codigo == articuloSearch.articulo) {                                

                this.agregarArticuloVenta(producto, articuloSearch.cantidad);

            } else if (producto.producto == articuloSearch.articulo) {

                this.agregarArticuloVenta(producto, articuloSearch.cantidad);
               
            }
        }
    }
    
    ventaPro(){
        this.ventaProcess = true;
        this.ventaForm = true;
        setTimeout(function() {
            $('#cantidadAPagar').focus();
        }, 200);        
    }
    
    cambio(){
        this.ventaForm = false;
        this.ventaConfirm = true;
        this.cambioVenta = this.pago - this.sale.total;
        setTimeout(function() {
            $('#finishVenta').focus();
        }, 200);
    }
    
    cancelVenta(){
        this.ventaProcess = false;
        this.ventaForm = false;
        this.ventaConfirm = false;
    }

    vender(){
        this.cancelVenta();
        
        this.ventaService.postVenta(this.sale)
            .then(
            data => this.checkSalesVar(),
            error => this.errorLocalVentaSave(),
        );
                                                    
    }

    errorLocalVentaSave() {
        this.sales.push(this.sale);
        console.log('Error en la Venta. Variable SALES...');
        console.log(this.sales);

        this.ventaEvent.emit(this.sale);
        this.dropSaleVar();
    }
           
     

     restablecerSales() {
         alert('Todas las ventas se sincronizaron con el servidor');
         this.sales = [];
     }

     checkSalesVar() {
         this.ventaEvent.emit(this.sale);
         this.dropSaleVar();

         if (this.sales.length > 0) {

             
             this.ventaService.postVentas(this.sales)
                 .then(
                      data => this.restablecerSales(),
                      error => alert('Lo sentimos no se pudieron guardar las ventas en la Nube')
                 );

         }
     }

     dropSaleVar() {
         this.sale = new Sale();
         $('#createVentaInput').focus();
         this.saleReady = false; 
     }

     eliminarArticulo(articulo: Articulos) {
         const i = this.sale.articulos.indexOf(articulo);
         this.sale.total -= articulo.subtotal;
         this.sale.articulos.splice(i, 1);

         const n = this.sale.articulos.length;
         if (n == 0) {
             this.saleReady = false;
         }
     }

     agregarArticuloVenta(producto, cantidad) {
         this.articulo = new Articulos();
         this.articulo.producto = producto.producto;
         this.articulo.producto_id = producto.id;
         this.articulo.precio = producto.precio;
         this.articulo.cantidad = cantidad;
         this.articulo.subtotal = this.articulo.precio * this.articulo.cantidad;

         for (let articuloSale of this.sale.articulos) {

             if (articuloSale.producto_id == this.articulo.producto_id) {
                 articuloSale.cantidad += cantidad;
                 articuloSale.subtotal = articuloSale.cantidad * articuloSale.precio;

                 this.comprobar = true;
             }
         }

         if (this.comprobar == false) {

             this.sale.articulos.push(this.articulo);
         }

         this.comprobar = false;
         this.saleReady = true;
         this.sale.total += this.articulo.precio * cantidad;
     }
}
