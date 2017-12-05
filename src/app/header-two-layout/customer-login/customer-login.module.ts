import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerLoginRoutingModule } from './customer-login-routing.module';
import { CustomerLoginComponent } from './customer-login.component';

@NgModule({
    imports: [CommonModule, CustomerLoginRoutingModule],
    declarations: [CustomerLoginComponent]
})
export class CustomerLoginModule implements OnInit  {

	 ngOnInit() {
  }
}
