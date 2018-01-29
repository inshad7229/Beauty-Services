import { BookingPageModule } from './booking-page.module';

describe('BookingPageModule', () => {
    let bookingPageModule: BookingPageModule;

    beforeEach(() => {
        bookingPageModule = new BookingPageModule();
    });

    it('should create an instance', () => {
        expect(bookingPageModule).toBeTruthy();
    });
});
