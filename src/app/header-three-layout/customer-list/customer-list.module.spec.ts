import { CustomerListModule } from './customer-list.module';

describe('CustomerListModule', () => {
    let customerListModule: CustomerListModule;

    beforeEach(() => {
        customerListModule = new CustomerListModule();
    });

    it('should create an instance', () => {
        expect(customerListModule).toBeTruthy();
    });
});
