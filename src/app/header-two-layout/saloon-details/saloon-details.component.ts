import { Component, OnInit,ViewContainerRef ,ElementRef, ViewChild,NgZone} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';

import {SaloonService} from '../../providers/saloon.service'

import {CommonService} from '../../providers/common.service'
import {AppProvider} from '../../providers/app.provider'

declare var WOW
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
declare var $
declare var google
@Component({
    selector: 'app-saloon-details',
    templateUrl: './saloon-details.component.html',
    styleUrls: ['./saloon-details.component.scss']
})
export class SaloonDetailsComponent implements OnInit {
@ViewChild("search")
public searchElementRef: ElementRef;



	id
	waitLoader
	saloonData
  selectedServices=[]
  totalAmount:number=0
      public latitude: number;
    public longitude: number;
    public zoom: number;
    time
    constructor(public router: Router, 
    	        private saloonServices:SaloonService,
    	        vcr: ViewContainerRef,
    	        private toastr: ToastsManager,
    	        private commonService:CommonService,
    	        private appProvider:AppProvider,
    	        private route: ActivatedRoute,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
    	        this.toastr.setRootViewContainerRef(vcr);
    	this.id = +this.route.snapshot.paramMap.get('id');
    	//alert(this.id)
        this.getSaloonData()
    }
  
    ngOnInit() {

            this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
   
    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    // this.mapsAPILoader.load().then(() => {
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     types: ["address"]
    //   });
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    //      // alert(place.formatted_address)
    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }
          
    //       //set latitude, longitude and zoom
    //       // this.userDetail.city=place.formatted_address
    //       // this.userDetail.latitude = place.geometry.location.lat();
    //       // this.userDetail.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });
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
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }


 getLat(lat){
  return parseInt(lat)

}
getLon(long){
 return parseInt(long)
}
    getSaloonData(){
    	 this.waitLoader=true
        this.commonService.getAllSaloonData(this.id)
        .subscribe((data)=>{
            var list=[]
             this.waitLoader=false
            console.log(data);
            if(data.response){
                this.saloonData=data.data
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

onselectService(data){
 if (this.selectedServices.map(function (img) { return img.service_id; }).indexOf(data.service_id)==-1) {
  this.selectedServices.push(
    {
    saloon_id:data.saloon_id,
    category_id:data.category_id,
    service_id:data.service_id,
    cost_eng:data.cost_eng,
    cost_arb:data.cost_arb,
    description_eng:data.description_eng,
    description_arb:data.description_eng,
    time:data.time,
    services_eng:data.servicesData.services_eng,
    services_arb:data.servicesData.services_arb,
    image:data.servicesData.image,
    date:null,
    startTime:null,
    endTime:null,
    startTime1:null,
    endTime1:null,
    emp_id:null
  })
  this.totalAmount=this.totalAmount+parseInt(data.cost_eng)
   // code...
 }else{
   let index=this.selectedServices.map(function (img) { return img.service_id; }).indexOf(data.service_id)
   this.selectedServices.splice(index,1)
    this.totalAmount=this.totalAmount-parseInt(data.cost_eng)
 }

}
getStatus(data){
  if (this.selectedServices.length>0) {
        if (this.selectedServices.map(function (img) { return img.service_id; }).indexOf(data.service_id)==-1) {
           return false
          }else if(this.selectedServices.map(function (img) { return img.service_id; }).indexOf(data.service_id)!=-1){
            return true
          }else{
            return false
          }
  }else{
    return false
  }
}

onSchedule(){
localStorage['selectedServices']=JSON.stringify(this.selectedServices)
this.router.navigate(['/payment-process/3']);
}

}
