import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaloonEmployeeListComponent } from './saloon-employee-list.component';

const routes: Routes = [
    {
        path: '',
        component: SaloonEmployeeListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SaloonEmployeeListRoutingModule {}
