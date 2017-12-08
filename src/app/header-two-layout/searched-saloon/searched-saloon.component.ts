import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';

import {SaloonService} from '../../providers/saloon.service'
import {SaloonDetailsModel,AccountCreationModel,VerifiactionModel} from '../../models/saloon.modal';

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
    constructor(public router: Router, 
    	        private saloonServices:SaloonService,
    	        vcr: ViewContainerRef,
    	        private toastr: ToastsManager) {
    	        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {

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
}
