export class HomePage {

    constructor(page){
        this.page = page;
        this.signupLogin = page.getByRole('link', { name: ' Signup / Login' });
        this.logoutBtn = page.getByRole('link', { name: ' Logout'});

    }

    async navigation(){
        await this.page.goto('https://automationexercise.com');
    }

    async clickSignupLogin(){
        await this.signupLogin.click();
    }

    async logout(){
        await this.logoutBtn.click();
    }

    async clickCart(){
        await this.page.getByRole('link', { name: ' Cart' }).click();
    }

    async clickProducts(){
        await this.page.getByRole('link', { name: ' Products' }).click();
    }

    async clickContactUs(){
        await this.page.getByRole('link', { name: ' Contact us' }).click();
    }
}