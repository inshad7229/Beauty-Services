import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { TranslateService } from '@ngx-translate/core';
import {SaloonService} from '../../providers/saloon.service'
import {CommonService} from '../../providers/common.service'
import {AddServices} from '../../models/services'
import { forkJoin } from "rxjs/observable/forkJoin";

declare var $
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    selector: 'app-add-service',
    templateUrl: './add-service.component.html',
    styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
		addServicesForm: FormGroup;
		optionsModel: number[];
		myOptions: IMultiSelectOption[];
        addServicesModel:AddServices=new AddServices()
        userDetail=JSON.parse(localStorage['userdetails'])
        waitLoader
        categoryList=[];
        serviceList=[]
    constructor(public router: Router, private fb: FormBuilder,
                vcr: ViewContainerRef,
                private toastr: ToastsManager,
                private translate: TranslateService,
                private saloonServices:SaloonService,
                private commonServices:CommonService){
          this.toastr.setRootViewContainerRef(vcr);
             	  this.addServicesForm = fb.group({
                'category': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'time': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'serviceName_eng': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                //'serviceName_arb': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'serviceCost_eng': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'serviceCost_arb': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'serviceDes_eng': [null, Validators.compose([Validators.required,Validators.maxLength(500)])],
                'serviceDes_arb': [null, Validators.compose([Validators.required,Validators.maxLength(500)])],

                   
        })
      }

    ngOnInit() {
    	 this.myOptions = [
            { id:1, name: 'Option 1' },
            { id:2, name: 'Option 2' },
            { id:3, name: 'Option 3' },
            { id:4, name: 'Option 4' },
            { id:5, name: 'Option 5' },
            { id:6, name: 'Option 6' },
        ];
        this.getCategory()
    }
     onChange() {
        console.log(this.optionsModel);
    }
    getCategory(){
       this.waitLoader=true
       forkJoin([ this.commonServices.getCategory(),  this.commonServices.getServices()])
      .subscribe(results => {
            var list=[]
             this.waitLoader=false
            console.log(results);
            if(results){
                this.categoryList=results[0].data
                this.serviceList=results[1].data
                for (var i = 0; i < this.categoryList.length; ++i) {
                   list.push({id:this.categoryList[i].id,name:this.categoryList[i].category_eng})
                }
                this.myOptions=list
              // this.toastr.success(data.message ,'Services Added successfully ',{toastLife: 1000, showCloseButton: true})
              // this.router.navigate(['/header-three-layout/service-list']);
            }
         })   
    }
    onAddService(){
        this.waitLoader=true
        //let a=this.optionsModel.slice(0)
        this.addServicesModel.saloon_id=this.userDetail.id;
        //this.addServicesModel.category=a.toString()
        this.saloonServices.Addservices(this.addServicesModel)
        .subscribe((data)=>{
             this.waitLoader=false
            console.log(data);
            if(data.response){
              this.toastr.success(data.message ,'Services Added successfully ',{toastLife: 1000, showCloseButton: true})
              this.router.navigate(['/header-three-layout/service-list']);
            }else if (data.message=='This Services already added with same saloon') {
               this.toastr.error('This Services already added with same saloon' ,'Failed',{toastLife: 1000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Failed',{toastLife: 1000, showCloseButton: true});
            }
         })
    }

    getServiceOption(){
      if (this.addServicesModel.category_id) {
        // code...
        let data=this.serviceList.filter(arg=>arg.category_id==this.addServicesModel.category_id)
        return data
      }else{
        return []
      }
    }
}
