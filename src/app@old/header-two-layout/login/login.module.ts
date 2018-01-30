import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { FacebookModule } from 'ngx-facebook';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";




import {SaloonService} from '../../providers/saloon.service'
import {CustomerService} from '../../providers/customer.service'

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1931935820389211")
  }
]);


@NgModule({
    imports: [CommonModule,
     LoginRoutingModule,FormsModule,
     ReactiveFormsModule,MatSelectModule,MultiselectDropdownModule,HttpClientModule,
     ToastModule.forRoot(),
     FacebookModule.forRoot(),
    SocialLoginModule.initialize(config)],
    declarations: [LoginComponent],
    providers:[SaloonService,CustomerService]
})
export class LoginModule implements OnInit  {

	 ngOnInit() {
  }
}
