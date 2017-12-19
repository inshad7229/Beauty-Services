import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { TranslateService } from '@ngx-translate/core';
import {SaloonService} from '../../providers/saloon.service'
import {AddServices} from '../../models/services'

declare var $
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
	addServicesForm: FormGroup;
	optionsModel: number[];
	myOptions: IMultiSelectOption[];
	addServicesModel:AddServices=new AddServices()
	userDetail=JSON.parse(localStorage['userdetails'])
	waitLoader
	serviceList
    constructor(public router: Router, private fb: FormBuilder,
                vcr: ViewContainerRef,
                private toastr: ToastsManager,
                private translate: TranslateService,
	                private saloonServices:SaloonService){
	          this.toastr.setRootViewContainerRef(vcr);
	             	  this.addServicesForm = fb.group({
	                'category': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
	                'time': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
	                'serviceName_eng': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
	                'serviceName_arb': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
	                'serviceCost_eng': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
	                'serviceCost_arb': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
	                'serviceDes_eng': [null, Validators.compose([Validators.required,Validators.maxLength(500)])],
	                'serviceDes_arb': [null, Validators.compose([Validators.required,Validators.maxLength(500)])],

	                   
	        })
          }

       ngOnInit() {
    	//this.appProvider.current.waitLoader=true
        this.getDetails()

        this.myOptions = [
            { id:1, name: 'Option 1' },
            { id:2, name: 'Option 2' },
            { id:3, name: 'Option 3' },
            { id:4, name: 'Option 4' },
            { id:5, name: 'Option 5' },
            { id:6, name: 'Option 6' },
        ];
    }
  getDetails(){
    this.waitLoader=true
     this.saloonServices.getservicesById(this.userDetail.id)
        .subscribe((data)=>{
              this.waitLoader=false
            if(data.response){
              this.toastr.success('All employee list fetched successfully' ,'Success',{toastLife: 1000, showCloseButton: true})
              this.serviceList=data.data
             // this.router.navigate(['/header-three-layout/saloon-employee-list']);
            }else if (data.message=='Employee not find') {
               this.toastr.error('Employee not find' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Employee Registration Failed',{toastLife: 1000, showCloseButton: true});
            }
         })
  }
     imagePath(path){
        if(path.indexOf('base64')==-1) {
            return 'http://18.216.88.154/public/beauti-service/'+path
            // code...
          }else{
             return  path
          }
    }

	onEdit(data){
	this.optionsModel=[]
     let b=data.category.split(',')
        //console.log('services',data.services)
          for (var i = 0; i < b.length; ++i) {
                 if (+b[i]!=NaN) {
                  this.optionsModel.push(+b[i])
                     // code...
                 }
              // code...
          }
     this.addServicesModel= Object.assign({}, data);
     // let a=Object.create(data);
    
	}
	onview(data){
     this.addServicesModel=data;
	}
  ondelete(data){
     this.addServicesModel=data;
  }
	onChange() {
       console.log(this.optionsModel);
    }

    onUpdate(){
      // console.log(this.addServicesModel)
      // this.addServicesModel=Object.assign(this.addServicesModel);
      this.waitLoader=true
      delete(this.addServicesModel.created_at)
      delete(this.addServicesModel.updated_at)
      delete(this.addServicesModel.status)
        this.saloonServices.updateEmployee(this.addServicesModel)
        .subscribe((data)=>{
              this.waitLoader=false
            if(data.response){
              this.getDetails()
              this.waitLoader=false
              this.toastr.success('Employee details updated successfully' ,'Success',{toastLife: 1000, showCloseButton: true})
             /// this.employeeList=data.data
             // this.router.navigate(['/header-three-layout/saloon-employee-list']);
            }else if (data.message=='Employee not find') {
               this.toastr.error('Employee not find' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Employee Registration Failed',{toastLife: 1000, showCloseButton: true});
            }
         })
    }
    onYes(){
       this.waitLoader=true
       this.saloonServices.deleteEmployeeById(this.addServicesModel.id)
        .subscribe((data)=>{
              this.waitLoader=false
            if(data.response){
              this.getDetails()
              this.toastr.success('Employee deleted successfully' ,'Success',{toastLife: 1000, showCloseButton: true})
              //this.employeeList=data.data
             // this.router.navigate(['/header-three-layout/saloon-employee-list']);
            }else if (data.message=='Employee not find') {
               this.toastr.error('Employee not find' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Employee Registration Failed',{toastLife: 1000, showCloseButton: true});
            }
         })
    }
}
