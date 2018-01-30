import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeListComponent } from './add-employee-list.component';

const routes: Routes = [
    {
        path: '',
        component: AddEmployeeListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddEmployeeListRoutingModule {}
