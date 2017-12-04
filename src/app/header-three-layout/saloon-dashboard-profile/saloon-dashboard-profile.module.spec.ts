import { SaloonDashboardProfileModule } from './saloon-dashboard-profile.module';

describe('SaloonDashboardProfileModule', () => {
    let saloonDashboardProfileModule: SaloonDashboardProfileModule;

    beforeEach(() => {
        saloonDashboardProfileModule = new SaloonDashboardProfileModule();
    });

    it('should create an instance', () => {
        expect(saloonDashboardProfileModule).toBeTruthy();
    });
});
