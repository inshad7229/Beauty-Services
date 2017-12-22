import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {TranslateModule} from '@ngx-translate/core';
import {NgxPaginationModule} from 'ngx-pagination'; 

import { SaloonEmployeeListRoutingModule } from './saloon-employee-list-routing.module';
import { SaloonEmployeeListComponent } from './saloon-employee-list.component';
import {SaloonService} from '../../providers/saloon.service'
@NgModule({
    imports: [CommonModule, SaloonEmployeeListRoutingModule,
         FormsModule,
	    ReactiveFormsModule,
	    MultiselectDropdownModule,
	    HttpClientModule,
	    ToastModule.forRoot(),
	    TranslateModule,
	    NgxPaginationModule],
    declarations: [SaloonEmployeeListComponent],
    providers:[SaloonService]
})
export class SaloonEmployeeListModule {}
