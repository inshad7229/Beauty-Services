import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateNewPasswordRoutingModule } from './create-new-password-routing.module';
import { CreateNewPasswordComponent } from './create-new-password.component';

@NgModule({
    imports: [CommonModule, CreateNewPasswordRoutingModule],
    declarations: [CreateNewPasswordComponent]
})
export class CreateNewPasswordModule implements OnInit  {

	 ngOnInit() {
  }
}
