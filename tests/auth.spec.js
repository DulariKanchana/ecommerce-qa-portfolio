import { test, expect } from '@playwright/test';
import { LoginFlow } from '../pages/LoginPage';
import { RegistrationFlow } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import testData from '../test-data/testData.json';

test.describe('User login and registration tests', () => {

    /** @type {LoginFlow} */
    let log;
    /** @type {RegistrationFlow} */
    let reg;
    /** @type {HomePage} */
    let home

    test.beforeEach('Navigation', async ({ page }) => {
        log = new LoginFlow(page);
        reg = new RegistrationFlow(page);
        home = new HomePage(page);
        await home.navigation();
    });

    
    test('Successful user registration with valid details @TC-01', async ({ page }) => {
        
        await home.clickSignupLogin();

        await reg.fillSignupForm(testData.registration.validAcctSetup);
        await expect(reg.getText('Enter Account Information')).toBeVisible();

        await reg.fillAccountInfo(testData.registration.userDetails);
        await expect(reg.getText('Account Created!')).toBeVisible();
    });

    test('Register with a already existing email @TC-02', async ({ page }) => {

        await home.clickSignupLogin();
        await reg.fillSignupForm(testData.registration.invalidAccSetup);
        await expect(reg.getText('Enter Account Information')).not.toBeVisible();

    });

    test('Successful login with valid credentials @TC-03', async ({ page }) => {

        await home.clickSignupLogin();
        await log.userLogin(testData.login.validLogin);
        await expect(log.getText('Logged in as John')).toBeVisible();

    });

    test('Login with invalid password @TC-04', async ({ page }) => {

        await home.clickSignupLogin();
        await log.userLogin(testData.login.invalidLogin);
        await expect(log.getText('Your email or password is incorrect!')).toBeVisible();
        await expect(log.getText('Logged in as John')).not.toBeVisible();

    });

    test('Login with empty fields @TC-05', async ({ page }) => {

        await home.clickSignupLogin();
        await log.userLogin({email: '',pwd: ''});
        await expect(log.getText('Logged in as John')).not.toBeVisible();

    });


    test('Logout successfully @TC-06', async ({ page }) => {

        await home.clickSignupLogin();
        await log.userLogin(testData.login.validLogin);
        
        await expect(log.getText('Logged in as John')).toBeVisible();
        await expect(home.logoutBtn).toBeVisible();

        await home.logout();
        await expect(home.signupLogin).toBeVisible();

    });
    

});