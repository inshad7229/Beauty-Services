import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddServiceRoutingModule } from './add-service-routing.module';
import { AddServiceComponent } from './add-service.component';

@NgModule({
    imports: [CommonModule, AddServiceRoutingModule],
    declarations: [AddServiceComponent]
})
export class AddServiceModule {}
