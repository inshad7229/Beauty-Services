import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import {SaloonService} from '../../providers/saloon.service'
import {AppProvider} from '../../providers/app.provider'

@Component({
  selector: 'app-add-service-request',
  templateUrl: './add-service-request.component.html',
  styleUrls: ['./add-service-request.component.scss']
})
export class AddServiceRequestComponent implements OnInit {
	userDetail=JSON.parse(localStorage['userdetails'])

	image;
	image_of_service;
	myOptions2: IMultiSelectOption[];
	complexForm: FormGroup;
	category;
	categoryList;
	selectedCat;
	services_eng;
	services_arb;
	catid;
	saloon_id;
	servicesData;

  constructor(public router: Router,private formBuilder:FormBuilder,
  	private saloonServices:SaloonService,private appProvider:AppProvider) 
  {
         this.complexForm = this.formBuilder.group({
        'services_eng': [null, Validators.compose([Validators.required,Validators.pattern('^[^ ]+[a-zA-Z0-9 ]*')])],
        'services_arb': [null, Validators.compose([Validators.required,Validators.pattern('^[^ ]+[a-zA-Z0-9 ]*')])],
        'catid': [null, Validators.compose([Validators.required])]
      })
  }

  ngOnInit() {
  	this.image=false;
  	this.catList();  	
  }  

    catList(){
        this.saloonServices.catList()
        .subscribe((data)=>{
            console.log(data);
            if(data.response==true){
                this.categoryList=data.data
            }
         }) 
    }

    addServices() {
    if(this.image_of_service!=null && this.image_of_service!=''){
    	this.servicesData={
	        	category_id:this.selectedCat,
	            services_eng:this.services_eng,
	            services_arb:this.services_arb,
	            saloon_id:this.userDetail.id,
	            image:this.image_of_service
	        }
	        console.log(this.servicesData)
	        this.saloonServices.addServices(this.servicesData).subscribe(data=>{
	            this.ngOnInit();
	            if(data.response==true){
	            	this.complexForm.reset();
	             }
	            console.log(data);
	         },err=>{
	            console.log(err);
	        }) 
    }else{	
	        this.servicesData={
	        	category_id:this.selectedCat,
	            services_eng:this.services_eng,
	            services_arb:this.services_arb,
	            saloon_id:this.userDetail.id
	        }
	        console.log(this.servicesData)
	        this.saloonServices.addServices(this.servicesData).subscribe(data=>{
	            this.ngOnInit();
	            if(data.response==true){
	            	this.complexForm.reset();
	             }
	            console.log(data);
	         },err=>{
	            console.log(err);
	        }) 
        }   
     }


  imageUploadEvent(evt: any) {
  	console.log("working")
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
            //this.addEmployee.employee_image= fr.result;
            this.image=true;
            this.image_of_service= fr.result;

            //console.log(this.addEmployee.employee_image)
        };
        fr.readAsDataURL(file);
    }

    cancel(){
    	this.complexForm.reset();
    }

    imagePath(path){
        if(path.indexOf('base64')==-1) {
            return 'http://18.221.208.210/public/beauty-service/'+path
            
          }else{
             return  path
          }
    }

}
