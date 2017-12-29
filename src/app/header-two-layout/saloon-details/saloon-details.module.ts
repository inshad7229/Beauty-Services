import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaloonDetailsRoutingModule } from './saloon-details-routing.module';
import { SaloonDetailsComponent } from './saloon-details.component';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { AgmCoreModule } from '@agm/core';

import {SaloonService} from '../../providers/saloon.service'
import {CommonService} from '../../providers/common.service'

@NgModule({
    imports: [CommonModule, SaloonDetailsRoutingModule,
    MatTabsModule,
    HttpClientModule,
    ToastModule.forRoot(),
    AgmCoreModule.forRoot({
	      apiKey: "AIzaSyCSqtRTdfc2DOAYpOut4KEwS1xL5or4ekI",
	      libraries: ["places"]
	    }),
    ],
    declarations: [SaloonDetailsComponent],
    providers:[SaloonService,CommonService]
})
export class SaloonDetailsModule implements OnInit  {

	 ngOnInit() {
  }
}
