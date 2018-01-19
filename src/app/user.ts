export class User {
    public id: number;
    public shop_id: number;
    public name: string;
    public email: string;
    public phone: string;
    public cash: string;
    public active: boolean;
    public user_type_id: number;
    public password: string;
    public created_at: string;
    public updated_at: string;
    
    constructor(){
        this.user_type_id = 1;
        this.phone = '';
    }

    validatePhoneFormat(){
        this.phone =  this.phone.replace(/\D/g, '');
    }

    getLimitUser(){
        return parseInt(localStorage.getItem('user_limit'));
    }

    getOwnId(){
        return parseInt(localStorage.getItem('user_limit'));
    }
    
}
