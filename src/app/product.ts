export class Product {

    public id: number;
    public name: string;
    public code: string;
    public price: number;
    public cost_price: number;
    public reorder: number;
    public stock: number;
    public department: string;
    public created_at: string;
    public edit: boolean;
    public delete: boolean;
    public add: boolean;


    constructor(){
        this.edit = false;
        this.delete = false;
        this.add = false;
        this.reorder = 0;
        this.stock = 0;
        this.name = '';
        this.code = '';
        this.department = '';
    }

    upperCaseName() {

        this.name = this.name.replace(/\s+$/, '');
        this.name = this.name.toUpperCase();

    }

    upperCaseDepartment() {

        this.department = this.department.replace(/\s+$/, '');
        this.department = this.department.toUpperCase();
    
    }

    formatCode(){
        this.code = this.code.replace(/\s+$/, '');
    }

    afterSale(sale){

        let description =  sale.description;
        let inventory = JSON.parse(localStorage.getItem('inventory'));

        for(let x = 0; x < Object.keys(description).length; x++){
            for(let y = 0; y < Object.keys(inventory).length; y++){
                if(description[x].product_id == inventory[y].id){
                    inventory[y].stock -= description[x].quantity;
                    inventory[y].updated_at = sale.created_at;

                    
                    break;
                }
            }
        }

        localStorage.setItem('inventory', JSON.stringify(inventory));
        
    }

    deleteProductStorage(id){
        let inventory = JSON.parse(localStorage.getItem('inventory'));

        for(let x = 0; x < Object.keys(inventory).length; x++){
            if(inventory[x].id == id){
                inventory.splice(x, 1);
                break;
            }
        }

        localStorage.setItem('inventory', JSON.stringify(inventory));
    }

     sync(updated){

        if(updated.length == 0) return;

        

        let inventory = JSON.parse(localStorage.getItem('inventory'));

        for(let i = 0; i < Object.keys(inventory).length; i++){

            for(let y = 0; y < Object.keys(updated).length; y++){

                if(inventory[i].id == parseInt(updated[y].id)) {

                    inventory[i] = updated[y];
                    updated[y].used = true;
                    console.log('producto actualizado');
                }

            }

        } //FINAL DE FOR

        for(let sync of updated){
            if(sync.used == undefined){
                inventory.push(sync);

                console.log("PRODUCTO AGREGADO");
            }
        }

        localStorage.setItem('inventory', JSON.stringify(inventory));

    }

    

}
