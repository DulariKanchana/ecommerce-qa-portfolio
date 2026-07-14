import { BasePage } from '../pages/BasePage';

export class ContactUs extends BasePage {

    constructor(page) {
        super(page);
    }

    async fillContactForm({ name, email, subject, msg }) {
        await this.page.getByPlaceholder('Name').fill(name);
        await this.page.getByPlaceholder('Email', { exact: true }).fill(email);
        await this.page.getByPlaceholder('Subject').fill(subject);
        await this.page.getByPlaceholder('Your Message Here').fill(msg);
    }

    async submitForm() {

        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });

        // TODO: Known timing issue with Chrome dialog 
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }
}