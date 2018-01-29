import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionDetailsRoutingModule } from './transaction-details-routing.module';
import { TransactionDetailsComponent } from './transaction-details.component';

@NgModule({
    imports: [CommonModule, TransactionDetailsRoutingModule],
    declarations: [TransactionDetailsComponent]
})
export class TransactionDetailsModule {}
