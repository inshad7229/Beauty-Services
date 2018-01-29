import { Component, OnInit,ViewContainerRef ,ElementRef, ViewChild,NgZone} from '@angular/core';
import { CommonService } from '../../providers/common.service'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import 'rxjs/add/observable/forkJoin';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { AppProvider } from '../../providers/app.provider'
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

declare var jQuery:any;
declare var $ :any;

declare var WOW;

declare var google



@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})

export class HomePageComponent implements OnInit {
  @ViewChild("search")
      public searchElementRef: ElementRef;
    saloon
    customer
    waitLoader;
    homePageContent;
    categoryList;
    appointments;
    totalSalons;
    averageRating;
    totalCustomers;
    tick=.5;
    serviceList;
    //trendingStyles=[{image:'assets/img/color.png'},{image:'assets/img/color.png'},{image:'assets/img/color.png'},{image:'assets/img/color.png'},{image:'assets/img/color.png'},{image:'assets/img/color.png'},{image:'assets/img/color.png'},{image:'assets/img/color.png'},{image:'assets/img/color.png'},{image:'assets/img/color.png'},{image:'assets/img/color.png'}];
    trendingStyles=[];
    allSalonData;
    idForSearchSalon
    filteredSalons : Observable<any[]>;
    filteredCity: Observable<any[]>;
    myControl: FormControl = new FormControl();
    myControlCities:FormControl = new FormControl();
    city
    constructor(private router:Router,private appProvider:AppProvider,private commonServices:CommonService,  private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone) {}

    ngOnInit() {
          var sync1 = $("#sync1");
          var sync2 = $("#sync2");
          var sync1_copy = $("#sync1_copy");

          sync1.owlCarousel({
            singleItem : true,
            slideSpeed : 1000,
            navigation: false,
            pagination:false,
            afterAction : syncPosition,
            responsiveRefreshRate : 200,
             autoPlay : true,
             
          });

            sync1_copy.owlCarousel({
            singleItem : true,
            slideSpeed : 1000,
            navigation: false,
            pagination:false,
            afterAction : syncPosition,
            responsiveRefreshRate : 200,
            autoPlay : true,
          });

          sync2.owlCarousel({
            items :4,
            itemsDesktop      : [1199,4],
            itemsDesktopSmall     : [979,4],
            itemsTablet       : [768,4],
            itemsMobile       : [479,4],
            pagination:false,
            responsiveRefreshRate : 100,
            afterInit : function(el){
              el.find(".owl-item").eq(0).addClass("synced");
            }
          });

          function syncPosition(el){
            var current = this.currentItem;
            $("#sync2")
              .find(".owl-item")
              .removeClass("synced")
              .eq(current)
              .addClass("synced")
            if($("#sync2").data("owlCarousel") !== undefined){
              center(current)
            }

          }

          $("#sync2").on("click", ".owl-item", function(e){
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1.trigger("owl.goTo",number);
          });


          $("#sync2").on("click", ".owl-item", function(e){
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1_copy.trigger("owl.goTo",number);
          });

          function center(number){
            var sync2visible = sync2.data("owlCarousel").owl.visibleItems;

            var num = number;
            var found = false;
            for(var i in sync2visible){
              if(num === sync2visible[i]){
                var found = true;
              }
            }

            if(found===false){
              if(num>sync2visible[sync2visible.length-1]){
                sync2.trigger("owl.goTo", num - sync2visible.length+2)
              }else{
                if(num - 1 === -1){
                  num = 0;
                }
                sync2.trigger("owl.goTo", num);
              }
            } else if(num === sync2visible[sync2visible.length-1]){
              sync2.trigger("owl.goTo", sync2visible[1])
            } else if(num === sync2visible[0]){
              sync2.trigger("owl.goTo", num-1)
            }
          }

        var owl = $(".owl-demo1");
         
        owl.owlCarousel({
	        items : 4, //10 items above 1000px browser width
	        itemsDesktop : [1000,3], //5 items between 1000px and 901px
	        itemsDesktopSmall : [900,3], // betweem 900px and 601px
	        itemsTablet: [600,2], //2 items between 600 and 0
	        itemsMobile : [480,1] // itemsMobile disabled - inherit from itemsTablet option
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

	    jQuery(document).ready(function($) {
            $('.count').counterUp({
                delay: 10,
                time: 1000
            });
        });
     this.getserviceList();
     this.getHomePageContent();
      this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['(cities)'],
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
         alert(JSON.stringify(place.address_components[0].long_name))
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.appProvider.current.selectedCity=place.address_components[0].long_name
          //set latitude, longitude and zoom
          // this.accountCreationModel.city=place.formatted_address
          // this.accountCreationModel.latitude = place.geometry.location.lat();
          // this.accountCreationModel.longitude = place.geometry.location.lng();
          // this.zoom = 12;
        });
      });
    });
    }

    filter(val: string): string[] {
      return this.allSalonData.filter(option =>
        option.saloon_name.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    filtercities(val: string): string[] {
      return this.allSalonData.filter(option =>
        option.city.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    getserviceList(){
        this.waitLoader=true
        this.commonServices.getCategoryWithServices()
        .subscribe((data)=>{
            var list=[]
             this.waitLoader=false
            console.log(data);
            if(data.response){
              this.categoryList=data.data
              console.log(this.serviceList +"mukul")
              // this.toastr.success(data.message ,'Services Added successfully ',{toastLife: 1000, showCloseButton: true})
              // this.router.navigate(['/header-three-layout/service-list']);
            }
         }) 
    }


  getHomePageContent(){
    Observable.forkJoin([this.commonServices.homePageContent(), this.commonServices.getServices() , this.commonServices.getTrendingStyles() , this.commonServices.getAllSaloonList()]).subscribe(results => {
      if (results[0].response==true) {
          this.homePageContent=results[0];
          this.getAppointmentCount(results[0].totalAppointments);
          this.getSalons(results[0].totalSalons);
          this.getaverageRating(results[0].averageRating);
          this.gettotalCustomers(results[0].totalCustomers);
      }
      if (results[1].response==true) {
        this.serviceList=results[1].data.slice(0, 6);
      }
      if (results[2].success==true) {
        this.trendingStyles=results[2].trendingStylesData;
        // alert(JSON.stringify(this.trendingStyles))
      }
      if (results[3].response==true) {
        this.allSalonData=results[3].data;
        this.filteredSalons= this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filter(val))
        );

        this.filteredCity=this.myControlCities.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filtercities(val))
        );

      }
    },error=>{
     
    });
  }

    // getHomePageContent(){
    //   this.commonServices.homePageContent().subscribe(data=>{
    //     if (data.response==true) {
    //       this.homePageContent=data;
    //       this.getAppointmentCount(data.totalAppointments);
    //       this.getSalons(data.totalSalons);
    //       this.getaverageRating(data.averageRating);
    //       this.gettotalCustomers(data.totalCustomers);
    //     }
    //   },err=>{

    //   })
    // }

    getAppointmentCount(data){
      let totalSec=0
       this.appointments = Observable.timer(0, this.tick)
      .take(data)
      .map(() => ++totalSec)
      console.log(this.appointments)
    }

    getSalons(data){
      let totalSec=0
       this.totalSalons = Observable.timer(0, this.tick)
      .take(data)
      .map(() => ++totalSec)
      console.log(this.totalSalons)
    }

    getaverageRating(data){
      let totalSec=0
       this.averageRating = Observable.timer(0, this.tick)
      .take(data)
      .map(() => ++totalSec)
      console.log(this.totalSalons)
    }

    gettotalCustomers(data){
      let totalSec=0
       this.totalCustomers = Observable.timer(0, this.tick)
      .take(data)
      .map(() => ++totalSec)
      console.log(this.totalSalons)
    }

    getimage1(){
    return 'http://18.221.208.210/public/beauty-service/'+this.trendingStyles[0].image
    }
    getimage2(){

    return 'http://18.221.208.210/public/beauty-service/'+this.trendingStyles[1].image
    }
    getimage3(){

    return 'http://18.221.208.210/public/beauty-service/'+this.trendingStyles[2].image
    }
    getimage4(){

    return 'http://18.221.208.210/public/beauty-service/'+this.trendingStyles[3].image
    }
    getimage5(){

    return 'http://18.221.208.210/public/beauty-service/'+this.trendingStyles[4].image
    }
    getimage6(){

    return 'http://18.221.208.210/public/beauty-service/'+this.trendingStyles[5].image
    }
   getimage7(){

    return 'http://18.221.208.210/public/beauty-service/'+this.trendingStyles[6].image
    }
    getimage8(){
    return 'http://18.221.208.210/public/beauty-service/'+this.trendingStyles[7].image
    }

    getimage9(){
    return 'http://18.221.208.210/public/beauty-service/'+this.trendingStyles[8].image
    }

   getimage10(){
    return 'http://18.221.208.210/public/beauty-service/'+this.trendingStyles[9].image
    }

    services(ser){
      // alert(ser)
      this.appProvider.current.serviceSearched=ser
      this.appProvider.current.selectedCity=null
      // this.router.navigate(['/header-three-layout/saloon-dashboard']);
      this.router.navigate(["/header-two-layout/searched-saloon"])
    }

    onSelectedSalon(option){
      // alert(JSON.stringify(option))
      this.idForSearchSalon=option.id;
    }

    onCitySelection(selectedCity){
      //alert(selectedCity);
      this.appProvider.current.selectedCity=selectedCity;
    }

    onSearch(){
      if (this.idForSearchSalon) {
        this.router.navigate(["/header-two-layout/saloon-details/"+this.idForSearchSalon])
      }
      else if(this.appProvider.current.selectedCity){
       // alert('hl;o')
        this.router.navigate(["/header-two-layout/searched-saloon"])
      }
    }

}
