import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddServiceRequestRoutingModule } from './add-service-request-routing.module';
import { AddServiceRequestComponent } from './add-service-request.component';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { SaloonService } from '../../providers/saloon.service';

@NgModule({
  imports: [
    CommonModule,ReactiveFormsModule,FormsModule,MultiselectDropdownModule,
    AddServiceRequestRoutingModule
  ],
  declarations: [AddServiceRequestComponent],
  providers:[SaloonService]
})
export class AddServiceRequestModule { }
