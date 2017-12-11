import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import {SaloonService} from '../../providers/saloon.service'
import {SaloonDetailsModel,AccountCreationModel,VerifiactionModel} from '../../models/saloon.modal';
declare var $
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
@Component({
    selector: 'app-saloon-signup',
    templateUrl: './saloon-signup.component.html',
    styleUrls: ['./saloon-signup.component.scss']
})
export class SaloonSignupComponent implements OnInit {
        accountCreationForm: FormGroup;
        verifiactionForm:FormGroup
        saloonDetailsForm:FormGroup
        saloonDetailsModel:SaloonDetailsModel=new SaloonDetailsModel();
        accountCreationModel:AccountCreationModel=new AccountCreationModel();
        verifiactionModel:VerifiactionModel=new VerifiactionModel();
        optionsModel: number[];
        myOptions: IMultiSelectOption[];
        optionsModel2: number[];
        myOptions2: IMultiSelectOption[];
        currentTab:string='tab1'
        message:boolean=false
        otpStatus:boolean=true
        currentData
        tab1:string='active'
        tab2:string=''
        tab3:string=''

    constructor(public router: Router, private fb: FormBuilder, 
                private saloonServices:SaloonService,
                vcr: ViewContainerRef,
                private toastr: ToastsManager)
                 {

            this.toastr.setRootViewContainerRef(vcr); 
            this.accountCreationForm = fb.group({
                'saloonName': [null, Validators.compose([Validators.required,Validators.maxLength(150)])],
                'name': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'email': [null, Validators.compose([Validators.required,Validators.pattern(EMAIL_REGEX)])],
                'contactNumber': [null, Validators.compose([Validators.required,Validators.maxLength(12),Validators.pattern('[0-9]*')])],
                'password': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
                'confirmPassword': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
                'city': [null, Validators.compose([Validators.required,Validators.maxLength(30)])],
                'termCondition': [null, Validators.compose([Validators.required])]
            
        }) 
       this.verifiactionForm = fb.group({
            'otp': [null, Validators.compose([Validators.required])]
            
        }) 
       this.saloonDetailsForm = fb.group({
            'selectCategory': [null, Validators.compose([Validators.required])],
            'selectService': [null, Validators.compose([Validators.required])]
            
        }) 
    }
     ngOnInit() {
        this.myOptions = [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
            { id: 3, name: 'Option 3' },
            { id: 4, name: 'Option 4' },
            { id: 5, name: 'Option 5' },
            { id: 6, name: 'Option 6' },
        ];
        this.myOptions2 = [
            { id:1, name: 'Option 1' },
            { id:2, name: 'Option 2' },
            { id:3, name: 'Option 3' },
            { id:4, name: 'Option 4' },
            { id:5, name: 'Option 5' },
            { id:6, name: 'Option 6' },
        ];
    }
    onChange() {
        console.log(this.optionsModel);
    }

    onChange2() {
        console.log(this.optionsModel2);
    }

     confirm(){
        if (this.accountCreationModel.password ==this.accountCreationModel.confirmPassword) {
            this.message=false;
          }
          else{
            this.message=true;
          }
        }
      pass_confirm(){
        if (this.accountCreationModel.confirmPassword) {
        // code...
          if (this.accountCreationModel.password ==this.accountCreationModel.confirmPassword) {
             this.message=false;
          }
          else{
             this.message=true;
          }
        }

      }
    onContinue(){
         this.saloonServices.SaloonSignup(this.accountCreationModel)
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
              this.currentData=data
              this.currentTab='tab2'
               this.tab1=''
               this.tab2='active'
               this.tab3=''
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
            this.saloonDetailsModel.image= fr.result;
            console.log(this.saloonDetailsModel.image)
        };
        fr.readAsDataURL(file);
    }

    onSubmit(){
            let a=this.optionsModel2.slice(0)
            let b=this.optionsModel.slice(0)
           this.saloonDetailsModel.saloonId=this.currentData.result.id
           this.saloonDetailsModel.services=a.toString()
           this.saloonDetailsModel.category=b.toString()
         this.saloonServices.SaloonUpdate(this.saloonDetailsModel)
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
              this.toastr.success(data.message ,'Account Craetion',{toastLife: 3000, showCloseButton: true})
              // setTimeout(()=>{
                 this.router.navigate(['/header-two-layout/login']);
              // },3000)
            //    alert(data.message)
            }else if (data.message=='email Id already register with us') {
               this.toastr.error('Email Id already register with us' ,'Authentication Failed ',{toastLife: 3000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Authentication Failed ',{toastLife: 3000, showCloseButton: true});
            }
         })
        }

        onVerifyOtp(){
         if (this.verifiactionModel.otp==this.currentData.otp) {
            this.currentTab='tab3'
            this.tab1=''
            this.tab2=''
            this.tab3='active'
         }else{
            this.toastr.error( 'Enter currect OTP ' ,'Authentication Failed ',{toastLife: 3000, showCloseButton: true});
         }
        }
}
