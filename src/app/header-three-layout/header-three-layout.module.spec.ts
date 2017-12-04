import { HeaderThreeLayoutModule } from './header-three-layout.module';

describe('HeaderThreeLayoutModule', () => {
    let headerThreeLayout: HeaderThreeLayoutModule;

    beforeEach(() => {
        headerThreeLayout = new HeaderThreeLayoutModule();
    });

    it('should create an instance', () => {
        expect(headerThreeLayout).toBeTruthy();
    });
});
