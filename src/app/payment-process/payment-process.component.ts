import { Component, OnInit,ViewContainerRef ,ElementRef, ViewChild,NgZone,ChangeDetectionStrategy,
TemplateRef} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent
} from 'angular-calendar';


import {SaloonService} from '../providers/saloon.service'

import {CommonService} from '../providers/common.service'
import {AppProvider} from '../providers/app.provider'

declare var WOW
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
declare var $
declare var google

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
    selector: 'app-payment-process',
    templateUrl: './payment-process.component.html',
    styleUrls: ['./payment-process.component.scss']
})
export class PaymentProcessComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';
  locale='ar'
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  selectedServices=JSON.parse(localStorage['selectedServices'])
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = true;
  userDetail=JSON.parse(localStorage['userdetails'])
	id
	waitLoader
	saloonData
  totalAmount:number=0
  time
  showpatOtion:string='card'
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
    	console.log(JSON.stringify(this.selectedServices))
        this.getSaloonData()
    }
  
    ngOnInit() {

			 $('.sub-menulist').hide();
             $('.timing-ul').hide();
			    this.getSaloonData()
    }
onCard(){
  this.showpatOtion='card'
}
onCash(){
  this.showpatOtion='cash'
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
 if (this.selectedServices.map(function (img) { return img.id; }).indexOf(data.id)==-1) {
  this.selectedServices.push(data)
  this.totalAmount=this.totalAmount+parseInt(data.cost_eng)
   // code...
 }else{
   let index=this.selectedServices.map(function (img) { return img.id; }).indexOf(data.id)
   this.selectedServices.splice(index,1)
    this.totalAmount=this.totalAmount-parseInt(data.cost_eng)
 }

}
getStatus(data){
  if (this.selectedServices.length>0) {
        if (this.selectedServices.map(function (img) { return img.id; }).indexOf(data.id)==-1) {
           return false
          }else if(this.selectedServices.map(function (img) { return img.id; }).indexOf(data.id)!=-1){
            return true
          }else{
            return false
          }
  }else{
    return false
  }
}

// onSchedule(){
// localStorage['selectedServices']=JSON.stringify(this.selectedServices)
// //this.route.na
// }


    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      alert(date)
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    //this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  // handleEvent(action: string, event: CalendarEvent): void {
  //   this.modalData = { event, action };
  //   this.modal.open(this.modalContent, { size: 'lg' });
  // }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

}
