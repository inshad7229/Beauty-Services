import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule }    from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { MyAppointmentsRoutingModule } from './my-appointments-routing.module';
import { MyAppointmentsComponent } from './my-appointments.component';
import {CustomerService} from '../../providers/customer.service'


@NgModule({
    imports: [CommonModule, MyAppointmentsRoutingModule,FormsModule,ReactiveFormsModule,MatSelectModule,HttpClientModule,ToastModule.forRoot()],
    declarations: [MyAppointmentsComponent],
    providers:[CustomerService]
})
export class MyAppointmentsModule   {

}
