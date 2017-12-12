import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import {SaloonService} from '../../providers/saloon.service'
import {CustomerService} from '../../providers/customer.service'
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
		verifiactionForm:FormGroup
	   loginModel
    constructor(public router: Router, private fb: FormBuilder, 
                private saloonServices:SaloonService,
                vcr: ViewContainerRef,
                private toastr: ToastsManager,
                private customerService:CustomerService) {
    	 this.loginModel={}
    	    this.toastr.setRootViewContainerRef(vcr);
    	     this.verifiactionForm = fb.group({
                'email': [null, Validators.compose([Validators.required,Validators.pattern(EMAIL_REGEX)])],
                'loginAS': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
            
        })
        this.loginModel.loginAS='saloon'
    }

    ngOnInit() {}

    onSubmit(){
         if (this.loginModel.loginAS=='saloon') {
               this.saloonServices.SaloonForgotPassword(this.loginModel)
              .subscribe((data)=>{
                  console.log(data);
                  if(data.response){
                    this.toastr.success(data.message ,'Account Verification',{toastLife: 1000, showCloseButton: true})
                    // setTimeout(()=>{
                              this.router.navigate(['/header-two-layout/login']);
                    // },1000)
                  //    alert(data.message)
                  }else if (data.message=='Unable to update Password') {
                     this.toastr.error('Unable to update Password' ,'Authentication Failed ',{toastLife: 1000, showCloseButton: true});
                    // code...
                  }else {
                    this.toastr.error( 'Something went wrong please try again' ,'Authentication Failed ',{toastLife: 1000, showCloseButton: true});
                  }
               })
        }else if (this.loginModel.loginAS=='customer') {
         this.customerService.CustomerForgotPassword(this.loginModel)
              .subscribe((data)=>{
                  console.log(data);
                  if(data.response){
                    this.toastr.success(data.message ,'Account Verification',{toastLife: 1000, showCloseButton: true})
                              this.router.navigate(['/header-two-layout/login']);
                  }else if (data.message=='Unable to send password') {
                     this.toastr.error('Unable to send password' ,'Authentication Failed ',{toastLife: 1000, showCloseButton: true});
                    // code...
                  }else {
                    this.toastr.error( 'Something went wrong please try again' ,'Authentication Failed ',{toastLife: 1000, showCloseButton: true});
                  }
               })
        }else{
          this.toastr.info( 'Please Select Login AS' );
        }
    }
}
