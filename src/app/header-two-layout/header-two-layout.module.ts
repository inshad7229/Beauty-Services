import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderTwoLayoutRoutingModule } from './header-two-layout-routing.module';
import {  HeaderTwoLayoutComponent} from './header-two-layout.component';
import { HeaderTwoComponent} from '../shared-layout/header-two/header-two.component'
import {CommonService} from '../providers/common.service'

@NgModule({
    imports: [
        CommonModule,
        HeaderTwoLayoutRoutingModule,
        TranslateModule
    ],
    declarations: [HeaderTwoLayoutComponent,HeaderTwoComponent],
    providers:[CommonService]
})
export class HeaderTwoLayoutModule {}
