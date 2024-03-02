export default class Product {
    id: number;
    name: string;
    price: number;
    url: string;
    description: string;
    constructor() {
        this.id = 0;
        this.name = 'N/A';
        this.price = 0.0;
        this.url = 'N/A';
        this.description = 'N/A';
    }
}