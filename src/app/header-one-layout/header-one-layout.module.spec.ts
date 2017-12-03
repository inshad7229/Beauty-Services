import { HeaderOneLayoutModule } from './header-one-layout.module';

describe('HeaderOneLayoutModule', () => {
    let headerOneLayout: HeaderOneLayoutModule;

    beforeEach(() => {
        headerOneLayout = new HeaderOneLayoutModule();
    });

    it('should create an instance', () => {
        expect(headerOneLayout).toBeTruthy();
    });
});
