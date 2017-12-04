import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceListRoutingModule } from './service-list-routing.module';
import { ServiceListComponent } from './service-list.component';

@NgModule({
    imports: [CommonModule, ServiceListRoutingModule],
    declarations: [ServiceListComponent]
})
export class ServiceListModule {}
