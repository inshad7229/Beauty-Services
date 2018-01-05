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
    selector: 'app-customer-profile',
    templateUrl: './customer-profile.component.html',
    styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
    userDetail=JSON.parse(localStorage['customerdetails'])
     customerSignupForm:FormGroup
     passwordForm:FormGroup
    editOne:boolean=false
    editOne2:boolean=false
    tempImag
    passwordModel
    message
    constructor(public router: Router, private fb: FormBuilder,
                vcr: ViewContainerRef,
                private toastr: ToastsManager,
                private customerService:CustomerService) {
        this.passwordModel={}
        this.tempImag=this.userDetail.image
    	        this.toastr.setRootViewContainerRef(vcr);
    	  this.customerSignupForm = fb.group({
	                'first_name': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
	                'last_name': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
	                'email': [null, Validators.compose([Validators.required,Validators.pattern(EMAIL_REGEX)])],
	                'contact_number': [null, Validators.compose([Validators.required,Validators.maxLength(12),Validators.pattern('[0-9]*')])],
	                'city': [null, Validators.compose([Validators.required,Validators.maxLength(30)])]
	            })
         this.passwordForm = fb.group({
                'currentPassword': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
                'newPassword': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
                'confirmPassword': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
            
        }) 
    	 this.customerSignupForm.controls['email'].disable();
    }

    ngOnInit() {
         $("#row2").hide();
		$("#row6").hide();
  //   	 $(document).ready(function() {
	 //            $('.multiselect').multiselect();
		// 	        });
		// $("#row2").hide();
		// 		  	$(document).ready(function(){
		// 			    $("#show1").click(function(){
		// 			        $("#row1").hide(600);
		// 			        $("#row2").show(600);
		// 			    });
		// 			});
		//  $("#row6").hide();
		// 		  $(document).ready(function(){
		// 		    $("#show3").click(function(){
		// 		        $("#row5").hide(500);
		// 		        $("#row6").show(500);
		// 		    });
		// 		  });
		   
		   Metronic.init(); // init metronic core componets
		   Layout.init(); // init layout
		   Demo.init(); // init demo features 
		   /*Index.init(); // init index page*/
		   Tasks.initDashboardWidget(); // init tash dashboard widget  
		
    }

    onClickDetailsEdit(){
    	if (this.editOne==false) {
	    	$("#row1").hide(600);
		    $("#row2").show(600);
    		this.editOne=true
    	}else{
    		this.editOne=false
    		$("#row1").show(600);
		    $("#row2").hide(600);
    	}
    }

    onClickPasswordEdit(){
    	if (this.editOne2==false) {
	    	$("#row5").hide(500);
		    $("#row6").show(500);
    		this.editOne2=true
    	}else{
    		this.editOne2=false
    		$("#row5").show(500);
		    $("#row6").hide(500);
    	}
    }
    onCancelDetailshow(){
    	this.editOne=false
        this.userDetail.image=this.tempImag
    		$("#row1").show(600);
		    $("#row2").hide(600);
    }
    onCancelPasswordshow(){
    	this.editOne2=false
        $("#row5").show(500);
		$("#row6").hide(500);
    }
    confirm(){
        if (this.passwordModel.newPassword ==this.passwordModel.confirmPassword) {
            this.message=false;
          }
          else{
            this.message=true;
          }
        }
      pass_confirm(){
        if (this.passwordModel.confirmPassword) {
        // code...
          if (this.passwordModel.newPassword ==this.passwordModel.confirmPassword) {
             this.message=false;
          }
          else{
             this.message=true;
          }
        }

      }

       onCustomerUpdate(){
         this.userDetail.customerId=this.userDetail.id
         delete(this.userDetail.password)
         delete(this.userDetail.updated_at)
         delete(this.userDetail.created_at)
         delete(this.userDetail.status)
         this.customerService.CustomerProfileUpdate(this.userDetail)
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
              this.toastr.success(data.message ,'customer',{toastLife: 3000, showCloseButton: true})
                this.editOne=false
                $("#row1").show(600);
                $("#row2").hide(600);
                localStorage['customerdetails']=JSON.stringify(data.data)
                this.userDetail=JSON.parse(localStorage['customerdetails'])
                this.tempImag=this.userDetail.image
              // setTimeout(()=>{
                // this.router.navigate(['/header-two-layout/login']);
              // },3000)
            //    alert(data.message)
            }else if (data.message=='Unable to update customer') {
               this.toastr.error('Unable to update customer' ,'Updation Failed ',{toastLife: 3000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Updation Failed ',{toastLife: 3000, showCloseButton: true});
            }
         })
    }

    onUpdatePass(){
        this.passwordModel.customerId=this.userDetail.id
        this.customerService.CustomerPasswordUpdate(this.passwordModel)
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
              this.toastr.success(data.message ,'Password Update',{toastLife: 1000, showCloseButton: true})
              this.editOne2=false
                $("#row5").show(500);
                $("#row6").hide(500);
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

    imageUploadEvent(evt: any) {
        if (!evt.target) {
            return;
        }
        if (!evt.target.files) {
            return;
        }
        if (evt.target.files.length !== 1) {
            return;
        }
        const file = evt.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') {
            return;
        }
        const fr = new FileReader();
        fr.onloadend = (loadEvent) => {
            this.userDetail.image= fr.result;
            console.log(this.userDetail.image)
        };
        fr.readAsDataURL(file);
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
