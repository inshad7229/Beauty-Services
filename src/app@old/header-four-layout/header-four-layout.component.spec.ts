import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFourLayoutComponent } from './header-four-layout.component';

describe('HeaderFourLayoutComponent', () => {
    let component: HeaderFourLayoutComponent;
    let fixture: ComponentFixture<HeaderFourLayoutComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [HeaderFourLayoutComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderFourLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
