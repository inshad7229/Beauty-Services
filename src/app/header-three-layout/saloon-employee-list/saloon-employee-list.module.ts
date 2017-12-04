import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaloonEmployeeListRoutingModule } from './saloon-employee-list-routing.module';
import { SaloonEmployeeListComponent } from './saloon-employee-list.component';

@NgModule({
    imports: [CommonModule, SaloonEmployeeListRoutingModule],
    declarations: [SaloonEmployeeListComponent]
})
export class SaloonEmployeeListModule {}
