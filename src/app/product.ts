export class Product {

    public id: number;
    public name: string;
    public code: string;
    public price: number;
    public reorder: number;
    public stock: number;
    public created_at: string;
    public edit:boolean;
    public delete:boolean;
    public add:boolean;

    constructor(){
        this.edit = false;
        this.delete = false;
        this.add = false;
    }
}
