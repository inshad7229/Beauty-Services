import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ContactUs } from '../../models/contact-us.model.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonService } from '../../providers/common.service';
import { ToastsManager , Toast} from 'ng2-toastr';
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
	contactUsForm:FormGroup
	contactUsModel: ContactUs = new ContactUs ();
	waitLoader:boolean=false
  constructor(private commonService:CommonService,private fb: FormBuilder,vcr: ViewContainerRef,private toastr: ToastsManager) {
  	this.contactUsForm=fb.group({
  		'first_name': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
	    'last_name': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
	    'email': [null, Validators.compose([Validators.required,Validators.pattern(EMAIL_REGEX)])],
	    'message':[null, Validators.compose([Validators.required,Validators.maxLength(100)])]
  	})
  	this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  }


  onSendMessage(){
  	this.waitLoader=true;
  	this.commonService.contactUs(this.contactUsModel).subscribe(data=>{
  		if (data.response==true) {
  			this.waitLoader=false
  			this.contactUsForm.reset();
  			this.toastr.success(data.message ,'Contact Us',{toastLife: 1000, showCloseButton: true})
  		}
  	},err=>{
  		this.toastr.error("something went wrong" ,'Contact Us',{toastLife: 1000, showCloseButton: true})
  	})
  }

}
