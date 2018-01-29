import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';

import { HeaderOneLayoutRoutingModule } from './header-one-layout-routing.module';
import {  HeaderOneLayoutComponent} from './header-one-layout.component';
import { HeaderOneComponent} from '../shared-layout/header-one/header-one.component'
import {CommonService} from '../providers/common.service'

@NgModule({
    imports: [
        CommonModule,
        HeaderOneLayoutRoutingModule,
        TranslateModule,
         AgmCoreModule.forRoot({
	      apiKey: "AIzaSyCSqtRTdfc2DOAYpOut4KEwS1xL5or4ekI",
	      libraries: ["places"]
	    }),
    ],
    declarations: [HeaderOneLayoutComponent,HeaderOneComponent],
    providers:[CommonService]
})
export class HeaderOneLayoutModule {}
