import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentProcessRoutingModule } from './payment-process-routing.module';
import { PaymentProcessComponent } from './payment-process.component';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import {SaloonService} from '../providers/saloon.service'
import {CommonService} from '../providers/common.service'

@NgModule({
    imports: [CommonModule, PaymentProcessRoutingModule,
    MatTabsModule,
    HttpClientModule,
    CalendarModule.forRoot(), 
    NgbModalModule.forRoot(),
    ToastModule.forRoot(),
    AgmCoreModule.forRoot({
	      apiKey: "AIzaSyCSqtRTdfc2DOAYpOut4KEwS1xL5or4ekI",
	      libraries: ["places"]
	    }),
    ],
    declarations: [PaymentProcessComponent],
    providers:[SaloonService,CommonService]
})
export class PaymentProcessModule   {


}
