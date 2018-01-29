import { HeaderFourLayoutModule } from './header-four-layout.module';

describe('HeaderFourLayoutModule', () => {
    let headerFourLayout: HeaderFourLayoutModule;

    beforeEach(() => {
        headerFourLayout = new HeaderFourLayoutModule();
    });

    it('should create an instance', () => {
        expect(headerFourLayout).toBeTruthy();
    });
});
