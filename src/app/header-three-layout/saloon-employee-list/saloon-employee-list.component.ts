import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { TranslateService } from '@ngx-translate/core';
import {AddEmployee} from '../../models/employee'
import {SaloonService} from '../../providers/saloon.service'
import {AppProvider} from '../../providers/app.provider'
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    selector: 'app-saloon-employee-list',
    templateUrl: './saloon-employee-list.component.html',
    styleUrls: ['./saloon-employee-list.component.scss']
})
export class SaloonEmployeeListComponent implements OnInit {
	userDetail=JSON.parse(localStorage['userdetails'])
	employeeList
	optionsModel2: number[]=[];
	myOptions2: IMultiSelectOption[];
	services
	addEmployee:AddEmployee=new AddEmployee()
	updateEmployeeForm: FormGroup;
left:number=1
middle:number=2
right:number=3
activeLeft:string='active'
activeMiddle:string=''
activeRigth:string=''
waitLoader
serviceList
    constructor(public router: Router, private fb: FormBuilder,
                vcr: ViewContainerRef,
                private toastr: ToastsManager,
                private translate: TranslateService,
                private saloonServices:SaloonService,
                private appProvider:AppProvider) {
    	this.toastr.setRootViewContainerRef(vcr);

    	 this.updateEmployeeForm = fb.group({
                'firstNameEng': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'firstNameArb': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'lastNameEng': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'lastNameArb': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'contactNumber': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
                'email': [null, Validators.compose([Validators.required,Validators.maxLength(100),Validators.pattern(EMAIL_REGEX)])],
                'gender': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'services': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'detailsEng': [null, Validators.compose([Validators.required,Validators.maxLength(1000)])],
                'detailsArb': [null, Validators.compose([Validators.required,Validators.maxLength(1000)])]
                


            
        })

    this.updateEmployeeForm.controls['email'].disable();
    }

    ngOnInit() {
    	//this.appProvider.current.waitLoader=true
        this.getDetails()
        this.getserviceList()
        this.myOptions2 = [
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
     this.saloonServices.getEmployeeById(this.userDetail.id)
        .subscribe((data)=>{
              this.waitLoader=false
            if(data.response){
              this.toastr.success('All employee list fetched successfully' ,'Success',{toastLife: 1000, showCloseButton: true})
              this.employeeList=data.data
             // this.router.navigate(['/header-three-layout/saloon-employee-list']);
            }else if (data.message=='Employee not find') {
               this.toastr.error('Employee not find' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
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
                   list.push({id:this.serviceList[i].servicesData.id,name:this.serviceList[i].servicesData.services_eng})
                }
                this.myOptions2=list
              // this.toastr.success(data.message ,'Services Added successfully ',{toastLife: 1000, showCloseButton: true})
              // this.router.navigate(['/header-three-layout/service-list']);
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
	this.optionsModel2=[]
     let b=data.services.split(',')
        //console.log('services',data.services)
          for (var i = 0; i < b.length; ++i) {
                 if (+b[i]!=NaN) {

                    if (this.serviceList.map(function (img){return img.servicesData.id}).indexOf(+b[i])!=-1) {
                       this.optionsModel2.push(+b[i])
                     // code...
                   }
                 
                     // code...
                 }
              // code...
          }
     this.addEmployee= Object.assign({}, data);
     // let a=Object.create(data);
    
	}
	onview(data){
     this.addEmployee=data;
	}
  ondelete(data){
     this.addEmployee=data;
  }
	onChange2() {
       // console.log(this.optionsModel2);
    }

    onUpdate(){
      // console.log(this.addEmployee)
      // this.addEmployee=Object.assign(this.addEmployee);
      this.waitLoader=true
      delete(this.addEmployee.created_at)
      delete(this.addEmployee.updated_at)
      delete(this.addEmployee.status)
      let a=this.optionsModel2.slice(0)
      this.addEmployee.services=a.toString()
        this.saloonServices.updateEmployee(this.addEmployee)
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
       this.saloonServices.deleteEmployeeById(this.addEmployee.id)
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


  getServiceName(a){
      let data =this.serviceList.filter(arg=>arg.servicesData.id==a)
      if(data.length>0){
        return data[0].servicesData.services_eng;
      }
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
    ////////////////////////////pagination bloc////////////////
// onPrevious(){
// this.activeLeft=""
// this.activeMiddle=""
// this.activeRigth=""
//  if (this.left>3) {
//    this.left=this.left-3
//    this.middle=this.middle-3
//    this.right=this.right-3
//  }
// }
// onLeft(){
// this.activeLeft="active"
// this.activeMiddle=""
// this.activeRigth=""

// }
// onMiddle(){
// this.activeLeft=""
// this.activeMiddle="active"
// this.activeRigth=""
// }
// onRigth(){
// this.activeLeft=""
// this.activeMiddle=""
// this.activeRigth="active"
// }

// onNext(){
// this.activeLeft=""
// this.activeMiddle=""
// this.activeRigth=""
//  this.left=this.left+3
//    this.middle=this.middle+3
//    this.right=this.right+3
// }
}
