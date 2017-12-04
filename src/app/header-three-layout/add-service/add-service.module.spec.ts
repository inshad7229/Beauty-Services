import { AddServiceModule } from './add-service.module';

describe('AddServiceModule', () => {
    let addServiceModule: AddServiceModule;

    beforeEach(() => {
        addServiceModule = new AddServiceModule();
    });

    it('should create an instance', () => {
        expect(addServiceModule).toBeTruthy();
    });
});
