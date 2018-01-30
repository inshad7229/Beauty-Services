import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListRoutingModule } from './customer-list-routing.module';
import { CustomerListComponent } from './customer-list.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {SaloonService} from '../../providers/saloon.service'

@NgModule({
    imports: [CommonModule, CustomerListRoutingModule,NgxPaginationModule],
    declarations: [CustomerListComponent],
    providers:[SaloonService]
})
export class CustomerListModule {}
