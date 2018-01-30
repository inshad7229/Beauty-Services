import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../providers/common.service'
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqList;
  waitLoader:boolean=false;
  constructor(private commonService:CommonService) { }

  ngOnInit() {
    this.getFaqList();
  }

  getFaqList(){
    this.waitLoader=true
    this.commonService.faqList().subscribe(data=>{
        this.waitLoader=false;
      if (data.success=true) {
        this.faqList=data.faqData;
      }
    },err=>{

    })
  }

}
