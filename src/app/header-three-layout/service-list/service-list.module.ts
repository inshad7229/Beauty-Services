import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {TranslateModule} from '@ngx-translate/core'

import { ServiceListRoutingModule } from './service-list-routing.module';
import { ServiceListComponent } from './service-list.component';
import {SaloonService} from '../../providers/saloon.service'

@NgModule({
    imports: [CommonModule, 
    ServiceListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    HttpClientModule,
    ToastModule.forRoot(),
    TranslateModule],
    declarations: [ServiceListComponent],
    providers:[SaloonService]
})
export class ServiceListModule {}
