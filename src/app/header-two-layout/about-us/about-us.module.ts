import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { CommonService } from '../../providers/common.service';

@NgModule({
  imports: [
    CommonModule,
    AboutUsRoutingModule
  ],
  providers:[CommonService],
  declarations: [AboutUsComponent]
})
export class AboutUsModule { }
