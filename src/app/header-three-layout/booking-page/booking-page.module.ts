import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingPageRoutingModule } from './booking-page-routing.module';
import { BookingPageComponent } from './booking-page.component';

@NgModule({
    imports: [CommonModule, BookingPageRoutingModule],
    declarations: [BookingPageComponent]
})
export class BookingPageModule {}
