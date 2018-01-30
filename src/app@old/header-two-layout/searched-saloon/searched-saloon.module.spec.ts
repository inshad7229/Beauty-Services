import { SearchedSaloonModule } from './searched-saloon.module';

describe('SearchedSaloonModule', () => {
    let searchedSaloonModule:SearchedSaloonModule;

    beforeEach(() => {
        searchedSaloonModule = new SearchedSaloonModule();
    });

    it('should create an instance', () => {
        expect(searchedSaloonModule).toBeTruthy();
    });
});
