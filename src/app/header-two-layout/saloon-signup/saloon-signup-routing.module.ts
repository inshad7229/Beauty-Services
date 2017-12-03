import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaloonSignupComponent } from './saloon-signup.component';

const routes: Routes = [
    {
        path: '',
        component: SaloonSignupComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SaloonSignupRoutingModule {}
