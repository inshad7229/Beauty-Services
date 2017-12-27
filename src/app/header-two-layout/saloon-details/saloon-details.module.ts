import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaloonDetailsRoutingModule } from './saloon-details-routing.module';
import { SaloonDetailsComponent } from './saloon-details.component';

@NgModule({
    imports: [CommonModule, SaloonDetailsRoutingModule],
    declarations: [SaloonDetailsComponent]
})
export class SaloonDetailsModule implements OnInit  {

	 ngOnInit() {
  }
}
