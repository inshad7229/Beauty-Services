import { SaloonDetailsModule } from './saloon-details.module';

describe('SaloonDetailsModule', () => {
    let saloonDetailsModule:SaloonDetailsModule;

    beforeEach(() => {
        saloonDetailsModule = new SaloonDetailsModule();
    });

    it('should create an instance', () => {
        expect(saloonDetailsModule).toBeTruthy();
    });
});
