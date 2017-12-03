import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderTwoLayoutComponent } from './header-two-layout.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderTwoLayoutComponent,
        children: [
            { path: '', redirectTo: 'saloon-signup' },
            { path: 'saloon-signup', loadChildren: './saloon-signup/saloon-signup.module#SaloonSignupModule' },        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeaderTwoLayoutRoutingModule {}
