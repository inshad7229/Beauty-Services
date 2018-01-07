import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {CommonService} from '../../providers/common.service'
import {AppProvider} from '../../providers/app.provider';

@Component({
    selector: 'app-header-two',
    templateUrl: './header-two.component.html',
    styleUrls: ['./header-two.component.scss']
})
export class HeaderTwoComponent implements OnInit {
	customer
  saloon
waitLoader
categoryList
    constructor(public router: Router,
                private translate: TranslateService,
                private commonServices:CommonService,
                private appProvider:AppProvider) {
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
        this.getserviceList()
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

     getserviceList(){
          this.waitLoader=true
        this.commonServices.getCategoryWithServices()
        .subscribe((data)=>{
            var list=[]
             this.waitLoader=false
            console.log(data);
            if(data.response){
                this.categoryList=data.data
               
              // this.toastr.success(data.message ,'Services Added successfully ',{toastLife: 1000, showCloseButton: true})
              // this.router.navigate(['/header-three-layout/service-list']);
            }
         }) 
    }
    services(ser){
      this.appProvider.current.serviceSearched=ser
     // this.router.navigate(['/header-three-layout/saloon-dashboard']);
      this.router.navigate(["/header-two-layout/searched-saloon"])
    }
}
