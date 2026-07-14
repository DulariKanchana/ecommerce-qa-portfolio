import { test, expect } from '@playwright/test';
import { LoginFlow } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductCart } from '../pages/CartPage';
import { CheckoutFlow } from '../pages/CheckoutPage';
import { PaymentProcess } from '../pages/PaymentPage';
import testData from '../test-data/testData.json';

test.describe('checkout and payment flow', () => {

    /** @type {LoginFlow} */
    let log;
    /** @type {HomePage} */
    let home
    /** @type {ProductCart} */
    let cart
    /** @type {CheckoutFlow} */
    let checkout
    /**@type {PaymentProcess} */
    let payment;

    test.beforeEach('Navigation', async ({ page }) => {
        log = new LoginFlow(page);
        home = new HomePage(page);
        cart = new ProductCart(page);
        payment = new PaymentProcess(page);
        checkout = new CheckoutFlow(page);
        await home.navigation();
    });

    test('Complete checkout with valid payment @TC-15', async ({ page }) => {

        await home.clickSignupLogin();
        await log.userLogin(testData.login.validLogin);
        await cart.clearCart();

        await cart.addProductsToCart();
        await cart.viewCartProducts();
        await cart.proceedToCheckout();

        await expect(checkout.getRoleValue('link', 'Blue Top')).toBeVisible();
        await expect(checkout.totalAmount).toContainText('Rs. 500');

        await checkout.clickItems('link', 'Place Order');
        await expect(checkout.getHeading('Payment')).toBeVisible();

        await payment.fillPaymentDetails(testData.paymentDetails.validDetails)

        await checkout.clickItems('button', 'Pay and Confirm Order');
        await expect(checkout.getHeading('Order Placed!')).toBeVisible();

    });

    test('Checkout with invalid card details @TC-16', async ({ page }) => {

        test.fail();

        await home.clickSignupLogin();
        await log.userLogin(testData.login.validLogin);

        await cart.addProductsToCart();
        await cart.viewCartProducts();
        await cart.proceedToCheckout();

        await expect(checkout.getRoleValue('link', 'Blue Top')).toBeVisible();
        await expect(checkout.totalAmount).toContainText('Rs. 500');

        await checkout.clickItems('link', 'Place Order');
        await expect(checkout.getHeading('Payment')).toBeVisible();

        await payment.fillPaymentDetails(testData.paymentDetails.invalidDetails)
        
        await checkout.clickItems('button', 'Pay and Confirm Order');
        await expect(checkout.getHeading('Order Placed!')).not.toBeVisible();
    });

});