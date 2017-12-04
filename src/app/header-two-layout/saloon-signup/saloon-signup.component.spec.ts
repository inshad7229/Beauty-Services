import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaloonSignupComponent } from './saloon-signup.component';

describe('SaloonSignupComponent', () => {
    let component: SaloonSignupComponent;
    let fixture: ComponentFixture<SaloonSignupComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [SaloonSignupComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SaloonSignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
