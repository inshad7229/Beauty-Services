import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaloonDashboardComponent } from './saloon-dashboard.component';

describe('SaloonDashboardComponent', () => {
    let component: SaloonDashboardComponent;
    let fixture: ComponentFixture<SaloonDashboardComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [SaloonDashboardComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SaloonDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
