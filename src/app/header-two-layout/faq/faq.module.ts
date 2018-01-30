import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonService } from '../../providers/common.service';
@NgModule({
  imports: [
    CommonModule,
    FaqRoutingModule,
    MatExpansionModule
  ],
  providers:[CommonService],
  declarations: [FaqComponent]
})
export class FaqModule { }
