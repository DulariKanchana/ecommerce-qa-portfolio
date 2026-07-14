export class BasePage{
    constructor(page){
        this.page = page;
    }

    async clickItems(role, value){
        await this.getRoleValue(role, value).click();
    }
    
    getHeading(heading){
        return this.page.getByRole('heading', { name: heading });
    }

    getText(text){
        return this.page.getByText(text);
    }

    getRoleValue(role, value){
        return this.page.getByRole(role, { name: value });
    }

    getLocator(locator){
        return this.page.locator(locator);
    }

    getLocatorText(locator , text){
        return this.page.locator(locator).getByText(text);
    }
}