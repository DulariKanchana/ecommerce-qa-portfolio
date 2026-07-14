import { BasePage } from '../pages/BasePage';

export class CheckoutFlow extends BasePage{

    constructor(page){
        super(page);
        this.totalAmount = page.getByRole('row', { name: 'Total Amount Rs.' }).getByRole('paragraph');
    }
}