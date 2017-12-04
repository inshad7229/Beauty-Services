import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderThreeLayoutRoutingModule } from './header-three-layout-routing.module';
import {  HeaderThreeLayoutComponent} from './header-three-layout.component';
import { HeaderThreeComponent} from '../shared-layout/header-three/header-three.component'
import { DashboardSidebarComponent} from '../shared-layout/dashboard-sidebar/dashboard-sidebar.component'

@NgModule({
    imports: [
        CommonModule,
        HeaderThreeLayoutRoutingModule
    ],
    declarations: [HeaderThreeLayoutComponent,HeaderThreeComponent,DashboardSidebarComponent]
})
export class HeaderThreeLayoutModule {}
