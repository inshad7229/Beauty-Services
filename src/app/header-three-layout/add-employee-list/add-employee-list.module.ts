import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {TranslateModule} from '@ngx-translate/core';

import { AddEmployeeListRoutingModule } from './add-employee-list-routing.module';
import { AddEmployeeListComponent } from './add-employee-list.component';
import {SaloonService} from '../../providers/saloon.service'
import {CommonService} from '../../providers/common.service'

@NgModule({
    imports: [CommonModule, 
        AddEmployeeListRoutingModule,
	    FormsModule,
	    ReactiveFormsModule,
	    MultiselectDropdownModule,
	    HttpClientModule,
	    ToastModule.forRoot(),
	    TranslateModule],
    declarations: [AddEmployeeListComponent],
    providers:[SaloonService,CommonService]
})
export class AddEmployeeListModule {}
