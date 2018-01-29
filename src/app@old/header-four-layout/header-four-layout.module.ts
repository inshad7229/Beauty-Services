import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderFourLayoutRoutingModule } from './header-four-layout-routing.module';
import {  HeaderFourLayoutComponent} from './header-four-layout.component';
import { HeaderFourComponent} from '../shared-layout/header-four/header-four.component'
import { CustomerSidebarComponent} from '../shared-layout/customer-sidebar/customer-sidebar.component'

@NgModule({
    imports: [
        CommonModule,
        HeaderFourLayoutRoutingModule
    ],
    declarations: [HeaderFourLayoutComponent,HeaderFourComponent,CustomerSidebarComponent]
})
export class HeaderFourLayoutModule {}
