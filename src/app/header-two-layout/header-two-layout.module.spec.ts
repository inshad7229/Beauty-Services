import { HeaderTwoLayoutModule } from './header-two-layout.module';

describe('HeaderTwoLayoutModule', () => {
    let headerTwoLayout: HeaderTwoLayoutModule;

    beforeEach(() => {
        headerTwoLayout = new HeaderTwoLayoutModule();
    });

    it('should create an instance', () => {
        expect(headerTwoLayout).toBeTruthy();
    });
});
