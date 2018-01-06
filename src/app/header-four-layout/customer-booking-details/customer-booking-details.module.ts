import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { CustomerBookingDetailsRoutingModule } from './customer-booking-details-routing.module';
import { CustomerBookingDetailsComponent } from './customer-booking-details.component';
import {CustomerService} from '../../providers/customer.service'


@NgModule({
    imports: [CommonModule, CustomerBookingDetailsRoutingModule,FormsModule,ReactiveFormsModule,MatSelectModule,HttpClientModule,ToastModule.forRoot()],
    declarations: [CustomerBookingDetailsComponent],
    providers:[CustomerService]
})
export class CustomerBookingDetailsModule implements OnInit  {

	 ngOnInit() {
  }
}
