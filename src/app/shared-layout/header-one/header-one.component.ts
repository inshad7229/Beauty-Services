import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-header-one',
    templateUrl: './header-one.component.html',
    styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
	saloon
customer
    constructor(public router: Router,private translate: TranslateService,) {}

    ngOnInit() {
    	if (localStorage['userdetails']) {
          // code...
          this.saloon=JSON.parse(localStorage['userdetails'])
        }else{
          this.saloon=null
        }

        if (localStorage['customerdetails']) {
          // code...
          this.customer=JSON.parse(localStorage['customerdetails'])
        }else{
          this.customer=null
        }

        console.log('saloon',this.saloon)
        console.log('customer',this.customer)

    }
	onSaloonProfile(){
       
              this.router.navigate(['/header-three-layout/saloon-dashboard']);
	}
	onLogout(){
	 localStorage['userdetails']='null'
	this.saloon=null
	localStorage['customerdetails']='null'
	this.customer=null
	}
	oncustomerProfile(){
           this.router.navigate(['/header-four-layout/customer-profile']);
	}
	 imagePath(path){
        if(path.indexOf('base64')==-1) {
            return 'http://18.216.88.154/public/beauti-service/'+path
            // code...
          }else{
             return  path
          }
    }
}
