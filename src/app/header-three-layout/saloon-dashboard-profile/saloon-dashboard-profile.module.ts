import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';


import { SaloonDashboardProfileRoutingModule } from './saloon-dashboard-profile-routing.module';
import { SaloonDashboardProfileComponent } from './saloon-dashboard-profile.component';
import {SaloonService} from '../../providers/saloon.service'

@NgModule({
    imports: [CommonModule, SaloonDashboardProfileRoutingModule,FormsModule,ReactiveFormsModule,MatSelectModule,MultiselectDropdownModule,HttpClientModule,ToastModule.forRoot()],
    declarations: [SaloonDashboardProfileComponent],
    providers:[SaloonService]
})
export class SaloonDashboardProfileModule {}
