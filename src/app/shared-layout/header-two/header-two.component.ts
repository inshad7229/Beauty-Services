
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-header-two',
    templateUrl: './header-two.component.html',
    styleUrls: ['./header-two.component.scss']
})
export class HeaderTwoComponent implements OnInit {
	customer
    constructor(public router: Router,private translate: TranslateService) {
    	if (localStorage['customerdetails']) {
          // code...
          this.customer=JSON.parse(localStorage['customerdetails'])
        }else{
          this.customer=null
        }
    }

    ngOnInit() {}
    	onLogout(){
	 localStorage['userdetails']='null'
	localStorage['customerdetails']='null'
	this.customer=null
	}
	oncustomerProfile(){
           this.router.navigate(['/header-four-layout/customer-profile']);
	}
}
