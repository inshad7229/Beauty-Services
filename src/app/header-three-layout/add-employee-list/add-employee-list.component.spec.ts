import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeListComponent } from './add-employee-list.component';

describe('AddEmployeeListComponent', () => {
    let component: AddEmployeeListComponent;
    let fixture: ComponentFixture<AddEmployeeListComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [AddEmployeeListComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AddEmployeeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
