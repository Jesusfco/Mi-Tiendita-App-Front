import { Inventario } from '../inventario';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InventarioService } from './../inventario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-new-inventario',
  templateUrl: './new-inventario.component.html',
  styleUrls: ['./new-inventario.component.css'],
  providers: [InventarioService]
})
export class NewInventarioComponent implements OnInit {

    @Output() createNewProductEvent = new EventEmitter();        

    ventanaP: boolean;    
    newProduct = new Inventario();
    rForm: FormGroup;

    
    private _inventarioService: InventarioService

    constructor(private fb: FormBuilder) {
        this.rForm = fb.group({
            'producto': [null, Validators.required],
            'precio': [null, Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(60)
            ])],
        });
    }

  ngOnInit() {
  }
    create(){
        this.createNewProductEvent.emit(this.newProduct)
        this.newProduct = new Inventario();
//        this._inventarioService.create(this.newProduct)
//            .subscribe(
//                data => console.log(data),
//                error => alert(error),
//                () => alert('Peticion Realizada')
//            );
//            
        
    }
    
    showNewProduct(){
      this.ventanaP = true;
//        $('#modal1').modal('open');        
//        console.log("showModal");
    }

    hideNewProduct() {
        this.ventanaP = false;
    }

}
