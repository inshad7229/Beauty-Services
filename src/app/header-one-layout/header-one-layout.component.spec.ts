import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOneLayoutComponent } from './header-one-layout.component';

describe('HeaderOneLayoutComponent', () => {
    let component: HeaderOneLayoutComponent;
    let fixture: ComponentFixture<HeaderOneLayoutComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [HeaderOneLayoutComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderOneLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
