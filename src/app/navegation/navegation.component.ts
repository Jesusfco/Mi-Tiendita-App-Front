import { Component, OnInit } from '@angular/core';
import { Inventario } from './../inventario/inventario';
import { InventarioService } from './../inventario/inventario.service';
import { CajaService } from '../caja/caja.service';
import { Sale } from "./../sale-point/sale";


@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.css'],  
})
export class NavegationComponent implements OnInit {
    
    salePointShow: boolean = true;
    inventarioShow: boolean = false;
    cajaShow: boolean = false;
    lessProductoShow: boolean = false;  
    showNotificaciones: boolean = false;
    registerShow: boolean = false;

    sale: Sale = new Sale();
    sales: Array<Sale> = [];

    caja: number;    
    productos: Array<Inventario> = [];

    notificaciones: number = 0;

    constructor(private _inventarioService: InventarioService,
                private _cajaService: CajaService) { }            

    ngOnInit() {
        this.getInventario();
        this.getCaja();
    }
    
    getInventario(){
        this._inventarioService.getInventario()
            .then(
                inventario => this.productos.push(inventario),
                error => this._inventarioService.errorArranque(error)
            );
    }

    getCaja() {

        this._cajaService.getCaja()
            .then(respCajaData => this.caja = respCajaData);
    }
    
    showSalePoint(){
        this.salePointShow = true;
        this.inventarioShow = false;
        this.cajaShow = false;
        this.lessProductoShow = false;
    }    

    showInventario(){
        this.salePointShow = false;
        this.inventarioShow = true;                
        this.cajaShow = false;
        this.lessProductoShow = false;
    }
    showCaja(){
        this.salePointShow = false;
        this.inventarioShow = false;
        this.cajaShow = true;
        this.lessProductoShow = false;
    }

    showLessProducts() {
        this.salePointShow = false;
        this.inventarioShow = false;
        this.cajaShow = false;
        this.lessProductoShow = true;
    }

    showRegister(){
        this.salePointShow = false;
        this.inventarioShow = false;
        this.cajaShow = false;
        this.lessProductoShow = false; 
        this.registerShow = true;
    }
    
    venta(sale: Sale) {

        this.caja += sale.total;
        for (let articulo of sale.articulos){
            for (let producto of this.productos) {

                if (producto.id == articulo.producto_id){
                    producto.inventario = producto.inventario - articulo.cantidad;
                }

                if (producto.inventario <= producto.reorden) {
                    this.verificarInventarioAfterVenta(producto);
                }
            }
        }
    }

    pushProductos(productos) {
        this.productos = productos;  
        this.verificarInventario();
    }


    pushNewProducto(producto: Inventario) {

        console.log(producto);
        this.productos.push(producto);

        console.log(this.productos)
    }

    verificarInventario() {
        for (let x of this.productos) {
            if (x.inventario <= x.reorden) {                
                this.notificaciones += 1;
            }
        }
    }

    verificarInventarioAfterVenta(producto: Inventario) {

    }
}
