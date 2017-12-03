import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderThreeLayoutComponent } from './header-three-layout.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderThreeLayoutComponent,
        children: [
            { path: '', redirectTo: 'saloon-dashboard' },
            { path: 'saloon-dashboard', loadChildren: './saloon-dashboard/saloon-dashboard.module#SaloonDashboardModule' },        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeaderThreeLayoutRoutingModule {}
