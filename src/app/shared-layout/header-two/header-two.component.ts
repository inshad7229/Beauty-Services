
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
  saloon
    constructor(public router: Router,private translate: TranslateService) {
    	if (localStorage['customerdetails']) {
          // code...
          this.customer=JSON.parse(localStorage['customerdetails'])
        }else{
          this.customer=null
        }
    }

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
    }
    onLogout(){
     localStorage['userdetails']='null'
    this.saloon=null
    localStorage['customerdetails']='null'
    this.customer=null
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/header-one-layout/home-page'])
  }
	oncustomerProfile(){
           this.router.navigate(['/header-four-layout/customer-profile']);
	}
  imagePath(path){
        if(path.indexOf('base64')==-1) {
            return 'http://18.221.208.210/public/beauty-service/'+path
            // code...
          }else{
             return  path
          }
    }
}
