import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchedServicesRoutingModule } from './searched-services-routing.module';
import { SearchedServicesComponent } from './searched-services.component';

@NgModule({
    imports: [CommonModule, SearchedServicesRoutingModule],
    declarations: [SearchedServicesComponent]
})
export class SearchedServicesModule implements OnInit  {

	 ngOnInit() {
  }
}
