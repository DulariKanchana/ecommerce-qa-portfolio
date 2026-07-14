import { BasePage } from '../pages/BasePage';

export class ProductCart extends BasePage{

    constructor(page){
        super(page);
    }

    async addProductsToCart(){
        await this.page.getByText('Add to cart').first().click();
    }

    async viewCartProducts(){
        await this.page.getByRole('link', { name: 'View Cart' }).click();
    }

    async removeCartProducts(){
        await this.page.locator('.cart_quantity_delete').click();
    }

    async proceedToCheckout(){
        await this.page.getByText('Proceed To Checkout').click();
    }

    async clearCart(){
        await this.page.goto('https://automationexercise.com/view_cart');
        await this.page.locator('.cart_quantity_delete').click();
        await this.page.goto('https://automationexercise.com/');
    }

}