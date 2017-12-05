import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchedSaloonRoutingModule } from './searched-saloon-routing.module';
import { SearchedSaloonComponent } from './searched-saloon.component';

@NgModule({
    imports: [CommonModule, SearchedSaloonRoutingModule],
    declarations: [SearchedSaloonComponent]
})
export class SearchedSaloonModule implements OnInit  {

	 ngOnInit() {
  }
}
