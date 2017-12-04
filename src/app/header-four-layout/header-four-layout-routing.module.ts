import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderFourLayoutComponent } from './header-four-layout.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderFourLayoutComponent,
        children: [
            { path: '', redirectTo: 'customer-profile' },
            { path: 'customer-profile', loadChildren: './customer-profile/customer-profile.module#CustomerProfileModule' },        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeaderFourLayoutRoutingModule {}
