import { NgModule } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router';
import {AuthGuard} from './guard/auth.guard'


const routes: Routes = [
{ path: '',redirectTo: 'header-one-layout' ,pathMatch:'full'},
{ path: 'header-one-layout', loadChildren: './header-one-layout/header-one-layout.module#HeaderOneLayoutModule'},
{ path: 'header-two-layout', loadChildren: './header-two-layout/header-two-layout.module#HeaderTwoLayoutModule'},
{ path: 'header-three-layout', loadChildren: './header-three-layout/header-three-layout.module#HeaderThreeLayoutModule'},
{ path: 'header-four-layout', loadChildren: './header-four-layout/header-four-layout.module#HeaderFourLayoutModule'},
// {path:'first',component:FirstComponent},
// {path:'second',component:SecondComponent},
// {path:'third',component:ThirdComponent,canActivate:[AuthGuard]},
// {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})


export class AppRoutingModule { 
	constructor(private router:Router){

	}
   canActivate() {
        if (localStorage.getItem('isLoggedin')) {
            return true;
        }

        this.router.navigate(['/first']);
        return false;
    }
}
