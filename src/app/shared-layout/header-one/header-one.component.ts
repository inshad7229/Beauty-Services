import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {CommonService} from '../../providers/common.service'

@Component({
    selector: 'app-header-one',
    templateUrl: './header-one.component.html',
    styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
	saloon
customer
waitLoader
categoryList
    constructor(public router: Router,private translate: TranslateService,private commonServices:CommonService) {}

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
    this.getserviceList()
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
}
