import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedSaloonComponent } from './searched-saloon.component';

describe('SearchedSaloonComponent', () => {
    let component: SearchedSaloonComponent;
    let fixture: ComponentFixture<SearchedSaloonComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [SearchedSaloonComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchedSaloonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
