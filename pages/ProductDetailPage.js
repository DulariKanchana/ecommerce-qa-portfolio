export class ProductDetails {

    constructor(page){
        this.page = page;
    }

    async viewProduct(){
        await this.page.getByRole('link', { name: ' View Product' }).first().click();
    }

    async setQuantity(quantity){
        await this.page.locator('#quantity').fill(quantity);
    }

}