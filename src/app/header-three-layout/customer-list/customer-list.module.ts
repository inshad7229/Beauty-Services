import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerListRoutingModule } from './customer-list-routing.module';
import { CustomerListComponent } from './customer-list.component';

@NgModule({
    imports: [CommonModule, CustomerListRoutingModule],
    declarations: [CustomerListComponent]
})
export class CustomerListModule {}
