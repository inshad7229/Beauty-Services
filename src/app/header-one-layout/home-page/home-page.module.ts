import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { CommonService } from '../../providers/common.service'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
@NgModule({
    imports: [CommonModule, HomePageRoutingModule,MatAutocompleteModule,MatInputModule,MatFormFieldModule,FormsModule,ReactiveFormsModule],
    declarations: [HomePageComponent],
    providers:[CommonService]
})
export class HomePageModule implements OnInit  {

	ngOnInit() {
		
  	}
}
