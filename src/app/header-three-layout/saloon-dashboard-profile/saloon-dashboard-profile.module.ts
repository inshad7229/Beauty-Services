import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaloonDashboardProfileRoutingModule } from './saloon-dashboard-profile-routing.module';
import { SaloonDashboardProfileComponent } from './saloon-dashboard-profile.component';

@NgModule({
    imports: [CommonModule, SaloonDashboardProfileRoutingModule],
    declarations: [SaloonDashboardProfileComponent]
})
export class SaloonDashboardProfileModule {}
