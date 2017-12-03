import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaloonDashboardRoutingModule } from './saloon-dashboard-routing.module';
import { SaloonDashboardComponent } from './saloon-dashboard.component';

@NgModule({
    imports: [CommonModule, SaloonDashboardRoutingModule],
    declarations: [SaloonDashboardComponent]
})
export class SaloonDashboardModule implements OnInit  {

	 ngOnInit() {
  }
}
