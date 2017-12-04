import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'
import { SaloonDashboardRoutingModule } from './saloon-dashboard-routing.module';
import { SaloonDashboardComponent } from './saloon-dashboard.component';


@NgModule({
    imports: [CommonModule,FormsModule, SaloonDashboardRoutingModule,CalendarModule.forRoot(), NgbModalModule.forRoot()],
    declarations: [SaloonDashboardComponent]
})
export class SaloonDashboardModule implements OnInit  {

	 ngOnInit() {
  }
}
