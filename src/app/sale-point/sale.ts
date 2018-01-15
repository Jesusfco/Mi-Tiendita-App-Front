import { SaleDescription } from './sale-description';

export class Sale {
    public id: number;
    public total: number;
    public user_id: number;
    public description: Array<any>= [];
    public clientMoney: number;
    public created_at: string;

    constructor(){
        this.total = 0;
    }

    storageLocalSale(){
        localStorage.setItem('saleDescription', JSON.stringify(this.description));
    }

    getLocalSale(){
        return JSON.parse(localStorage.getItem('saleDescription'));
    }

    pushProduct(product){
        product.subtotal = product.price * product.quantity;
        if(this.checkUniqueDescription(product))
            this.description.push(product);
        
        this.getTotal();
    }

    checkUniqueDescription(product){
        for (let x = 0; x < Object.keys(this.description).length; x++){
            if(product.product_id ==  this.description[x].product_id){
                this.description[x].quantity += product.quantity;
                this.description[x].subtotal = this.description[x].quantity * this.description[x].price;
                return false;
                // break;
            }
        }
        return true;
    }

    getTotal(){
        this.total = 0;
        for(let x of this.description){
            this.total += x.subtotal;
        }
        this.storageLocalSale();
    }

    deleteProduct(id){
        console.log(id);
        for(let x = 0; x < Object.keys(this.description).length; x++){
            if(id == this.description[x].product_id){
                this.description.splice(x, 1);
            }
        }
        this.getTotal();
    }

    storeSaleErrorConnection(sale){
        let sales = this.getSalesErrorConnection();
        sales.unshift(sale);
        localStorage.setItem('sales', JSON.stringify(sales));
    }

    getSalesErrorConnection(){
        if(JSON.parse(localStorage.getItem('sales')) != undefined){
            return JSON.parse(localStorage.getItem('sales'));
        }
        return [];
    }

    setCreatedAt(){
        
    let x = new Date();
    this.created_at = x.getFullYear() + "-";

    if(x.getMonth() < 9){
        this.created_at += "0" + (x.getMonth() + 1) + "-";
    } else {
        this.created_at += (x.getMonth() + 1) + "-";
    }

    if( x.getUTCDate() < 9){
        this.created_at += "0" + (x.getUTCDate() + 1) + " ";        
    }else {
        this.created_at += (x.getUTCDate() + 1) + " ";
    }

    if(x.getHours() < 10){
        this.created_at += "0" + x.getHours() + ":";
    }
    else {
        this.created_at += x.getHours() + ":";
    }

    if( x.getMinutes() < 10) {
        this.created_at += "0" + x.getMinutes() + ":";
    } else {
        this.created_at += x.getMinutes() + ":";
    }

    if( x.getSeconds() < 10) {
        this.created_at += "0" + x.getSeconds();
    } else {
        this.created_at += x.getSeconds();
    }
    
    console.log(this.created_at);
    }
}


