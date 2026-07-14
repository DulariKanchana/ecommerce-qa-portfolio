import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactUs } from '../pages/ContactPage';
import testData from '../test-data/testData.json';

test.describe('Contact Us Form', () => {

    /** @type {HomePage} */
    let home
    /**@type {ContactUs} */
    let contact;

    test.beforeEach('Navigation', async ({ page }) => {
        home = new HomePage(page);
        contact = new ContactUs(page);
        await home.navigation();
    });

    test('Submit contact form successfully @TC-17', async ({ page }) => {

        await home.clickContactUs();
        await expect(contact.getHeading(' Contact us')).toBeVisible();
        await contact.fillContactForm(testData.contactMsg);
        await contact.submitForm();
        await expect(contact.getLocatorText('#contact-page', 'Success! Your details have')).toBeVisible();
    });


    test('Submit contact form with empty fields @TC-18', async ({ page }) => {
        await home.clickContactUs();
        await contact.clickItems('button', 'Submit');
        await expect(contact.getLocatorText('#contact-page', 'Success! Your details have')).not.toBeVisible();
    });

});