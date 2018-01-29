import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerProfileComponent } from './customer-profile.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerProfileComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerProfileRoutingModule {}
