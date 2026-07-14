import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Products } from '../pages/ProductsPage';
import { ProductDetails } from '../pages/ProductDetailPage';
import testData from '../test-data/testData.json';

test.describe('Product browsing and searching', () => {

    /** @type {HomePage} */
    let home;
    /** @type {Products} */
    let product;
    /** @type {ProductDetails} */
    let proDetail;

    test.beforeEach('Navigation', async ({ page }) => {
        home = new HomePage(page);
        product = new Products(page);
        proDetail = new ProductDetails(page);
        await home.navigation();
    });

    test('View all products page @TC-07', async () => {

        await home.clickProducts();
        await expect(product.allProducts).toBeVisible();
        await expect(product.getText('Blue Top').nth(1)).toBeVisible();
        await expect(product.getHeading('Rs.').nth(1)).toContainText('Rs. 500');
        await expect(home.page).toHaveURL(/products/);

    });

    test('Search for a valid product @TC-08', async ({ page }) => {

        await home.clickProducts();
        await product.searchProducts(testData.validSearch);
        await expect(product.getHeading('Searched Products')).toBeVisible();
        await expect(product.getText('Sleeveless Dress').first()).toBeVisible();
        
    });

    test('Search with no results @TC-09', async ({ page }) => {

        await home.clickProducts();
        await product.searchProducts(testData.invalidSearch);
        await expect(product.searchedItems).toHaveCount(0);

    });

    test('View product detail page @TC-10', async ({ page }) => {

        await home.clickProducts();
        await proDetail.viewProduct();
        
        await expect(product.getLocator('.product-details')).toBeVisible();
        await expect(product.getLocator('#quantity')).toHaveValue('1');
        await expect(product.getHeading('Blue Top')).toBeVisible();
        await expect(product.getText('Rs.')).toContainText('Rs. 500');
        await expect(product.getText('Category: Women > Tops')).toBeVisible();
        
    });


});