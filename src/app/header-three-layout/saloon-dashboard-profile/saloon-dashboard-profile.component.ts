import { Component, OnInit,ViewContainerRef ,ElementRef, ViewChild,NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import {SaloonService} from '../../providers/saloon.service'
import { NgxCroppieComponent } from 'ngx-croppie';
import { CroppieOptions } from 'croppie';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
declare var $
declare var google
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    selector: 'app-saloon-dashboard-profile',
    templateUrl: './saloon-dashboard-profile.component.html',
    styleUrls: ['./saloon-dashboard-profile.component.scss']
})
export class SaloonDashboardProfileComponent implements OnInit {
   @ViewChild("search")
    @ViewChild('ngxCroppie') ngxCroppie: NgxCroppieComponent;
    widthPx = '612';
    heightPx = '408';
    imageUrl = ''; 
    currentImageHorigontal: string;
    croppieImageHorigontal: string;
    activeIndex:number
     public get imageToDisplayHorigontal() {
        if (this.currentImageHorigontal) {
            return this.currentImageHorigontal;
        }
        if (this.imageUrl) {
            return this.imageUrl;
        }
        return `http://placehold.it/${300}x${50}`;
    }

    public get croppieOptionsHorigontal(): CroppieOptions {
        const opts: CroppieOptions = {};
        opts.viewport = {
            width: parseInt('612', 10),
            height: parseInt('408', 10)
        };
        opts.boundary = {
            width: parseInt(this.widthPx, 10),
            height: parseInt(this.heightPx, 10)
        };
        opts.enforceBoundary = true;
        return opts;
    }
      public searchElementRef: ElementRef;
	userDetail=JSON.parse(localStorage['userdetails'])
    editOne:boolean=false
    editOne2:boolean=false
    editOne3:boolean=false
    accountDetailsForm: FormGroup;
    passwordForm: FormGroup;
    optionsModel: number[]=[];
    myOptions: IMultiSelectOption[];
    optionsModel2: number[]=[];
    myOptions2: IMultiSelectOption[];
    passwordModel
    profileData
    dataforedit
    message
    tempImag
    waitLoader
    saloonImage=[]
    saloonImage2=[]
    public latitude: number;
    public longitude: number;
    public zoom: number;
    time
    constructor(public router: Router, private fb: FormBuilder, 
                private saloonServices:SaloonService,
                vcr: ViewContainerRef,
                private toastr: ToastsManager,
                private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone) {
        this.passwordModel={}
        this.time={}
        this.tempImag=this.userDetail.image
        // this.userDetail.opening_time=JSON.parse(this.userDetail.opening_time)
        // this.userDetail.closing_time=JSON.parse(this.userDetail.closing_time)
        // this.userDetail.services=this.userDetail.services.split(',')
        // //console.log('services',this.userDetail.services)
        //   for (var i = 0; i < this.userDetail.services.length; ++i) {
        //          if (+this.userDetail.services[i]!=NaN) {
        //           this.optionsModel2.push(+this.userDetail.services[i])
        //              // code...
        //          }
        //       // code...
        //   }

        //   this.userDetail.category=this.userDetail.category.split(',')
        // console.log('services',this.userDetail.category)
        //   for (var j = 0; j < this.userDetail.category.length; ++j) {
        //          if (+this.userDetail.category[j]!=NaN) {
        //           this.optionsModel.push(+this.userDetail.category[j])
        //              // code...
        //          }
        //       // code...
        //   }
          this.toastr.setRootViewContainerRef(vcr);
          this.accountDetailsForm = fb.group({
                'saloonName': [null, Validators.compose([Validators.required,Validators.maxLength(150)])],
                'name': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'email': [null, Validators.compose([Validators.required,Validators.pattern(EMAIL_REGEX)])],
                'contactNumber': [null, Validators.compose([Validators.required,Validators.maxLength(12),Validators.pattern('[0-9]*')])],
                'city': [null, Validators.compose([Validators.required,Validators.maxLength(300)])],
                // 'selectCategory': [null, Validators.compose([Validators.required])],
                // 'selectService': [null, Validators.compose([Validators.required])],
                'time1': [null, Validators.compose([Validators.required])],
                'time2': [null, Validators.compose([Validators.required])]
            
        })

        this.passwordForm = fb.group({
                'currentPassword': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
                'newPassword': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
                'confirmPassword': [null, Validators.compose([Validators.required,Validators.maxLength(12)])],
            
        }) 

        this.accountDetailsForm.controls['email'].disable();
    }

    ngOnInit() {
    $("#row2").hide();
		$("#row6").hide();
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
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
            { id: 3, name: 'Option 3' },
            { id: 4, name: 'Option 4' },
            { id: 5, name: 'Option 5' },
            { id: 6, name: 'Option 6' },
        ];
        this.myOptions2 = [
            { id:1, name: 'Option 1' },
            { id:2, name: 'Option 2' },
            { id:3, name: 'Option 3' },
            { id:4, name: 'Option 4' },
            { id:5, name: 'Option 5' },
            { id:6, name: 'Option 6' },
        ];

         this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
   
    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
         // alert(place.formatted_address)
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          this.userDetail.city=place.formatted_address
          this.userDetail.latitude = place.geometry.location.lat();
          this.userDetail.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    this.getProfileDta()
    }
getLat(lat){
  return parseInt(lat)

}
getLon(long){
 return parseInt(long)
}

     getProfileDta(){
       this.waitLoader=true
          this.saloonServices.getSaloonProfileData(this.userDetail.id)
          .subscribe((data)=>{
            this.waitLoader=false
              console.log(data);
              if(data.response){
                this.profileData=data.data[0]
                this.saloonImage=data.data[0].SaloonImages
               this.toastr.success(data.message ,'Image updated',{toastLife: 1000, showCloseButton: true})
             }else {
                this.toastr.error( 'Something Went Wrong Please Try Again' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
              }
           })
  }

    private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }


getHours(value){
  let value2=value.split(':')
  let value3=parseInt(value2[0])
  if (value3>12) {
    var a=value3-12;
    return '0'+a
  }else{
   if (value3<10) {
    return '0'+value3
   }else{
     return value3
   } 
  }

}
getMin(value){
    let value2=value.split(':')
  let value3=parseInt(value2[1])
  if (value3<10) {
    return '0'+value3
   }else{
     return value3
   }
}
getAmPm(value){
   let value2=value.split(':')
  let value3=parseInt(value2[0])
  if (value3>11) {
    return 'Pm'
   }else{
     return 'Am'
   }
}
    onClickDetailsEdit(){
    	if (this.editOne==false) {
	    	$("#row1").hide(600);
		    $("#row2").show(600);
    		this.editOne=true
        this.dataforedit=this.profileData
         let value2=this.dataforedit.opening_time.split(':')
         let value3=this.dataforedit.closing_time.split(':')
        this.time.opening_time={
          hour:parseInt(value2[0]),
          minute:parseInt(value2[1])
        }
        this.time.closing_time={
          hour:parseInt(value3[0]),
          minute:parseInt(value3[1])
        }
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
        this.userDetail.image=this.tempImag
    		$("#row1").show(600);
		    $("#row2").hide(600);
    }
    onCancelPasswordshow(){
    	this.editOne2=false
        $("#row5").show(500);
		$("#row6").hide(500);
    }

    onImage(){

    }
    onUpdateDetails(){
         let a=this.optionsModel2.slice(0)
         let b=this.optionsModel.slice(0)
         this.dataforedit.saloonId=this.userDetail.id
         this.dataforedit.services=a.toString()
         this.dataforedit.category=b.toString()
         this.dataforedit.opening_time=this.time.opening_time.hour+':'+this.time.opening_time.minute
         this.dataforedit.closing_time=this.time.closing_time.hour+':'+this.time.closing_time.minute
         delete(this.dataforedit.created_at)
         delete(this.dataforedit.updated_at)
         delete(this.dataforedit.id)
         this.saloonServices.SaloonProfileUpdate(this.dataforedit)
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
              this.toastr.success(data.message ,'Saloon',{toastLife: 3000, showCloseButton: true})
                this.editOne=false
                $("#row1").show(600);
                $("#row2").hide(600);
                this.getProfileDta()
        //         localStorage['userdetails']=JSON.stringify(data.data)
        //         this.userDetail=JSON.parse(localStorage['userdetails'])
        //         this.userDetail.services=this.userDetail.services.split(',')
        //         this.tempImag=this.userDetail.image
        //         this.userDetail.opening_time=JSON.parse(this.userDetail.opening_time)
        //         this.userDetail.closing_time=JSON.parse(this.userDetail.closing_time)
        // //console.log('services',this.userDetail.services)
        // this.optionsModel2=[]
        //   for (var i = 0; i < this.userDetail.services.length; ++i) {
        //          if (+this.userDetail.services[i]!=NaN) {
        //           this.optionsModel2.push(+this.userDetail.services[i])
        //              // code...
        //          }
        //       // code...
        //   }
        //   this.optionsModel=[]
        //   this.userDetail.category=this.userDetail.category.split(',')
        // console.log('services',this.userDetail.category)
        //   for (var j = 0; j < this.userDetail.category.length; ++j) {
        //          if (+this.userDetail.category[j]!=NaN) {
        //           this.optionsModel.push(+this.userDetail.category[j])
        //              // code...
        //          }
        //       // code...
        //   }
              // setTimeout(()=>{
                // this.router.navigate(['/header-two-layout/login']);
              // },3000)
            //    alert(data.message)
            }else if (data.message=='Unable to update saloon') {
               this.toastr.error('Unable to update saloon' ,'Updation Failed ',{toastLife: 3000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Updation Failed ',{toastLife: 3000, showCloseButton: true});
            }
         })
    }

    onUpdatePass(){
        this.passwordModel.saloonId=this.userDetail.id
        this.saloonServices.SaloonPasswordUpdate(this.passwordModel)
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
              this.toastr.success(data.message ,'Password Update',{toastLife: 1000, showCloseButton: true})
              this.editOne2=false
                $("#row5").show(500);
                $("#row6").hide(500);
            }else if (data.message=='Unable to update Password') {
               this.toastr.error('Unable to update Password' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
              // code...
            }else if (data.message=='current password is incorrect') {
               this.toastr.error('current password is incorrect' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
            }
         })
    }
    onChange() {
        console.log(this.optionsModel);
    }

    onChange2() {
        console.log(this.optionsModel2);
    }

    confirm(){
        if (this.passwordModel.newPassword ==this.passwordModel.confirmPassword) {
            this.message=false;
          }
          else{
            this.message=true;
          }
        }
      pass_confirm(){
        if (this.passwordModel.confirmPassword) {
        // code...
          if (this.passwordModel.newPassword ==this.passwordModel.confirmPassword) {
             this.message=false;
          }
          else{
             this.message=true;
          }
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
            this.userDetail.image= fr.result;
            console.log(this.userDetail.image)
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

    onAddOneMoreImage(){
      if (this.saloonImage.length<7) {
          this.saloonImage.push({id:null,saloon_id:this.userDetail.id,image:null})
      }
    }

    onRemoveImage(i,imagedata){

    }

  onMultipalImageUpload(evt: any,i){
    //alert(i)
    this.activeIndex=i
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
            //this.saloonImage[i].image= fr.result;
            this.croppieImageHorigontal=fr.result
            //console.log(this.saloonImage[i].image)
            
        };
        fr.readAsDataURL(file);
        
  }
  OnEditImage(i){
    let a={
      id:this.saloonImage[i].id,
      saloon_id:this.saloonImage[i].saloon_id,
      image:this.saloonImage[i].image
    }
        this.passwordModel.saloonId=this.userDetail.id
        this.saloonServices.SaloonImageEdit(a)
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
             this.toastr.success(data.message ,'Image updated',{toastLife: 1000, showCloseButton: true})
           }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
            }
         })
  }
  onUploadImage(i){
         let a={
            saloon_id:this.saloonImage[i].saloon_id,
            image:this.saloonImage[i].image
          }
        this.saloonServices.SaloonImageUpload(a)
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
             this.saloonImage[i].id=data.data.id
             this.saloonImage[i].image=data.data.image
             this.toastr.success(data.message ,'Image uploaded',{toastLife: 1000, showCloseButton: true})
           }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Updation Failed',{toastLife: 1000, showCloseButton: true});
            }
         })
  }

      newImageResultFromCroppieHorigontal(img: string) {
        this.croppieImageHorigontal = img;
        console.log(this.croppieImageHorigontal)
    }

    saveImageFromCroppieHorigontal() {
        this.currentImageHorigontal = this.croppieImageHorigontal;
        if (this.currentImageHorigontal) {
          this.saloonImage[this.activeIndex].image=this.currentImageHorigontal
           if (this.saloonImage[this.activeIndex].id) {
             this.OnEditImage(this.activeIndex)
             this.croppieImageHorigontal = '';
             this.currentImageHorigontal = ''
            }else if (!this.saloonImage[this.activeIndex].id) {
             this.onUploadImage(this.activeIndex)
              this.croppieImageHorigontal = '';
              this.currentImageHorigontal = ''
            }
        }
    }

    cancelCroppieEditHorigontal() {
       
        this.croppieImageHorigontal = '';
        this.currentImageHorigontal = ''
    }

    // imageUploadEventHorigontal(evt: any) {
    //     if (!evt.target) {
    //         return;
    //     }
    //     if (!evt.target.files) {
    //         return;
    //     }
    //     if (evt.target.files.length !== 1) {
    //         return;
    //     }
    //     const file = evt.target.files[0];
    //     if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') {
    //         return;
    //     }
    //     const fr = new FileReader();
    //     fr.onloadend = (loadEvent) => {
    //         this.croppieImageHorigontal = fr.result;
    //     };
    //     fr.readAsDataURL(file);
    // }
}
