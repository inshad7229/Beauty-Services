import { PaymentProcessModule } from './payment-process.module';

describe('PaymentProcessModule', () => {
    let paymentProcessModule:PaymentProcessModule;

    beforeEach(() => {
        paymentProcessModule = new PaymentProcessModule();
    });

    it('should create an instance', () => {
        expect(paymentProcessModule).toBeTruthy();
    });
});
