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
}


