import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerBookingDetailsComponent } from './customer-booking-details.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerBookingDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerBookingDetailsRoutingModule {}
