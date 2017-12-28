import { Component, OnInit,ViewContainerRef ,ViewChild} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import {OwlCarousel} from 'ngx-owl-carousel';

import {SaloonService} from '../../providers/saloon.service'

import {CommonService} from '../../providers/common.service'
import {AppProvider} from '../../providers/app.provider'
declare var $
declare var WOW
@Component({
    selector: 'app-saloon-details',
    templateUrl: './saloon-details.component.html',
    styleUrls: ['./saloon-details.component.scss']
})
export class SaloonDetailsComponent implements OnInit {
    @ViewChild('owlElement') owlElement: OwlCarousel
	id
	waitLoader
	saloonData
    constructor(public router: Router, 
    	        private saloonServices:SaloonService,
    	        vcr: ViewContainerRef,
    	        private toastr: ToastsManager,
    	        private commonService:CommonService,
    	        private appProvider:AppProvider,
    	        private route: ActivatedRoute,) {
    	        this.toastr.setRootViewContainerRef(vcr);
    	this.id = +this.route.snapshot.paramMap.get('id');
    	alert(this.id)
        this.getSaloonData()
    }
   fun() {
     this.owlElement.next([200])
     //duration 200ms
   }
    ngOnInit() {
    	  // 	$(window).scroll(function() {
			    //     if ($(this).scrollTop() > 1){  
			    //         $('header').addClass("sticky");
			    //     }
			    //     else{
			    //         $('header').removeClass("sticky");
			    //     }
			    // });
			// $(document).ready(function() {
         
           
             
            // Custom Navigation Events
         
        // });


			 $('.sub-menulist').hide();
             $('.timing-ul').hide();
        // $(document).on('click','.service-listwrap  a',function(){
        //     $(this).toggleClass('active');
        //     $(this).next('.sub-menulist').slideToggle('500');
        //     $(this).find('i').toggleClass('fa-angle-up fa-angle-down')
        // });
        // $('.timing-ul').hide();
        // $(document).on('click','#opening',function(){
        //     $(this).next('.timing-ul').slideToggle('500');
        //     $(this).find('i').toggleClass('fa-plus-circle fa-minus-circle')
        // });
			// $(window).load(function() {
			//         $(".datetimepicker1");
			//     });
			// $('.datetimepicker1').datetimepicker({
			//         //lang:'ch',
			//          //yearOffset:200,       
			//         timepicker:false,
			//         format:'d-m-Y',
			//         formatDate:'d-m-Y',
			//         value:'Enter Date',
			//         step:10,
			//         minDate:'+1d',
			//         scrollMonth:false,
			//         scrollTime:false,
			//         scrollInput:true,
			//     });
			// var mySlider = $("#rane-slide").slider({
			//         'tooltip':'hide'
			//     });
			    // Cal l a method on the slider
			    // mySlider.on('change',function(){
			    //     var value = mySlider.slider('getValue');
			    //     $('.min-range').html('<b>$'+value[0]+'</b>');
			    //     $('.max-range').html('<b>$'+value[1]+'</b>');
			    // })
			    this.getSaloonData()
    }

    getSaloonData(){
    	 this.waitLoader=true
        this.commonService.getAllSaloonData(this.id)
        .subscribe((data)=>{
            var list=[]
             this.waitLoader=false
            console.log(data);
            if(data.response){
                this.saloonData=data.data[0]
                 var owl = $(".owl-demo1");
             
                owl.owlCarousel({
                nav:true,
                loop:true,
                items : 4, //10 items above 1000px browser width
                itemsDesktop : [1000,3], //5 items between 1000px and 901px
                itemsDesktopSmall : [900,3], // betweem 900px and 601px
                itemsTablet: [600,2], //2 items between 600 and 0
                itemsMobile : false,
                autoplay:true // itemsMobile disabled - inherit from itemsTablet option
                });
                console.log(this.saloonData.description_eng)
               
              // this.toastr.success(data.message ,'Services Added successfully ',{toastLife: 1000, showCloseButton: true})
              // this.router.navigate(['/header-three-layout/service-list']);
            }
         }) 
    }
    getimage1(){

    return 'http://18.216.88.154/public/beauti-service/'+this.saloonData.SaloonImages[0].image
    }
    getimage2(){

    return 'http://18.216.88.154/public/beauti-service/'+this.saloonData.SaloonImages[1].image
    }
    getimage3(){

    return 'http://18.216.88.154/public/beauti-service/'+this.saloonData.SaloonImages[2].image
    }
    getimage4(){

    return 'http://18.216.88.154/public/beauti-service/'+this.saloonData.SaloonImages[3].image
    }
    getimage5(){

    return 'http://18.216.88.154/public/beauti-service/'+this.saloonData.SaloonImages[4].image
    }
    getimage6(){

    return 'http://18.216.88.154/public/beauti-service/'+this.saloonData.SaloonImages[5].image
    }
     getimage7(){

    return 'http://18.216.88.154/public/beauti-service/'+this.saloonData.SaloonImages[6].image
    }

        
    openCategory(ref){
            $(ref).toggleClass('active');
            $(ref).next('.sub-menulist').slideToggle('500');
            $(ref).find('i').toggleClass('fa-angle-up fa-angle-down')
    
    }

    openCategory2(ref){
      
          
            $(ref).next('.timing-ul').slideToggle('500');
            $(ref).find('i').toggleClass('fa-plus-circle fa-minus-circle')
    
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
