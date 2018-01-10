export class Shop {
    public id: number;
    public name: string;
    public cash: number;
    public active:boolean;
    public street: string;
    public colony: string;
    public number: number;
    public postalCode: number;
    public city: string;
    public state: string;
    public country: string;
    public updated_at: string;
    public created_at: string;
    
    constructor(){
        this.name = '';
        this.street = '';
        this.colony = '';
        this.number = 0;
        this.postalCode = 0;
        this.city = '';
        this.state = '';        
    }
}
