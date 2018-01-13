import { SaleDescription } from './sale-description';

export class Sale {
    public id: number;
    public total: number;
    public user_id: number;
    public description: Array<any>= [];
    public created_at: string;

    constructor(){
        this.total = 0;
    }

    pushProduct(product){
        if(this.checkUniqueDescription(product))
            this.description.push(product);
    }

    checkUniqueDescription(product){
        for (let x = 0; x < Object.keys(this.description).length; x++){
            if(product.id_product ==  this.description[x].id_product){
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
    }

    deleteProduct(product){

    }
}


