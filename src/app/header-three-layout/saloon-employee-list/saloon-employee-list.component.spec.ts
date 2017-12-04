import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaloonEmployeeListComponent } from './saloon-employee-list.component';

describe('SaloonEmployeeListComponent', () => {
    let component: SaloonEmployeeListComponent;
    let fixture: ComponentFixture<SaloonEmployeeListComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [SaloonEmployeeListComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SaloonEmployeeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
