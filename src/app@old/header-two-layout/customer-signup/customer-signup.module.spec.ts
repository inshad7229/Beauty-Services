import { CustomerSignupModule } from './customer-signup.module';

describe('customerSignupModule', () => {
    let customerSignupModule:CustomerSignupModule;

    beforeEach(() => {
        customerSignupModule = new CustomerSignupModule();
    });

    it('should create an instance', () => {
        expect(customerSignupModule).toBeTruthy();
    });
});
