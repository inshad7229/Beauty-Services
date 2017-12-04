import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaloonDashboardProfileComponent } from './saloon-dashboard-profile.component';

describe('SaloonDashboardProfileComponent', () => {
    let component: SaloonDashboardProfileComponent;
    let fixture: ComponentFixture<SaloonDashboardProfileComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [SaloonDashboardProfileComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SaloonDashboardProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
