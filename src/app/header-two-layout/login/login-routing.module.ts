import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerSignupComponent } from './customer-signup.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerSignupComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerSignupRoutingModule {}
