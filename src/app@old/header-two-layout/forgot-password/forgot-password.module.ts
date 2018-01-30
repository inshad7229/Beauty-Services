import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import {SaloonService} from '../../providers/saloon.service'
import {CustomerService} from '../../providers/customer.service'

@NgModule({
    imports: [CommonModule, ForgotPasswordRoutingModule,FormsModule,ReactiveFormsModule,MatSelectModule,HttpClientModule,ToastModule.forRoot()],
    declarations: [ForgotPasswordComponent],
    providers:[SaloonService,CustomerService]
})
export class ForgotPasswordModule implements OnInit  {

	 ngOnInit() {
  }
}
