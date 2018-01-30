import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaloonDetailsComponent } from './saloon-details.component';

const routes: Routes = [
    {
        path: '',
        component: SaloonDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SaloonDetailsRoutingModule {}
