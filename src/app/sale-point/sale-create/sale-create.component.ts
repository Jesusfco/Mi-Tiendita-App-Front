
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ArticuloSearch} from './../articuloSearch';

declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.css']
})
export class SaleCreateComponent implements OnInit {
    
    
    articuloSearch: ArticuloSearch;

    @Output() articuloSearchEmitter = new EventEmitter();
    @Input() productos;
    
    sugerencias: Array<string> = [];
    
    constructor() { }

    ngOnInit() {
        this.articuloSearch= new ArticuloSearch()
//        $('#createVentaInput').focus();
    }
    
    create(){                
        this.articuloSearchEmitter.emit(this.articuloSearch);
        this.articuloSearch = new ArticuloSearch();
    }
    
    selectSugerencia(sugest:string){
        this.articuloSearch.articulo = sugest;
        $('#createVentaInput').focus();
        setTimeout(() => {
            $('#createVentaInput').focus();
        }, 100);
    }
    
    deleteInput(){
        this.articuloSearch.articulo = '';
        this.articuloSearch.cantidad = 1;
        $('#createVentaInput').focus();
    }
    
}
