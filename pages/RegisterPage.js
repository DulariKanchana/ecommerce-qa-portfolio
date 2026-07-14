import { BasePage } from '../pages/BasePage';

export class RegistrationFlow extends BasePage{

    constructor(page){
        super(page);
        this.createAccBtn = page.getByRole('button', { name: 'Create Account' });
    }
    
    async fillSignupForm({name, email}){
        await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
        await this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);
        await this.page.getByRole('button', { name: 'Signup' }).click();

    }

    async fillAccountInfo({pwd, fName, lName, address, country, state, city, zip, mobile}){

        await this.page.getByRole('textbox', { name: 'Password *' }).fill(pwd);
        await this.page.getByRole('textbox', { name: 'First name *' }).fill(fName);
        await this.page.getByRole('textbox', { name: 'Last name *' }).fill(lName);
        await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(address);

        await this.page.getByLabel('Country *').selectOption(country);
        await this.page.getByRole('textbox', { name: 'State *' }).fill(state);

        await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(city);
        await this.page.locator('#zipcode').fill(zip);

        await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill(mobile);
        await this.createAccBtn.click();

    }

}