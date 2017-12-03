import { SaloonDashboardModule } from './saloon-dashboard.module';

describe('saloonDashboardModule', () => {
    let saloonDashboardModule:SaloonDashboardModule;

    beforeEach(() => {
        saloonDashboardModule = new SaloonDashboardModule();
    });

    it('should create an instance', () => {
        expect(saloonDashboardModule).toBeTruthy();
    });
});
