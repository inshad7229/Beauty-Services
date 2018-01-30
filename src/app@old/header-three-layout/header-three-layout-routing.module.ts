import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderThreeLayoutComponent } from './header-three-layout.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderThreeLayoutComponent,
        children: [
		            { path: '', redirectTo: 'saloon-dashboard' },
		            { path: 'saloon-dashboard', loadChildren: './saloon-dashboard/saloon-dashboard.module#SaloonDashboardModule' },
		            { path: 'add-employee-list', loadChildren: './add-employee-list/add-employee-list.module#AddEmployeeListModule' },  
		            { path: 'add-service', loadChildren: './add-service/add-service.module#AddServiceModule' }, 
		            { path: 'booking-page', loadChildren: './booking-page/booking-page.module#BookingPageModule' }, 
		            { path: 'customer-list', loadChildren: './customer-list/customer-list.module#CustomerListModule' }, 
		            { path: 'saloon-dashboard-profile', loadChildren: './saloon-dashboard-profile/saloon-dashboard-profile.module#SaloonDashboardProfileModule' }, 
		            { path: 'saloon-employee-list', loadChildren: './saloon-employee-list/saloon-employee-list.module#SaloonEmployeeListModule' }, 
		            { path: 'service-list', loadChildren: './service-list/service-list.module#ServiceListModule' }, 
		            { path: 'transaction-details', loadChildren: './transaction-details/transaction-details.module#TransactionDetailsModule' }, 
		            

                 ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeaderThreeLayoutRoutingModule {}
