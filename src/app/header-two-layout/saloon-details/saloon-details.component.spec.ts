import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaloonDetailsComponent } from './saloon-details.component';

describe('SaloonDetailsComponent', () => {
    let component: SaloonDetailsComponent;
    let fixture: ComponentFixture<SaloonDetailsComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [SaloonDetailsComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SaloonDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
