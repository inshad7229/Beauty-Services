import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddServiceRequestComponent } from './add-service-request.component'

const routes: Routes = [
	{path:'',component:AddServiceRequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddServiceRequestRoutingModule { }
