export class PaymentProcess {

    constructor(page){
        this.page = page;
    }

    async fillPaymentDetails({name , cardNb, cvc, expiryMonth, expiryYear}){
        await this.page.locator('input[name="name_on_card"]').fill(name);
        await this.page.locator('input[name="card_number"]').fill(cardNb);
        await this.page.getByRole('textbox', { name: 'ex.' }).fill(cvc);
        await this.page.getByRole('textbox', { name: 'MM' }).fill(expiryMonth);
        await this.page.getByRole('textbox', { name: 'YYYY' }).fill(expiryYear);
    }
}