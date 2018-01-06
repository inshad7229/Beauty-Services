import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import {SaloonService} from '../../providers/saloon.service'
import {CustomerService} from '../../providers/customer.service'
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	verifiactionForm:FormGroup
	loginModel
  waitLoader:boolean=false
  private user: SocialUser;
  private loggedIn: boolean;
    constructor(public router: Router, private fb: FormBuilder, 
                private saloonServices:SaloonService,
                vcr: ViewContainerRef,
                private toastr: ToastsManager,
                private customerService:CustomerService,
                private facebook: FacebookService,
                private authService: AuthService,) {
       console.log('Initializing Facebook');

        facebook.init({
          appId: '133126570696425',
          version: 'v2.9'
        });
    	    this.loginModel={}
    	    this.toastr.setRootViewContainerRef(vcr);
    	     this.verifiactionForm = fb.group({
                'email': [null, Validators.compose([Validators.required,Validators.pattern(EMAIL_REGEX)])],
                'password': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
                'loginAS': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
            
        })
        this.loginModel.loginAS='saloon'
    }

    ngOnInit() {
       this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    }

     onLogin(){
       this.waitLoader=true
       if (this.loginModel.loginAS=='saloon') {
               this.saloonServices.SaloonLogin(this.loginModel)
              .subscribe((data)=>{
                this.waitLoader=false
                  console.log(data);
                  if(data.response){
                    this.toastr.success(data.message ,'Account Verification',{toastLife: 1000, showCloseButton: true})
                    localStorage['userdetails']=JSON.stringify(data.data)
                     localStorage['customerdetails']=null
                     localStorage.removeItem('isLoggedin');
                    // setTimeout(()=>{
                             this.router.navigate(['/header-one-layout/home-page']);
                    // },1000)
                  //    alert(data.message)
                  }else if (data.message=='Authentication Failed') {
                     this.toastr.error('Please check your credential and try again' ,'Authentication Failed ',{toastLife: 1000, showCloseButton: true});
                    // code...
                  }else {
                    this.toastr.error( 'Something went wrong please try again' ,'Authentication Failed ',{toastLife: 1000, showCloseButton: true});
                  }
               })
        }else if (this.loginModel.loginAS=='customer') {
         this.customerService.CustomerLogin(this.loginModel)
              .subscribe((data)=>{
                  console.log(data);
                    localStorage['userdetails']=null
                   this.waitLoader=false
                  if(data.response){
                    this.toastr.success(data.message ,'Account Verification',{toastLife: 1000, showCloseButton: true})
                    localStorage['customerdetails']=JSON.stringify(data.data)
                    localStorage.setItem('isLoggedin', 'true');
                             this.router.navigate(['/header-one-layout/home-page']);
                  }else if (data.message=='Authentication Failed') {
                     this.toastr.error('Please check your credential and try again' ,'Authentication Failed ',{toastLife: 1000, showCloseButton: true});
                    // code...
                  }
                  else if (data.message=='Customer not find with this id') {
                     this.toastr.error('Please check your credential and try again' ,'Authentication Failed ',{toastLife: 1000, showCloseButton: true});
                    // code...
                  }else {
                    this.toastr.error( 'Something went wrong please try again' ,'Authentication Failed ',{toastLife: 1000, showCloseButton: true});
                  }
               })
        }else{
          this.waitLoader=false
          this.toastr.info( 'Please Select Login AS' );
        }
       }
   login() {
    this.facebook.login()
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
      })
      .catch(this.handleError);
  }

  signInWithGoogle(): void {
    alert('hy')
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
     alert('hy')
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
  }
  private handleError(error) {
    console.error('Error processing action', error);
  }
}
