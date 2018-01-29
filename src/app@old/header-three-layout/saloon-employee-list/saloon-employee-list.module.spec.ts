import { SaloonEmployeeListModule } from './saloon-employee-list.module';

describe('SaloonEmployeeListModule', () => {
    let saloonEmployeeListModule: SaloonEmployeeListModule;

    beforeEach(() => {
        saloonEmployeeListModule = new SaloonEmployeeListModule();
    });

    it('should create an instance', () => {
        expect(saloonEmployeeListModule).toBeTruthy();
    });
});
