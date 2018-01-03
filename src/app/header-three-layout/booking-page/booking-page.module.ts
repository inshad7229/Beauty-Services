import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingPageRoutingModule } from './booking-page-routing.module';
import { BookingPageComponent } from './booking-page.component';
import { SaloonService } from '../../providers/saloon.service'
import { NgxPaginationModule } from 'ngx-pagination'; 
import { CommonService } from '../../providers/common.service';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NativeDateAdapter } from '@angular/material'
import { MatNativeDateModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [FormsModule,MatInputModule,CommonModule, BookingPageRoutingModule,NgxPaginationModule,MatDatepickerModule,MatFormFieldModule,MatNativeDateModule],
    declarations: [BookingPageComponent],
    providers:[ SaloonService,CommonService , NativeDateAdapter]
})
export class BookingPageModule {}
