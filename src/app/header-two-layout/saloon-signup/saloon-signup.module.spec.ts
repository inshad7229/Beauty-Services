import { SaloonSignupModule } from './saloon-signup.module';

describe('saloonSignupModule', () => {
    let saloonSignupModule:SaloonSignupModule;

    beforeEach(() => {
        saloonSignupModule = new SaloonSignupModule();
    });

    it('should create an instance', () => {
        expect(saloonSignupModule).toBeTruthy();
    });
});
