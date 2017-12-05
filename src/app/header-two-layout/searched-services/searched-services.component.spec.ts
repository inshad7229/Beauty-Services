import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedServicesComponent } from './searched-services.component';

describe('SearchedServicesComponent', () => {
    let component: SearchedServicesComponent;
    let fixture: ComponentFixture<SearchedServicesComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [SearchedServicesComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchedServicesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
