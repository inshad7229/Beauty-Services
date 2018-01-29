import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAppointmentsComponent } from './my-appointments.component';

const routes: Routes = [
    {
        path: '',
        component: MyAppointmentsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyAppointmentsRoutingModule {}
