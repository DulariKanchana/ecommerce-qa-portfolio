import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductDetails } from '../pages/ProductDetailPage';
import { ProductCart } from '../pages/CartPage';
import { LoginFlow } from '../pages/LoginPage';
import testData from '../test-data/testData.json';

test.describe('Cart flow', () => {

    /** @type {HomePage} */
    let home;
    /** @type {ProductDetails} */
    let proDetail;
    /**@type {ProductCart} */
    let cart;
    /**@type {LoginFlow} */
    let log

    test.beforeEach('Navigation', async ({ page }) => {
        home = new HomePage(page);
        proDetail = new ProductDetails(page);
        cart = new ProductCart(page);
        log = new LoginFlow(page);
        await home.navigation();
    });

    test('Add product to cart @TC-11', async ({ page }) => {
        
        await home.clickProducts();
        await proDetail.viewProduct();

        await expect(cart.getLocator('.product-details')).toBeVisible();
        await proDetail.setQuantity(testData.quantity);

        await cart.addProductsToCart();
        await cart.viewCartProducts();

        await expect(cart.getLocator('#cart_info')).toBeVisible();
        await expect(cart.getRoleValue('button', '2')).toBeVisible();

    });

    test('View cart contents @TC-12', async ({ page }) => {

        await cart.addProductsToCart();
        await expect(cart.getText('Your product has been added')).toBeVisible();

        await cart.clickItems('button', 'Continue Shopping');
        await home.clickCart();

        await expect(cart.getLocator('#cart_info')).toBeVisible();
        await expect(cart.getRoleValue('link', 'Blue Top')).toBeVisible();
        await expect(cart.getText('Rs. 500').first()).toBeVisible();
        await expect(cart.getRoleValue('button', '1')).toBeVisible();
        await expect(cart.getText('Rs. 500').nth(1)).toBeVisible();
    
    });

    test('Remove product from cart @TC-13', async ({ page }) => {

        await cart.addProductsToCart();
        await cart.viewCartProducts();

        await expect(cart.getLocator('#cart_info')).toBeVisible();
        await expect(cart.getRoleValue('link', 'Blue Top')).toBeVisible();
        
        await cart.removeCartProducts();
        await expect(cart.getText('Cart is empty! Click here to')).toBeVisible();
    });

    test('Proceed to checkout from cart @TC-14', async ({ page }) => {

        await home.clickSignupLogin();
        await log.userLogin(testData.login.validLogin);

        await cart.addProductsToCart();
        await cart.clickItems('button', 'Continue Shopping');

        await home.clickCart();
        await expect(cart.getRoleValue('link', 'Blue Top')).toBeVisible();

        await cart.proceedToCheckout();
        await expect(cart.getHeading('Address Details')).toBeVisible();;
        await expect(cart.getHeading('Review Your Order')).toBeVisible();;


    });

});