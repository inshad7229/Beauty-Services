import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { TranslateService } from '@ngx-translate/core';
import {AddEmployee} from '../../models/employee'
import {SaloonService} from '../../providers/saloon.service'
import {CommonService} from '../../providers/common.service'
import { forkJoin } from "rxjs/observable/forkJoin";
declare var $
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    selector: 'app-add-employee-list',
    templateUrl: './add-employee-list.component.html',
    styleUrls: ['./add-employee-list.component.scss']
})
export class AddEmployeeListComponent implements OnInit {
    userDetail=JSON.parse(localStorage['userdetails'])
	myOptions2: IMultiSelectOption[];
	optionsModel2: number[];
	addEmployeeForm: FormGroup;
    addEmployee:AddEmployee=new AddEmployee()
    waitLoader
    serviceList=[]
    categoryList
   constructor(public router: Router, private fb: FormBuilder,
                vcr: ViewContainerRef,
                private toastr: ToastsManager,
                private translate: TranslateService,
                private saloonServices:SaloonService,
                private commonServices:CommonService){

          this.toastr.setRootViewContainerRef(vcr);
   	  this.addEmployeeForm = fb.group({
                'firstNameEng': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'firstNameArb': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'lastNameEng': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'lastNameArb': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'contactNumber': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
                'email': [null, Validators.compose([Validators.required,Validators.maxLength(100),Validators.pattern(EMAIL_REGEX)])],
                'gender': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'services': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'detailsEng': [null, Validators.compose([Validators.required,Validators.maxLength(1000)])],
                'detailsArb': [null, Validators.compose([Validators.required,Validators.maxLength(1000)])],
                


            
        }) 

   }

    ngOnInit() {
    	 this.myOptions2 = [
            { id:1, name: 'Option 1' },
            { id:2, name: 'Option 2' },
            { id:3, name: 'Option 3' },
            { id:4, name: 'Option 4' },
            { id:5, name: 'Option 5' },
            { id:6, name: 'Option 6' },
        ];
        this.getserviceList()
    }
    onChange2() {
        console.log(this.optionsModel2);
    }

    AddEmployee(){
        this.waitLoader=true
        let a=this.optionsModel2.slice(0)
        this.addEmployee.saloon_id=this.userDetail.id;
        this.addEmployee.services=a.toString()
        this.saloonServices.AddEmployee(this.addEmployee)
        .subscribe((data)=>{
             this.waitLoader=false
            console.log(data);
            if(data.response){
              this.toastr.success(data.message ,'Employee Registration',{toastLife: 1000, showCloseButton: true})
              this.router.navigate(['/header-three-layout/saloon-employee-list']);
            }else if (data.message=='Unable to update Password') {
               this.toastr.error('Unable to update Password' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
              // code...
            }else if (data.message=='email Id already register with same saloon') {
               this.toastr.error('email Id already register with same saloon' ,'Employee Registration Failed',{toastLife: 1000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Employee Registration Failed',{toastLife: 1000, showCloseButton: true});
            }
         })
    }

    getserviceList(){
          this.waitLoader=true
        this.saloonServices.getservicesById(this.userDetail.id)
        .subscribe((data)=>{
            var list=[]
             this.waitLoader=false
            console.log(data);
            if(data.response){
                this.serviceList=data.data
                for (var i = 0; i < this.serviceList.length; ++i) {
                   list.push({id:this.serviceList[i].id,name:this.serviceList[i].service_eng})
                }
                this.myOptions2=list
              // this.toastr.success(data.message ,'Services Added successfully ',{toastLife: 1000, showCloseButton: true})
              // this.router.navigate(['/header-three-layout/service-list']);
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
            this.addEmployee.employee_image= fr.result;
            console.log(this.addEmployee.employee_image)
        };
        fr.readAsDataURL(file);
    }
  idUploadEvent(evt: any) {
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
        // if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') {
        //     return;
        // }
        const fr = new FileReader();
        fr.onloadend = (loadEvent) => {
            this.addEmployee.employee_Ids= fr.result;
            console.log(this.addEmployee.employee_Ids)
        };
        fr.readAsDataURL(file);
    }

      imagePath(path){
        if(path.indexOf('base64')==-1) {
            return 'http://18.216.88.154/public/beauti-service/'+path
            // code...
          }else{
             return  path
          }
    }

   // getCategory(){
   //     this.waitLoader=true
   //     forkJoin([ this.commonServices.getCategory(),  this.commonServices.getServices()])
   //    .subscribe(results => {
   //          var list=[]
   //           this.waitLoader=false
   //          console.log(results);
   //          if(results){
   //              this.categoryList=results[0].data
   //              this.serviceList=results[1].data
   //              for (var i = 0; i < this.serviceList.length; ++i) {
   //                 list.push({id:this.serviceList[i].id,name:this.serviceList[i].category_eng})
   //              }
   //              this.myOptions2=list
   //            // this.toastr.success(data.message ,'Services Added successfully ',{toastLife: 1000, showCloseButton: true})
   //            // this.router.navigate(['/header-three-layout/service-list']);
   //          }
   //       })   
   //  }

}
