import { BasePage } from '../pages/BasePage';

export class Products extends BasePage{

    constructor(page){
        super(page);
        this.allProducts = page.locator('.text-center').filter({ hasText: 'All Products' });
        this.searchedItems = page.locator('.features-items .col-sm-4');
    }

    async searchProducts(product){
        await this.page.getByRole('textbox', { name: 'Search Product' }).fill(product);
        await this.page.locator('#submit_search').click();
    }


};