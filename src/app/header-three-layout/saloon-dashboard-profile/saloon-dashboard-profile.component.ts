import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import {SaloonService} from '../../providers/saloon.service'
declare var $
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    selector: 'app-saloon-dashboard-profile',
    templateUrl: './saloon-dashboard-profile.component.html',
    styleUrls: ['./saloon-dashboard-profile.component.scss']
})
export class SaloonDashboardProfileComponent implements OnInit {
	userDetail=JSON.parse(localStorage['userdetails'])
    editOne:boolean=false
    editOne2:boolean=false
    accountDetailsForm: FormGroup;
    optionsModel: string[]=this.userDetail.category;
    myOptions: IMultiSelectOption[];
    optionsModel2: string[]=this.userDetail.services;
    myOptions2: IMultiSelectOption[];
    constructor(public router: Router, private fb: FormBuilder, 
                private saloonServices:SaloonService,
                vcr: ViewContainerRef,
                private toastr: ToastsManager) {
          this.toastr.setRootViewContainerRef(vcr);
          this.accountDetailsForm = fb.group({
                'saloonName': [null, Validators.compose([Validators.required,Validators.maxLength(150)])],
                'name': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'email': [null, Validators.compose([Validators.required,Validators.pattern(EMAIL_REGEX)])],
                'contactNumber': [null, Validators.compose([Validators.required,Validators.maxLength(12),Validators.pattern('[0-9]*')])],
                'city': [null, Validators.compose([Validators.required,Validators.maxLength(30)])],
                'selectCategory': [null, Validators.compose([Validators.required])],
                'selectService': [null, Validators.compose([Validators.required])]
            
        }) 
    }

    ngOnInit() {
    	$("#row2").hide();
		$("#row6").hide();
                // $("#show1").click(function(){
                //     $("#row1").hide(600);
                //     $("#row2").show(600);
                // });
		    // $("#show3").click(function(){
		    //     $("#row5").hide(500);
		    //     $("#row6").show(500);
		    // });
        this.myOptions = [
            { id: '1', name: 'Option 1' },
            { id: '2', name: 'Option 2' },
            { id: '3', name: 'Option 3' },
            { id: '4', name: 'Option 4' },
            { id: '5', name: 'Option 5' },
            { id: '6', name: 'Option 6' },
        ];
        this.myOptions2 = [
            { id:'1', name: 'Option 1' },
            { id:'2', name: 'Option 2' },
            { id:'3', name: 'Option 3' },
            { id:'4', name: 'Option 4' },
            { id:'5', name: 'Option 5' },
            { id:'6', name: 'Option 6' },
        ];
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
    		$("#row1").show(600);
		    $("#row2").hide(600);
    }
    onCancelPasswordshow(){
    	this.editOne2=false
        $("#row5").show(500);
		$("#row6").hide(500);
    }
    onUpdateDetails(){

    }
    onChange() {
        console.log(this.optionsModel);
    }

    onChange2() {
        console.log(this.optionsModel2);
    }
}
