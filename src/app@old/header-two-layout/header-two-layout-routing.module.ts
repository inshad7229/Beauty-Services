import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderTwoLayoutComponent } from './header-two-layout.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderTwoLayoutComponent,
        children: [
                    { path: '', redirectTo: 'saloon-signup' },
                    { path: 'saloon-signup', loadChildren: './saloon-signup/saloon-signup.module#SaloonSignupModule' },
                    { path: 'customer-signup', loadChildren: './customer-signup/customer-signup.module#CustomerSignupModule' },
                    { path: 'create-new-password', loadChildren: './create-new-password/create-new-password.module#CreateNewPasswordModule' }, 
                    { path: 'customer-login', loadChildren: './customer-login/customer-login.module#CustomerLoginModule' },  
                    { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule' }, 
                    { path: 'login', loadChildren: './login/login.module#LoginModule' }, 
                    { path: 'searched-saloon', loadChildren: './searched-saloon/searched-saloon.module#SearchedSaloonModule' }, 
                    { path: 'searched-services', loadChildren: './searched-services/searched-services.module#SearchedServicesModule' },
                    { path: 'saloon-details', loadChildren: './saloon-details/saloon-details.module#SaloonDetailsModule' },  
                    { path: 'saloon-details/:id', loadChildren: './saloon-details/saloon-details.module#SaloonDetailsModule' },  
                    

                    ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeaderTwoLayoutRoutingModule {}
