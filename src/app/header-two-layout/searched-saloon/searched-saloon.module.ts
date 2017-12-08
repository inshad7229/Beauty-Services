import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { SearchedSaloonRoutingModule } from './searched-saloon-routing.module';
import { SearchedSaloonComponent } from './searched-saloon.component';
import {SaloonService} from '../../providers/saloon.service'

@NgModule({
    imports: [CommonModule, SearchedSaloonRoutingModule,HttpClientModule,ToastModule.forRoot()],
    declarations: [SearchedSaloonComponent],
    providers:[SaloonService]
})
export class SearchedSaloonModule implements OnInit  {

	 ngOnInit() {
  }
}
