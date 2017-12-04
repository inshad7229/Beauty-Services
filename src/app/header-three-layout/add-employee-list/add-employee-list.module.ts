import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEmployeeListRoutingModule } from './add-employee-list-routing.module';
import { AddEmployeeListComponent } from './add-employee-list.component';

@NgModule({
    imports: [CommonModule, AddEmployeeListRoutingModule],
    declarations: [AddEmployeeListComponent]
})
export class AddEmployeeListModule {}
