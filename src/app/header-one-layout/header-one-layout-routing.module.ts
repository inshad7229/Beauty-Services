import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderOneLayoutComponent } from './header-one-layout.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderOneLayoutComponent,
        children: [
            { path: '', redirectTo: 'home-page' },
            { path: 'home-page', loadChildren: './home-page/home-page.module#HomePageModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeaderOneLayoutRoutingModule {}
