import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionDetailsRoutingModule } from './transaction-details-routing.module';
import { TransactionDetailsComponent } from './transaction-details.component';
import { SaloonService }from '../../providers/saloon.service';
import { NgxPaginationModule } from 'ngx-pagination'; 

@NgModule({
    imports: [CommonModule, TransactionDetailsRoutingModule,NgxPaginationModule],
    declarations: [TransactionDetailsComponent],
    providers:[SaloonService]
})
export class TransactionDetailsModule {}
