import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTwoLayoutComponent } from './header-two-layout.component';

describe('HeaderTwoLayoutComponent', () => {
    let component: HeaderTwoLayoutComponent;
    let fixture: ComponentFixture<HeaderTwoLayoutComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [HeaderTwoLayoutComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderTwoLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
