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
  saloonServiceList
  categoryList=[]
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
    	//this.appProvider.current.waitLoader=true
        this.getDetails()
        this.getCategory()

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
              this.toastr.success('All service list fetched successfully' ,'Success',{toastLife: 1000, showCloseButton: true})
              this.saloonServiceList=data.data
             // this.router.navigate(['/header-three-layout/saloon-employee-list']);
            }else if (data.message=='Employee not find') {
               this.toastr.error('Employee not find' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Employee Registration Failed',{toastLife: 1000, showCloseButton: true});
            }
         })
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
     imagePath(path){
        if(path.indexOf('base64')==-1) {
            return 'http://18.218.25.253/public/beauty-service/'+path
            // code...
          }else{
             return  path
          }
    }

	onEdit(data){
	// this.optionsModel=[]
 //     let b=data.category.split(',')
 //        //console.log('services',data.services)map(function (img) { return img.title; })
 //          for (var i = 0; i < b.length; ++i) {
 //                 if (+b[i]!=NaN) {

 //                   if (this.categoryList.map(function (img){return img.id}).indexOf(+b[i])!=-1) {
 //                      this.optionsModel.push(+b[i])
 //                     // code...
 //                   }
 //                     // code...
 //                 }
 //              // code...
 //          }
     this.addServicesModel= Object.assign({}, data);
     console.log(this.addServicesModel)
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
      //let a=this.optionsModel.slice(0)
     // this.addServicesModel.category=a.toString()
        this.saloonServices.updateservices(this.addServicesModel)
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
       this.saloonServices.deleteservicesById(this.addServicesModel.id)
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

    getCategoryName(a){
      let data =this.categoryList.filter(arg=>arg.id==a)
      if(data.length>0){
        return data[0].category_eng;
      }
    }

    getServiceName(ser_id){
      let data=this.serviceList.filter(arg=>arg.id==ser_id)
      if (data.length>0) {
      return data[0].services_eng
        // code...
      }
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

getServicweNameEng(ser_id){
  let data=this.serviceList.filter(arg=>arg.id==ser_id)
      if (data.length>0) {
      return data[0].services_eng
        // code...
      }
}
getServicweNameArb(ser_id){
  let data=this.serviceList.filter(arg=>arg.id==ser_id)
      if (data.length>0) {
      return data[0].services_arb
        // code...
      }
}

getTime(time){
  let a
  switch (time) {
    case "15":
      a='15 Min'
      //alert(a)
      return a;
    case "30":
      a='30 Min'
    return a;
    case "45":
      a='45 Min'
    return a;
    case "60":
      a='1 Hr'
    return a;
    case "75":
      a='1 Hr 15 Min'
    return a;
    case "90":
      a='1 Hr 30 Min'
    return a;
    case "105":
      a='1 Hr 45 Min'
    return a;
    case "120":
      a='2 Hr'
    return a;
    case "135":
      a='2 Hr 15 Mi'
    return a;
    case "150":
      a='2 Hr 30 Min'
    return a;
     case "165":
      a='2 Hr 45 Min'
     return a;
    case "180":
      a='3 Hr' 
     return a; 
    default:
      0;
// alert(a)
     return a
  }
 }
}
