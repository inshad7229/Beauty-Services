import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { ToastModule} from 'ng2-toastr/ng2-toastr';
import { CommonService } from '../../providers/common.service';
@NgModule({
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    FormsModule,
	ReactiveFormsModule,
	ToastModule.forRoot(),
  ],
   providers:[CommonService],
  declarations: [ContactUsComponent]
})
export class ContactUsModule { }
