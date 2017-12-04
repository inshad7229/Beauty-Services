import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderThreeLayoutComponent } from './header-three-layout.component';

describe('HeaderThreeLayoutComponent', () => {
    let component: HeaderThreeLayoutComponent;
    let fixture: ComponentFixture<HeaderThreeLayoutComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [HeaderThreeLayoutComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderThreeLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
