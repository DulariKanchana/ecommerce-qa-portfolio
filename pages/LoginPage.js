import { BasePage } from '../pages/BasePage';

export class LoginFlow extends BasePage{

    constructor(page){
        super(page)
    }

    async userLogin({email, pwd}){
        await this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(pwd);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }
}