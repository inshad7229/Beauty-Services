import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'
import { HttpClientModule }    from '@angular/common/http';
import { SaloonDashboardRoutingModule } from './saloon-dashboard-routing.module';
import { SaloonDashboardComponent } from './saloon-dashboard.component';
import { SaloonService} from '../../providers/saloon.service' 
import {NgxPaginationModule} from 'ngx-pagination'; 


@NgModule({
    imports: [NgxPaginationModule,CommonModule,FormsModule, SaloonDashboardRoutingModule,CalendarModule.forRoot(),HttpClientModule],
    declarations: [SaloonDashboardComponent],
    providers:[SaloonService,NgbModalModule]
})
export class SaloonDashboardModule  {
}
