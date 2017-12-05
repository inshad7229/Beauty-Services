import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchedServicesComponent } from './searched-services.component';

const routes: Routes = [
    {
        path: '',
        component: SearchedServicesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchedServicesRoutingModule {}
