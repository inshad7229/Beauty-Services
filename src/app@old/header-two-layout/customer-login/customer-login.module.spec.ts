import { CustomerLoginModule } from './customer-login.module';

describe('CustomerLoginModule', () => {
    let customerLoginModule:CustomerLoginModule;

    beforeEach(() => {
        customerLoginModule = new CustomerLoginModule();
    });

    it('should create an instance', () => {
        expect(customerLoginModule).toBeTruthy();
    });
});
