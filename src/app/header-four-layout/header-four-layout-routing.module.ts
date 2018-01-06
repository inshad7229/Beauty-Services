import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderFourLayoutComponent } from './header-four-layout.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderFourLayoutComponent,
        children: [
            { path: '', redirectTo: 'customer-profile' },
            { path: 'customer-profile', loadChildren: './customer-profile/customer-profile.module#CustomerProfileModule' },
            { path: 'booking-details', loadChildren: './customer-booking-details/customer-booking-details.module#CustomerBookingDetailsModule' },        
            { path: 'my-appointments', loadChildren: './my-appointments/my-appointments.module#MyAppointmentsModule' },]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeaderFourLayoutRoutingModule {}
