import { Component, ChangeDetectionStrategy,ViewChild,TemplateRef,OnInit,AfterViewInit} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { CommonModule } from "@angular/common";
import { Subject } from 'rxjs/Subject';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent} from 'angular-calendar';
import { SaloonService} from '../../providers/saloon.service' 
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'


declare var jQuery:any;
declare var $ :any;
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
    selector: 'app-saloon-dashboard',
    templateUrl: './saloon-dashboard.component.html',
    styleUrls: ['./saloon-dashboard.component.scss']
})
export class SaloonDashboardComponent implements OnInit ,AfterViewInit{

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fa fa-fw fa-pencil"></i>',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     }
  //   },
  //   {
  //     label: '<i class="fa fa-fw fa-times"></i>',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter(iEvent => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     }
  //   }
  // ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: new Date(),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // }
  ];

  activeDayIsOpen: boolean = true;
  userDetail=JSON.parse(localStorage['userdetails'])
  appointMentList;
  saloonId;
  saloonDetails;
  p:number=1
  currentDate=new Date();
  previousDate=new Date();
  forwardDate=new Date();
  appointmentDataToBeFiltered;
  filterDate
  totalAppointments
  countDown
  countDownCurrent
tick=.5

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  constructor( private saloonService:SaloonService) {
    this.saloonId=this.userDetail.id;
      this.totalAppointments=180
      
      
    this.getAppointMentList()
  }

    ngOnInit() {
       
    	jQuery(document).ready(function($) {
            $('.count').counterUp({
                delay: 10,
                time: 1000
            });
        });
      
    }

    ngAfterViewInit(){
      this.getAppointMentList()
    }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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

    // eventTimesChanged({
    //   event,
    //   newStart,
    //   newEnd
    // }: CalendarEventTimesChangedEvent): void {
    //   event.start = newStart;
    //   event.end = newEnd;
    //   this.handleEvent('Dropped or resized', event);
    //   this.refresh.next();
    // }

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

   getAppointMentList(){
     this.saloonService.getAppointmentDetailsForSaloon(this.saloonId).subscribe(data=>{
       if (data.response==true) {
        this.appointmentDataToBeFiltered=data.data;
        this.appointMentList=data.data;
        this.totalAppointments=this.appointmentDataToBeFiltered.length;
        this.getBookingCount(this.totalAppointments)
       // document.getElementById("totalappointments").setAttribute("value-data", this.totalAppointments)
        this.filterFunction();
        this.currentDateAppointment()
        console.log(JSON.stringify(this.appointMentList))
         // code...
       }
      },err=>{
        console.log(err);
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

     getHours(value){
        // console.log(value);
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

    onPreviousDate(){
      this.appointMentList=this.appointmentDataToBeFiltered;
      console.log(this.appointMentList)
      let d=new Date(this.currentDate)
      // alert(d.getDate() - 1)
      var newDate = new Date(d.getTime()-24*60*60*1000);
      this.previousDate=newDate
      this.currentDate=this.previousDate;
      console.log("currentDate"+this.currentDate);
      console.log("previousDate"+this.previousDate);
      this.filterFunction();
    }

    onForwardDate(){
      this.appointMentList=this.appointmentDataToBeFiltered;
      let d=new Date(this.currentDate)
      var newDate = new Date(d.getTime()+24*60*60*1000);
      this.forwardDate=newDate
      this.currentDate=this.forwardDate;
      console.log("currentDate"+this.currentDate);
      console.log("forwardDate"+this.forwardDate);
      this.filterFunction();
    }

    filterFunction(){
        let c=new Date(this.currentDate)
        let selecteddate=c.getDate()
        let selectedMonth=c.getMonth()+1
        let selectedyear=c.getFullYear()
        let date1
        let month1
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
        this.filterDate=selectedyear+'-'+month1+'-'+date1;
        console.log(this.filterDate)
        this.appointMentList=this.appointMentList.filter(f=>(f.date==this.filterDate))
    }


   currentDateAppointment(){
        let c=new Date(this.currentDate)
        let selecteddate=c.getDate()
        let selectedMonth=c.getMonth()+1
        let selectedyear=c.getFullYear()
        let date1
        let month1
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
        let final=selectedyear+'-'+month1+'-'+date1;
        console.log(this.filterDate)
        let appointMentList=this.appointMentList.filter(f=>(f.date==final))
        this.getCurrentBookingCount(appointMentList.length)
    }
    getBookingCount(data){
      let totalSec=0
       this.countDown = Observable.timer(0, this.tick)
      .take(data)
      .map(() => ++totalSec)
      console.log(this.countDown)
    }

    getCurrentBookingCount(data){
      let totalSec=0
       this.countDownCurrent = Observable.timer(0, this.tick)
      .take(data)
      .map(() => ++totalSec)
      // console.log(this.countDown)
    }

}
