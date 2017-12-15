import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { TranslateService } from '@ngx-translate/core';
import {AddEmployee} from '../../models/employee'
import {SaloonService} from '../../providers/saloon.service'
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
   constructor(public router: Router, private fb: FormBuilder,
                vcr: ViewContainerRef,
                private toastr: ToastsManager,
                private translate: TranslateService,
                private saloonServices:SaloonService){

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
                'employeeId': [null, Validators.compose([Validators.required])],
                


            
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

}
