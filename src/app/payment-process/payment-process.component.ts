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
  locale='en'
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
  saloonServicesList
  saloonEmployeeList
  currentServiceId:number
  currentIndex:number;
  scheduleIndex:number
  totalAmount:number=0
  cusrrentService:any;
  time
  timeSlot=[]
  selectedDate
  showpatOtion:string='card'
  bookedTime1='11:30'
  bookedTime2='12:15'
  bookedHistory=[
  {bookedTime1:'11:30',bookedTime2:'12:15'},
  {bookedTime1:'12:25',bookedTime2:'13:20'},
  {bookedTime1:'15:45',bookedTime2:'19:20'}
  ]
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
        this.commonService.getAllServiceBySaloon(this.id)
        .subscribe((data)=>{
            var list=[]
             this.waitLoader=false
            console.log(data);
            if(data.response){
                this.saloonData=data.data
                this.saloonServicesList=this.saloonData.saloonServices
                this.saloonEmployeeList=this.saloonData.saloonEmployee
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

    onSelectEmployee(ser,i){
     this.currentServiceId=ser.service_id
     this.currentIndex=i
    }

    getEmplloyeListForService(){
      let data=this.saloonServicesList.filter(arg=>arg.service_id==this.currentServiceId && arg.saloon_id==this.id)
      if (data.length>0) {
        // code...
        return data[0].servicesData.serByEmplnServiceData
      }else{
        return []
      }
    }
    onSelectEmployeeRadio(value){
      //alert(this.currentIndex)
      //alert(value)his.selectedServices[this.currentIndex] is undefined
      this.selectedServices[this.currentIndex].emp_id=value

    }
    getimage(img){
    return 'http://18.216.88.154/public/beauti-service/'+img
    }

    getEmpImg(emp_id){
      let data=this.saloonEmployeeList.filter(arg=>arg.id==emp_id)
      if (data.length>0) {
        // code...
        return 'http://18.216.88.154/public/beauti-service/'+data[0].employee_image
      }else{
        return 'assets/img/user-pay.svg'
      }

    }
    getEmpName(emp_id){
      let data=this.saloonEmployeeList.filter(arg=>arg.id==emp_id)
      if (data.length>0) {
        // code...
        return data[0].first_name+' '+data[0].last_name
      }
    }
   
    onTimeSelect(ser){
      this.cusrrentService=ser
      this.selectedDate=null
      this.scheduleIndex=null;
      this.timeSlot=[]
       let openingTime=this.saloonData.opening_time.split(':')
       let closingTime=this.saloonData.closing_time.split(':')
       let time1=parseInt(openingTime[0])*60+parseInt(openingTime[1])
       let time2=parseInt(closingTime[0])*60+parseInt(closingTime[1])
       let length=(time2-time1)/parseInt(ser.time)
       if (length>0) {
         let time3=time1;
         let time4=time3+parseInt(ser.time)
         for (var i = 0; i < length; ++i) {
           if (time3<time2 && time4< time2) {
               this.timeSlot.push({start:time3,end:time4,checkStatus:false})
               time3=time3+parseInt(ser.time)
               time4=time4+parseInt(ser.time)
           }
             // code...
         }
       }
    }
    
getHours(time){
  let a=Math.floor(time/60)
  if (a<10) {
    return '0'+a
  }else{
    if (a>12) {
      let b=a-12;
      return '0'+b// code...
    }else{
      return a
    }
  }
}
getMint(time){
 let a=Math.floor(time%60)
 if (a<10) {
    return '0'+a
  }else{
    return a
  }
}
getAmPm(time){
  let a=Math.floor(time/60)
  if (a>11) {
    return 'PM'
  }else{
     return 'AM'
  }
}

getClass(time,index){
  // let time1=this.bookedTime1.split(':')
  // let time2=this.bookedTime2.split(':')
  // let time3=parseInt(time1[0])*60+parseInt(time1[1])
  // let time4=parseInt(time2[0])*60+parseInt(time2[1])
  // console.log('time3',time3)
  // console.log('time4',time4)
  // console.log('start',time.start)
  // console.log('end',time.end)

  if (time.checkStatus==true) {
    if (time.secheuleStart && time.secheuleEnd) {
      return 'dull-date2'
      // code...
    }else{
       return 'dull-date'
    }

  }else{
           for (var i = 0; i < this.bookedHistory.length; ++i) {
         let time1=this.bookedHistory[i].bookedTime1.split(':')
          let time2=this.bookedHistory[i].bookedTime2.split(':')
          let time3=parseInt(time1[0])*60+parseInt(time1[1])
          let time4=parseInt(time2[0])*60+parseInt(time2[1])
          console.log('time3',time3)
          console.log('time4',time4)
          console.log('start',time.start)
          console.log('end',time.end)
          if (time.start < time3 && time.end <= time3) {
        // return ''
      }
      else if (time.start > time4 && time.end > time4) {

        // return ''

      }else if (time.start <= time3 && time.end <= time4) {
         this.timeSlot[index].checkStatus=true
         return 'dull-date'

      }else if (time.start > time3 && time.end <= time4) {
         this.timeSlot[index].checkStatus=true
         return 'dull-date'
      }else if (time.start < time3 && time.end >time4) {
        // code...
         this.timeSlot[index].checkStatus=true
         return 'dull-date'
      }
      else if (time.start < time4 && time.end >time4) {
         this.timeSlot[index].checkStatus=true
         return 'dull-date'
      }
    } 
  }

  

} 

onSelectSedule(time,index){
  if (time.checkStatus==true) {

  }else{
    this.scheduleIndex=index;
    for (var i = 0; i < this.timeSlot.length; i++) {
        if (this.timeSlot[i].secheuleStart && this.timeSlot[i].secheuleEnd) {
          this.timeSlot[i].checkStatus=false
        }
    }
    this.timeSlot[index].secheuleStart=time.start
    this.timeSlot[index].secheuleEnd=time.end
    this.timeSlot[index].checkStatus=true

  }
}
rest(){
  this.scheduleIndex=null;
  for (var i = 0; i < this.timeSlot.length; i++) {
        if (this.timeSlot[i].secheuleStart && this.timeSlot[i].secheuleEnd) {
          this.timeSlot[i].checkStatus=false
          this.timeSlot[i].secheuleStart=false
          this.timeSlot[i].secheuleEnd=false
        }
    }
}
onPrevious(){
 this.rest()
}
onToday(){
 this.rest()
}
onNext(){
 this.rest()
}
creatConfirmation(){
  console.log(JSON.stringify(this.timeSlot[this.scheduleIndex]))

  let startTime=this.getHours(this.timeSlot[this.scheduleIndex].secheuleStart)+':'+this.getMint(this.timeSlot[this.scheduleIndex].secheuleStart)
  let endTime=this.getHours(this.timeSlot[this.scheduleIndex].secheuleEnd)+':'+this.getMint(this.timeSlot[this.scheduleIndex].secheuleEnd)
   this.selectedServices[this.currentIndex].startTime=startTime
   this.selectedServices[this.currentIndex].endTime=endTime
   this.selectedServices[this.currentIndex].startTime1=this.timeSlot[this.scheduleIndex].secheuleStart
   this.selectedServices[this.currentIndex].endTime1=this.timeSlot[this.scheduleIndex].secheuleEnd
   this.selectedServices[this.currentIndex].date=this.selectedDate
} 

onCoinfirmAppointment(ser){
  this.waitLoader=true
        this.commonService.saloonUpdate(this.id)
        .subscribe((data)=>{
            var list=[]
             this.waitLoader=false
            if(data.response){
            }
         })

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
 if (this.selectedServices.map(function (img) { return img.saloon_id; }).indexOf(data.saloon_id)==-1) {
  this.selectedServices.push(data)
  this.totalAmount=this.totalAmount+parseInt(data.cost_eng)
   // code...
 }else{
   let index=this.selectedServices.map(function (img) { return img.saloon_id; }).indexOf(data.saloon_id)
   this.selectedServices.splice(index,1)
    this.totalAmount=this.totalAmount-parseInt(data.cost_eng)
 }

}
getStatus(data){
  if (this.selectedServices.length>0) {
        if (this.selectedServices.map(function (img) { return img.saloon_id; }).indexOf(data.saloon_id)==-1) {
           return false
          }else if(this.selectedServices.map(function (img) { return img.saloon_id; }).indexOf(data.saloon_id)!=-1){
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
      //alert(date)
     this.selectedDate=null
     this.rest()
    if (isSameMonth(date, this.viewDate)) {
        let currentDateTime=new Date()
        let current=currentDateTime.getFullYear()
        let selecteddate=date.getDate()
        let selectedMonth=date.getMonth()+1
        let selectedyear=date.getFullYear()
        let date1
        let month1
        let year
        if(selecteddate<10){
          date1='0'+selecteddate
        }else{
          date1=selecteddate
        }

        if(selectedMonth<10){
          month1='0'+selectedMonth
        }else{
          month1=selectedMonth
        }
        if (currentDateTime.getFullYear() < date.getFullYear()) {
            
              this.selectedDate=selectedyear+'-'+month1+'-'+date1
           
        }else if (currentDateTime.getFullYear() == date.getFullYear()) {
            if (currentDateTime.getMonth() <  date.getMonth()) {
                this.selectedDate=selectedyear+'-'+month1+'-'+date1
            }else if (currentDateTime.getMonth() ==  date.getMonth()) {
              // code...
              if (currentDateTime.getDate() <  date.getDate()) {
                 this.selectedDate=selectedyear+'-'+month1+'-'+date1
              }else if (currentDateTime.getDate() ==  date.getDate()) {


                this.selectedDate=selectedyear+'-'+month1+'-'+date1
              }else{
                 this.selectedDate=null
              }
            }else{
              this.selectedDate=null
            }
           
        }else if (currentDateTime.getFullYear() < date.getFullYear()) {
           this.selectedDate=null
        }
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        
        this.activeDayIsOpen = false;
      } else {
       // this.rest()
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
    // this.events.push({
    //   title: 'New event',
    //   start: startOfDay(new Date()),
    //   end: endOfDay(new Date()),
    //   color: colors.red,
    //   draggable: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   }
    // });
    // this.refresh.next();
  }

}
