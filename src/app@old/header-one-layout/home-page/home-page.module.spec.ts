import { HomePageModule } from './home-page.module';

describe('omePageModule', () => {
    let blankPageModule:HomePageModule;

    beforeEach(() => {
        blankPageModule = new HomePageModule();
    });

    it('should create an instance', () => {
        expect(blankPageModule).toBeTruthy();
    });
});
