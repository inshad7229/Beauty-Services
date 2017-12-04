import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerProfileRoutingModule } from './customer-profile-routing.module';
import { CustomerProfileComponent } from './customer-profile.component';


@NgModule({
    imports: [CommonModule, CustomerProfileRoutingModule],
    declarations: [CustomerProfileComponent]
})
export class CustomerProfileModule implements OnInit  {

	 ngOnInit() {
  }
}
