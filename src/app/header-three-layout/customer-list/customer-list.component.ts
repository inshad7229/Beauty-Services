import { Component, OnInit } from '@angular/core';
import { SaloonService} from '../../providers/saloon.service' 

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
	appointMents;
	saloonId;
	saloonDetails;
  appointMentData
    p: number = 1
    constructor(private saloonService:SaloonService) {
    	this.saloonDetails=JSON.parse(localStorage['userdetails']);
    	this.saloonId=this.saloonDetails.id;
    }

    ngOnInit() {
    	this.getAppointMentList();
    }

    getAppointMentList(){
    	this.saloonService.getAppointmentDetailsForSaloon(this.saloonId).subscribe(data=>{
    		this.appointMents=data.data;
    	},err=>{

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
        console.log(value);
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

   onView(appointment){
      this.appointMentData=appointment
    }
}
