import { AddEmployeeListModule } from './add-employee-list.module';

describe('AddEmployeeListModule', () => {
    let addEmployeeListModule: AddEmployeeListModule;

    beforeEach(() => {
        addEmployeeListModule = new AddEmployeeListModule();
    });

    it('should create an instance', () => {
        expect(addEmployeeListModule).toBeTruthy();
    });
});
