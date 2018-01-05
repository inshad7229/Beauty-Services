import { Component, OnInit } from '@angular/core';
import { SaloonService } from '../../providers/saloon.service'
import { CommonService } from '../../providers/common.service';

@Component({
    selector: 'app-booking-page',
    templateUrl: './booking-page.component.html',
    styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit {
	appointMents;
	saloonId;
	saloonDetails;
	p:number=1;
  appointMentData;
  serviceList
  employeeList;
  allSaloonData;
  timeSlot;
  serviceTime;
  selectedDate;
  employeeAppointment;
  selectedEmployee;
  selectedEmployeeIdForEdit;
  serviceIdForEdit;
  startTimeForEdit;
  endTimeForEdit;
  appointmentId;
  selectedTime;
    constructor(private commonService:CommonService,private saloonService:SaloonService) {
    	this.saloonDetails=JSON.parse(localStorage['userdetails']);
    	this.saloonId=this.saloonDetails.id;
    }

    ngOnInit() {
    	this.getAppointMentList();
      this.getAllSaloonData();
    }



    getAppointMentList(){
    	this.saloonService.getAppointmentDetailsForSaloon(this.saloonId).subscribe(data=>{
    		this.appointMents=data.data;
    	},err=>{

    	})
    }

    onEdit(appointMentData){
        this.appointmentId=appointMentData.id;
        this.appointMentData=appointMentData;
        console.log(appointMentData);
        this.serviceIdForEdit=appointMentData.services_id
        this.getEmployeesForRelatedService(appointMentData.services_id,appointMentData.emp_id);
        this.selectedDate=appointMentData.date;
        let start_time=appointMentData.start_time.split(':');
        let time1=parseInt(start_time[0])*60+parseInt(start_time[1]);
        this.selectedTime=time1;
        console.log("selectedTime"+this.selectedTime)

    }

    onView(appointment){
      this.appointMentData=appointment

    }

    imagePath(path){
      if(path.indexOf('base64')==-1) {
          return 'http://18.221.208.210/public/beauty-service/'+path
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

    getHoursForSlots(time){
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

    getMintForSlots(time){
     let a=Math.floor(time%60)
     if (a<10) {
        return '0'+a
      }else{
        return a
      }
    }

    getAmPmForSlots(time){
      let a=Math.floor(time/60)
      if (a>11) {
        return 'PM'
      }else{
         return 'AM'
      }
    }
    getHoursForSlotsForSend(time){
      let a=Math.floor(time/60)
      if (a<10) {
        return '0'+a
      }else{
        return a;
      }
    }

    getMintForSlotsForSend(time){
     let a=Math.floor(time%60)
     if (a<10) {
        return '0'+a
      }else{
        return a
      }
    }
    // getEmployeeList(){
    //   this.saloonService.getEmployeeById(this.saloonId).subscribe(data=>{
    //       this.employeeList=data.data
    //   },err=>{

    //   })
    // }

    // getserviceList(){
    //     this.saloonService.getservicesById(this.saloonId)
    //     .subscribe((data)=>{
    //         console.log(data);
    //         if(data.response){
    //             this.serviceList=data.data
    //             for (var i = 0; i < this.serviceList.length; ++i) {
    //                list.push({id:this.serviceList[i].servicesData.id,name:this.serviceList[i].servicesData.services_eng})
    //             }
    //             this.myOptions2=list
    //           // this.toastr.success(data.message ,'Services Added successfully ',{toastLife: 1000, showCloseButton: true})
    //           // this.router.navigate(['/header-three-layout/service-list']);
    //         }
    //      }) 
    // }


    getAllSaloonData(){
      this.commonService.getAllServiceBySaloon(this.saloonId).subscribe(data=>{
        this.allSaloonData=data.data;
      },err=>{
        console.log(err);
      })
    }

    getEmployeesForRelatedService(serviceId,empId){
      console.log(serviceId);
      console.log(empId)
      let saloonData=this.allSaloonData.saloonServices.filter(f=>f.service_id==serviceId)
      if (saloonData.length>0) {
            // console.log(JSON.stringify(saloonData[0].servicesData.serByEmplnServiceData))
            this.employeeList=saloonData[0].servicesData.serByEmplnServiceData;
            this.serviceTime=saloonData[0].time
            let employee=this.employeeList.filter(arg=>arg.employee_id==empId);
            console.log(employee);

            let appointment
            if (employee.length>0) {
              this.selectedEmployee=employee[0].employeeDetails.first_name;
              console.log(this.selectedEmployee)
             this.employeeAppointment=employee[0].employeeDetails.Appointment
            }
            this.onTimeSelect()
      }
    }

    onTimeSelect(){
      this.timeSlot=[]
      console.log(this.timeSlot.length)
       let openingTime=this.allSaloonData.opening_time.split(':')
       let closingTime=this.allSaloonData.closing_time.split(':')
       let time1=parseInt(openingTime[0])*60+parseInt(openingTime[1])
       let time2=parseInt(closingTime[0])*60+parseInt(closingTime[1])
       let length=(time2-time1)/parseInt(this.serviceTime)
       if (length>0) {
         let time3=time1;
         let time4=time3+parseInt(this.serviceTime)
         for (var i = 0; i < length; ++i) {
           if (time3<time2 && time4< time2) {
               this.timeSlot.push({start:time3,end:time4,checkStatus:false})
               time3=time3+parseInt(this.serviceTime)
               time4=time4+parseInt(this.serviceTime)
           }
         }
       }
    }

    onTimeSelection(selectedTime){
      console.log(selectedTime);
      this.startTimeForEdit=selectedTime;
      this.startTimeForEdit=this.getHoursForSlotsForSend(this.startTimeForEdit)+":"+this.getMintForSlotsForSend(this.startTimeForEdit)
      this.endTimeForEdit=parseInt(selectedTime)+parseInt(this.serviceTime);
      this.endTimeForEdit=this.getHoursForSlotsForSend(this.endTimeForEdit)+":"+this.getMintForSlotsForSend(this.endTimeForEdit);
      console.log(this.endTimeForEdit+"endTimeForEdit");
      console.log(this.startTimeForEdit+"startTimeForEdit");
    }

    onDateChange(){
      let selecteddate=this.selectedDate.getDate()
      let selectedMonth=this.selectedDate.getMonth()+1
      let selectedyear=this.selectedDate.getFullYear()
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
        this.selectedDate=selectedyear+'-'+month1+'-'+date1;
        console.log(this.selectedDate)
    }

    getClass(time,date){
        if (this.employeeAppointment.length>0) {
          let currentDate_appontment=this.employeeAppointment.filter(arg=>arg.date==date)
           for (var i = 0; i < currentDate_appontment.length; ++i) {
           let time1=currentDate_appontment[i].start_time.split(':')
            let time2=currentDate_appontment[i].end_time.split(':')
            let time3=parseInt(time1[0])*60+parseInt(time1[1])
            let time4=parseInt(time2[0])*60+parseInt(time2[1])
            // console.log('time3',time3)
            // console.log('time4',time4)
            // console.log('start',time.start)
            // console.log('end',time.end)
            if (time.start < time3 && time.end <= time3) {
              // return ''
            }
            else if (time.start > time4 && time.end > time4) {

              // return ''

            }else if (time.start <= time3 && time.end <= time4) {
               // this.timeSlot[index].checkStatus=true
               return true

            }else if (time.start > time3 && time.end <= time4) {
               // this.timeSlot[index].checkStatus=true
               return true
            }else if (time.start < time3 && time.end >time4) {
              // code...
               // this.timeSlot[index].checkStatus=true
               return true
            }
            else if (time.start < time4 && time.end >time4) {
               // this.timeSlot[index].checkStatus=true
               return true
            }
        // }
        }
      }
    } 


    selectedSlot(){
      let startTimehr=this.getHours(this.appointMentData.start_time);
      let startTimemin=this.getMin(this.appointMentData.start_time);
      let startTimeamPm=this.getAmPm(this.appointMentData.start_time);
      let endTimehr=this.getHours(this.appointMentData.end_time);
      let endTimemin=this.getMin(this.appointMentData.end_time);
      let endTimeamPm=this.getAmPm(this.appointMentData.end_time);
      let aa=startTimehr+":"+startTimemin+" "+startTimeamPm+" "+"-"+" "+endTimehr+":"+endTimemin+" "+endTimeamPm;
       return aa;
    }


     onEmployeeChange(id){
       console.log(id);
       this.selectedEmployeeIdForEdit=id;
       this.getEmployeesForRelatedService(this.serviceIdForEdit,id);
     }


     onConfirm(){
       console.log("sdfnbdsnh")
       let editAppointmentData={
         emp_id:this.selectedEmployeeIdForEdit,
         date:this.selectedDate,
         start_time:this.startTimeForEdit,
         end_time:this.endTimeForEdit
       }
       this.saloonService.editAppointmentByCustomer(this.appointmentId,editAppointmentData).subscribe(data=>{
         console.log(data)
         if (data.response==1) {
           this.ngOnInit();
         }
       },err=>{
         console.log(err);
       })
     }



}
