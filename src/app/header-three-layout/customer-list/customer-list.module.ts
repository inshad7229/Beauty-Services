import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListRoutingModule } from './customer-list-routing.module';
import { CustomerListComponent } from './customer-list.component';
import { NgxPaginationModule} from 'ngx-pagination'; 
import { SaloonService} from '../../providers/saloon.service';
import { CommonService } from '../../providers/common.service'
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { MatRadioModule } from '@angular/material/radio';
@NgModule({
    imports: [MatRadioModule,CommonModule, CustomerListRoutingModule,NgxPaginationModule,ToastModule.forRoot(),],
    declarations: [CustomerListComponent],
    providers:[SaloonService,CommonService],

})
export class CustomerListModule {}
