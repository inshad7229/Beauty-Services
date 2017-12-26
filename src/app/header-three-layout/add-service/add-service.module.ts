import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {TranslateModule} from '@ngx-translate/core';


import { AddServiceRoutingModule } from './add-service-routing.module';
import { AddServiceComponent } from './add-service.component';
import {SaloonService} from '../../providers/saloon.service'
import {CommonService} from '../../providers/common.service'
@NgModule({
    imports: [
    CommonModule, 
    AddServiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    HttpClientModule,
    ToastModule.forRoot(),
    TranslateModule],
    declarations: [AddServiceComponent],
    providers:[SaloonService,CommonService]
})
export class AddServiceModule {}
