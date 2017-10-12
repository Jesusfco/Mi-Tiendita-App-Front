import { Articulos } from './articulos';

export class Sale {
    public total: number;
//    public time:;
    public articulos: Array<Articulos> = [];
    
    constructor(){
        this.total = 0;
    }
}
