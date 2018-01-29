import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { CustomerProfileRoutingModule } from './customer-profile-routing.module';
import { CustomerProfileComponent } from './customer-profile.component';
import {CustomerService} from '../../providers/customer.service'


@NgModule({
    imports: [CommonModule, CustomerProfileRoutingModule,FormsModule,ReactiveFormsModule,MatSelectModule,HttpClientModule,ToastModule.forRoot()],
    declarations: [CustomerProfileComponent],
    providers:[CustomerService]
})
export class CustomerProfileModule implements OnInit  {

	 ngOnInit() {
  }
}
