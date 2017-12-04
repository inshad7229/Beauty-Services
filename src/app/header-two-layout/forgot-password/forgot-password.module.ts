import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerSignupRoutingModule } from './customer-signup-routing.module';
import { CustomerSignupComponent } from './customer-signup.component';

@NgModule({
    imports: [CommonModule, CustomerSignupRoutingModule],
    declarations: [CustomerSignupComponent]
})
export class CustomerSignupModule implements OnInit  {

	 ngOnInit() {
  }
}
