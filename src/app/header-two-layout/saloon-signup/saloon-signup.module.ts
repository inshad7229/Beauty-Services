import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaloonSignupRoutingModule } from './saloon-signup-routing.module';
import { SaloonSignupComponent } from './saloon-signup.component';

@NgModule({
    imports: [CommonModule, SaloonSignupRoutingModule],
    declarations: [SaloonSignupComponent]
})
export class SaloonSignupModule implements OnInit  {

	 ngOnInit() {
  }
}
