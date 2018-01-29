import { ServiceListModule } from './service-list.module';

describe('ServiceListModule', () => {
    let serviceListModule: ServiceListModule;

    beforeEach(() => {
        serviceListModule = new ServiceListModule();
    });

    it('should create an instance', () => {
        expect(serviceListModule).toBeTruthy();
    });
});
