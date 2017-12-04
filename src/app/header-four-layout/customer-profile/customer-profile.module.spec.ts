import { CustomerProfileModule } from './customer-profile.module';

describe('CustomerProfileModule', () => {
    let customerProfileModule:CustomerProfileModule;

    beforeEach(() => {
        customerProfileModule = new CustomerProfileModule();
    });

    it('should create an instance', () => {
        expect(customerProfileModule).toBeTruthy();
    });
});
