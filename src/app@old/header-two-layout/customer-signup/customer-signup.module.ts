import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {TranslateModule} from '@ngx-translate/core';

import { CustomerSignupRoutingModule } from './customer-signup-routing.module';
import { CustomerSignupComponent } from './customer-signup.component';
import {CustomerService} from '../../providers/customer.service'

@NgModule({
    imports: [
			    CommonModule, 
			    CustomerSignupRoutingModule,
			    FormsModule,
			    ReactiveFormsModule,
			    MatSelectModule,
			    HttpClientModule,ToastModule.forRoot(),
			    TranslateModule
			    ],
    declarations: [CustomerSignupComponent],
    providers:[CustomerService]
})
export class CustomerSignupModule implements OnInit  {

	 ngOnInit() {
  }
}
