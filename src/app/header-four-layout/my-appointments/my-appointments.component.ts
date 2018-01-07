import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {CustomerSignUpModel} from '../../models/customer.modal';
import {CustomerService} from '../../providers/customer.service'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
declare var $
declare var jQuery
declare var Metronic
declare var Layout
declare var Demo
declare var Tasks
@Component({
    selector: 'app-my-appointments',
    templateUrl: './my-appointments.component.html',
    styleUrls: ['./my-appointments.component.scss']
})
export class MyAppointmentsComponent implements OnInit {
    userDetail=JSON.parse(localStorage['customerdetails'])
    appointment
    constructor(public router: Router, private fb: FormBuilder,
                vcr: ViewContainerRef,
                private toastr: ToastsManager,
                private customerService:CustomerService) {
      this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
       this.getAppointment()
         $("#row2").hide();
    $("#row6").hide();
  //      $(document).ready(function() {
   //            $('.multiselect').multiselect();
    //           });
    // $("#row2").hide();
    //         $(document).ready(function(){
    //           $("#show1").click(function(){
    //               $("#row1").hide(600);
    //               $("#row2").show(600);
    //           });
    //       });
    //  $("#row6").hide();
    //       $(document).ready(function(){
    //         $("#show3").click(function(){
    //             $("#row5").hide(500);
    //             $("#row6").show(500);
    //         });
    //       });
       
       Metronic.init(); // init metronic core componets
       Layout.init(); // init layout
       Demo.init(); // init demo features 
       /*Index.init(); // init index page*/
       Tasks.initDashboardWidget(); // init tash dashboard widget  
		
    }
    getAppointment(){
       
        this.customerService.CustomerAppointment(this.userDetail.id)
        .subscribe((data)=>{
         // alert(data)
            console.log(data);
            if(data.response){
              this.appointment=data.data
              this.toastr.success(data.message ,'success',{toastLife: 1000, showCloseButton: true})
            }else if (data.message=='Unable to update Password') {
               this.toastr.error('Unable to update Password' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
              // code...
            }else if (data.message=='current password is incorrect') {
               this.toastr.error('current password is incorrect' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
            }
         })
    }
    getHours(value){
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

getStatus(status){
  if(status==0){
      return 'Pending'
  }else if (status==1) {
      return 'Complete'
  }else if (status==2) {
    return 'Canceled'
  }
}
    imagePath(path){
    if(path.indexOf('base64')==-1) {
        return 'http://18.221.208.210/public/beauty-service/'+path
        // code...
      }else{
         return  path
      }
    }

    getRatingClass(rating,flag){
      let count:number=0;
      let avg:number=0
      for (var i = 0; i < rating.length; ++i) {
        // code...rating
        if (rating[i].rating) {
          // code...
          count=count+parseInt(rating[i].rating)
        }
      }
       avg=count/rating.length
      if (flag==1) {
        if (avg<1) {
          return 'fa fa-star-half-o'
        }else{
          return 'fa fa-star'
        }
      }
     else if (flag==2) {
        if (avg<2) {
          return 'fa fa-star-half-o'
        }else{
          return 'fa fa-star'
        }
      }

      else if (flag==3) {
        if (avg<3) {
          return 'fa fa-star-half-o'
        }else{
          return 'fa fa-star'
        }
      }
     else if (flag==4) {
        if (avg<4) {
          return 'fa fa-star-half-o'
        }else{
          return 'fa fa-star'
        }
      }
    else  if (flag==5) {
        if (avg<5) {
          return 'fa fa-star-half-o'
        }else{
          return 'fa fa-star'
        }
      }
    }
}
