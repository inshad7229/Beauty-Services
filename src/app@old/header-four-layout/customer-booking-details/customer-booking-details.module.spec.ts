import { CustomerBookingDetailsModule } from './customer-booking-details.module';

describe('CustomerBookingDetailsComponentModule', () => {
    let customerBookingDetailsModule:CustomerBookingDetailsModule;

    beforeEach(() => {
        customerBookingDetailsModule = new CustomerBookingDetailsModule();
    });

    it('should create an instance', () => {
        expect(customerBookingDetailsModule).toBeTruthy();
    });
});
