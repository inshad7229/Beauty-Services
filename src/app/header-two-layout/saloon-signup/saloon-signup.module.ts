import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SaloonSignupRoutingModule } from './saloon-signup-routing.module';
import { SaloonSignupComponent } from './saloon-signup.component';

@NgModule({
    imports: [CommonModule, SaloonSignupRoutingModule,ReactiveFormsModule],
    declarations: [SaloonSignupComponent]
})
export class SaloonSignupModule implements OnInit  {

	 ngOnInit() {
  }
}
