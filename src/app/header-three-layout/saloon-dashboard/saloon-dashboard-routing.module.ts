import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaloonDashboardComponent } from './saloon-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: SaloonDashboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SaloonDashboardRoutingModule {}
