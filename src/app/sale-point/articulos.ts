export class Articulos {
    public producto: string;
    public producto_id: number;
    public cantidad: number;
    public precio: number;
    public subtotal: number; 
    public editable: boolean;   
    
    constructor(){
        this.cantidad = 0;
        this.editable = false;
    }
}

