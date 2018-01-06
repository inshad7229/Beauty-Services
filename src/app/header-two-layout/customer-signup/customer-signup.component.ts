import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {CustomerSignUpModel} from '../../models/customer.modal';
import {CustomerService} from '../../providers/customer.service'
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    selector: 'app-customer-signup',
    templateUrl: './customer-signup.component.html',
    styleUrls: ['./customer-signup.component.scss']
})
export class CustomerSignupComponent implements OnInit {
	customerSignupForm:FormGroup
	OtpForm:FormGroup
	customerSignUpModel:CustomerSignUpModel=new CustomerSignUpModel()
	currentTab:string='tab1'
    tab1:string='active'
    tab2:string=''
    currentData
    otp
    waitLoader:boolean=false
    constructor(public router: Router, private fb: FormBuilder,
                vcr: ViewContainerRef,
                private toastr: ToastsManager,
                private customerService:CustomerService,
                private translate: TranslateService) {
    	        this.toastr.setRootViewContainerRef(vcr);
    	        this.customerSignupForm = fb.group({
	                'first_name': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
	                'last_name': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
	                'email': [null, Validators.compose([Validators.required,Validators.pattern(EMAIL_REGEX)])],
	                'contact_number': [null, Validators.compose([Validators.required,Validators.maxLength(12),Validators.pattern('[0-9]*')])],
	                'password': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
	                'gender': [null, Validators.compose([Validators.required,Validators.maxLength(30)])],
	                'city': [null, Validators.compose([Validators.required,Validators.maxLength(30)])],
	                'termCondition': [false, Validators.compose([Validators.required])]
	            })
	            this.OtpForm = fb.group({
	                'otp': [null, Validators.compose([Validators.required,Validators.maxLength(8)])]
	            })
    }

    ngOnInit() {}

    onContinue(){
      this.waitLoader=true
    	 this.customerService.CustomerSignup(this.customerSignUpModel)
        .subscribe((data)=>{
            this.waitLoader=false
            if(data.response){
              this.currentData=data
              this.currentTab='tab2'
               this.tab1=''
               this.tab2='active'
               this.toastr.success(data.message ,'Account Craetion',{toastLife: 1000, showCloseButton: true})
              // setTimeout(()=>{
                          //  //this.router.navigate(['/login']);
              // },1000)
            //    alert(data.message)
            }else if (data.message=='email Id already register with us') {
               this.toastr.error('Email Id already register with us' ,'Authentication Failed ',{toastLife: 1000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Authentication Failed ',{toastLife: 1000, showCloseButton: true});
            }
         })
    }
    onVerify(){
    	if (this.otp==this.currentData.otp) {
             this.router.navigate(['/header-two-layout/login']);
         }else{
            this.toastr.error( 'Enter currect OTP ' ,'Authentication Failed ',{toastLife: 3000, showCloseButton: true});
         }
    }
    //routerLink="/header-four-layout/customer-profile"
}
