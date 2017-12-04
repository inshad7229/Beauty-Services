import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderOneLayoutRoutingModule } from './header-one-layout-routing.module';
import {  HeaderOneLayoutComponent} from './header-one-layout.component';
import { HeaderOneComponent} from '../shared-layout/header-one/header-one.component'

@NgModule({
    imports: [
        CommonModule,
        HeaderOneLayoutRoutingModule
    ],
    declarations: [HeaderOneLayoutComponent,HeaderOneComponent]
})
export class HeaderOneLayoutModule {}
