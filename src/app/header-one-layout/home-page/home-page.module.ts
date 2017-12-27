import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import {CommonService} from '../../providers/common.service'

@NgModule({
    imports: [CommonModule, HomePageRoutingModule],
    declarations: [HomePageComponent],
    providers:[CommonService]
})
export class HomePageModule implements OnInit  {

	 ngOnInit() {
  }
}
