export class Storage {
    token: string;
    tokenUrl: string;
    userName: string;
    userEmail: string;
    userId: number;
    userType: number;
    userPhone: string;

    constructor(){

        this.token = localStorage.getItem('token');
        this.tokenUrl = '?token=' + this.token;
        this.userName = localStorage.getItem('userName');
        this.userEmail = localStorage.getItem('userEmail');
        this.userId = parseInt(localStorage.getItem('userId'));
        this.userType = parseInt(localStorage.getItem('userType'));
        this.userPhone = localStorage.getItem('userPhone');
    }

    storageToken(token){
        localStorage.setItem('token', token);
    }

    getTokenUrl(){
        return '?token=' + localStorage.getItem('token');
    }

    storageUserData(data){
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userPhone', data.phone);
        localStorage.setItem('userPhone', data.phone);
        localStorage.setItem('userType', data.user_type_id);
        localStorage.setItem('userCash', data.cash);
    }
    storeCash(data){
        localStorage.setItem('userCash', data.cash);
    }

    getName(){
        return localStorage.getItem('userName');
    }
    getEmail(){
        return localStorage.getItem('userEmail');
    }

    getUserType(){
        return localStorage.getItem('userType');
    }

    storageInventory(data){
        localStorage.setItem('inventory', JSON.stringify(data));
    }

    getInventory(){
        return JSON.parse(localStorage.getItem('inventory'));
    }

    getCash(){
        return localStorage.getItem('userCash');
    }

    pushProduct(data){
        let products = this.getInventory();
        products.push(data);
        this.storageInventory(products);
    }

    updateProduct(product){
        let products = this.getInventory();
        for (let x = 0; x < Object.keys(products).length; x++){

            if (product.id == products[x].id) { 
                products[x] = product;
                console.log(products);
                this.storageInventory(products);
                break;
            }
        }
    }

    showProductById(id){
        let products = this.getInventory();
        for (let x of products){
            if (id == x.id) { return x; }
        }
    }
}
