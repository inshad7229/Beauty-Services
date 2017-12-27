import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';

import {SaloonService} from '../../providers/saloon.service'
import {SaloonDetailsModel,AccountCreationModel,VerifiactionModel} from '../../models/saloon.modal';
import {CommonService} from '../../providers/common.service'
import {AppProvider} from '../../providers/app.provider'

declare var $
declare var WOW
@Component({
    selector: 'app-searched-saloon',
    templateUrl: './searched-saloon.component.html',
    styleUrls: ['./searched-saloon.component.scss']
})
export class SearchedSaloonComponent implements OnInit {
	saloonDetailsModel:SaloonDetailsModel=new SaloonDetailsModel();
	accountCreationModel:AccountCreationModel=new AccountCreationModel();
	verifiactionModel:VerifiactionModel=new VerifiactionModel();
	waitLoader
   saloonList
    constructor(public router: Router, 
    	        private saloonServices:SaloonService,
    	        vcr: ViewContainerRef,
    	        private toastr: ToastsManager,
    	        private commonService:CommonService,
    	        private appProvider:AppProvider) {
    	        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
           //alert(this.appProvider.current.serviceSearched)
				$(window).scroll(function() {
			        if ($(this).scrollTop() > 1){  
			            $('header').addClass("sticky");
			        }
			        else{
			            $('header').removeClass("sticky");
			        }
			    });
			var wow = new WOW(
			        {
			            animateClass: 'animated',
			            offset:       100,
			            callback:     function(box) {
			                console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
			            }
			        }
			    );
			    wow.init();
			$(window).load(function() {
			        $(".datetimepicker1");
			    });
			$('.datetimepicker1').datetimepicker({
			        //lang:'ch',
			         //yearOffset:200,       
			        timepicker:false,
			        format:'d-m-Y',
			        formatDate:'d-m-Y',
			        value:'Enter Date',
			        step:10,
			        minDate:'+1d',
			        scrollMonth:false,
			        scrollTime:false,
			        scrollInput:true,
			    });
			var mySlider = $("#rane-slide").slider({
			        'tooltip':'hide'
			    });
			    // Cal l a method on the slider
			    mySlider.on('change',function(){
			        var value = mySlider.slider('getValue');
			        $('.min-range').html('<b>$'+value[0]+'</b>');
			        $('.max-range').html('<b>$'+value[1]+'</b>');
			    });
			    this.getserviceList()
		}

		onContinue(){
	     this.saloonServices.SaloonSignup(this.saloonDetailsModel)
        .subscribe((data)=>{
            console.log(data);
            if(data.response){
              this.toastr.success( data.message ,'Authentication',{toastLife: 3000, showCloseButton: true})
              // setTimeout(()=>{
				          //  //this.router.navigate(['/login']);
              // },3000)
            //	alert(data.message)
            }else if (data.message=='Email not found in database') {
               this.toastr.error('Please insert your register Email' ,'Authentication Failed ',{toastLife: 3000, showCloseButton: true});
              // code...
            }else {
              this.toastr.error( 'Something Went Wrong Please Try Again' ,'Authentication Failed ',{toastLife: 3000, showCloseButton: true});
            }
        })
		}


getserviceList(){
          this.waitLoader=true
        this.commonService.getAllSaloonList()
        .subscribe((data)=>{
            var list=[]
             this.waitLoader=false
            console.log(data);
            if(data.response){
                this.saloonList=data.data
               
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
getClass(name){
   if (this.appProvider.current.serviceSearched==name) {
   	return ''
   }else{
   	return 'relevant-de'
   }
  }
}
