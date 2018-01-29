import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { SaloonService } from '../../providers/saloon.service'; 
import { CommonService } from '../../providers/common.service';
import { ToastsManager , Toast} from 'ng2-toastr';
import { Router } from '@angular/router'
@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
	appointMents;
	saloonId;
	saloonDetails;
  appointMentData;
  customersList=[];
  couponCodes;
  ids=[]
  p: number = 1;
  waitLoader=false;
  couponId;
    constructor(private router:Router,private commonService:CommonService,private saloonService:SaloonService,vcr: ViewContainerRef,private toastr: ToastsManager) {
    	this.saloonDetails=JSON.parse(localStorage['userdetails']);
    	this.saloonId=this.saloonDetails.id;
      this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
    	this.getAppointMentList();
      this.getCoupons();
    }

    getAppointMentList(){
      this.waitLoader=true;
    	this.saloonService.getAppointmentDetailsForSaloon(this.saloonId).subscribe(data=>{
        this.waitLoader=false;
    		this.appointMents=data.data;
        this.setCustomersList();
    	},err=>{

    	})
    }

    imagePath(path){
     if (path!=null) {
       // code...
        if(path.indexOf('base64')==-1) {
          return 'http://18.221.208.210/public/beauty-service/'+path
          // code...
        }else{
          return  path
        }
      }else{
        return "http://placehold.it/300x300"
      }

    }

    getHours(value){
        console.log(value);
      let value2=value.split(':')
      let value3=parseInt(value2[0])
      if (value3>12) {
        var a=value3-12;
        return '0'+a
      }else{
       if (value3<10) {
        return '0'+value3
       }else{
         return value3
       } 
      }
    }

    getMin(value){
      let value2=value.split(':')
      let value3=parseInt(value2[1])
      if (value3<10) {
        return '0'+value3
       }else{
         return value3
       }
    }

    getAmPm(value){
      let value2=value.split(':')
      let value3=parseInt(value2[0])
      if (value3>11) {
        return 'Pm'
       }else{
         return 'Am'
       }
    }

   onView(appointment){
     this.appointMentData=appointment
   }


   setCustomersList(){
     for (var i = 0; i < this.appointMents.length; i++) {
       if(this.customersList.map(function (img) { return img.customer_id; }).indexOf(this.appointMents[i].customer_id)==-1){
         this.customersList.push(this.appointMents[i]);
       }
     }
     console.log(this.customersList.length,"customer");
     console.log(this.appointMents.length,"appp")
   }

   getCoupons(){
     this.commonService.couponList().subscribe(data=>{
       if (data.success==true) {
          this.couponCodes=data.couponCodesData;
       }
     },err=>{
       console.log(err)
     })
   }

  onCustomerCheckbox(id){
   // alert(id)
   if (this.ids.indexOf(id)==-1) {
     console.log("new id")
      this.ids.push(id);
      console.log(this.ids)
    }else{
       console.log("id exit")
       let index=this.ids.indexOf(id)
       console.log(index)
       let a=this.ids.splice(index,1)
       console.log(this.ids)
     }
  }

  onCouponCheckbox(couponId){
    this.couponId=couponId;
    // alert(this.couponId)
  }


  onSendCoupon(){
    let sendCouponsData={
      ids:this.ids,
      coupon_id:this.couponId
    }
    this.commonService.sendCoupon(sendCouponsData).subscribe(data=>{
      if(data.success==true){
        this.toastr.success("coupon code successfully sent" ,'Coupon codes',{toastLife: 1000, showCloseButton: true});
        this.router.navigate(['/header-three-layout'])
      }else{
         this.toastr.error("Error while sending coupon code please try after some time" ,'Coupon codes',{toastLife: 1000, showCloseButton: true})
      }
    },err=>{
      console.log(err);
    })
  }
}
