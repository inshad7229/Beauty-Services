import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';


import { SaloonSignupRoutingModule } from './saloon-signup-routing.module';
import { SaloonSignupComponent } from './saloon-signup.component';
import {SaloonService} from '../../providers/saloon.service'
declare var $
@NgModule({
    imports: [CommonModule, SaloonSignupRoutingModule,FormsModule,ReactiveFormsModule,MatSelectModule,MultiselectDropdownModule,HttpClientModule,ToastModule.forRoot()],
    declarations: [SaloonSignupComponent],
    providers:[SaloonService]
})
export class SaloonSignupModule implements OnInit  {

	 ngOnInit() {
	 	 $('.multiselect').multiselect();
  }


}
