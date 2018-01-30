import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaloonDashboardProfileComponent } from './saloon-dashboard-profile.component';

const routes: Routes = [
    {
        path: '',
        component: SaloonDashboardProfileComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SaloonDashboardProfileRoutingModule {}
