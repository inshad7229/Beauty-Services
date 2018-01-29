import { SearchedServicesModule } from './searched-services.module';

describe('SearchedServicesModule', () => {
    let SearchedServicesModule:SearchedServicesModule;

    beforeEach(() => {
        SearchedServicesModule = new SearchedServicesModule();
    });

    it('should create an instance', () => {
        expect(SearchedServicesModule).toBeTruthy();
    });
});
