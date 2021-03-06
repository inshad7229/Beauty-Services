import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderTwoLayoutRoutingModule } from './header-two-layout-routing.module';
import {  HeaderTwoLayoutComponent} from './header-two-layout.component';
import { HeaderTwoComponent} from '../shared-layout/header-two/header-two.component'

@NgModule({
    imports: [
        CommonModule,
        HeaderTwoLayoutRoutingModule
    ],
    declarations: [HeaderTwoLayoutComponent,HeaderTwoComponent]
})
export class HeaderTwoLayoutModule {}
