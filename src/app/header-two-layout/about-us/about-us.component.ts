import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../providers/common.service';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
	serviceList;
	aboutUsContent
  constructor(private commonServices:CommonService) { }

  ngOnInit() {
  	this.getAboutUsData();
  }

  getAboutUsData(){
  	Observable.forkJoin([this.commonServices.homePageContent(), this.commonServices.getServices()]).subscribe(results => {
      if (results[0].response==true) {
          this.aboutUsContent=results[0];
          console.log(this.aboutUsContent)
      }
      if (results[1].response==true) {
        this.serviceList=results[1].data.slice(0, 6);
      }
    },error=>{
     	console.log(error);
    });
  }

}
