import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { forkJoin } from "rxjs/observable/forkJoin";

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
   serviceList=[]
   afterFilterSaloon=[]
   saloonListBackup1
   saloonListBackup2
   autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  filter

   get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
  private _tickInterval = 1;
    constructor(public router: Router, 
    	        private saloonServices:SaloonService,
    	        vcr: ViewContainerRef,
    	        private toastr: ToastsManager,
    	        private commonService:CommonService,
    	        private appProvider:AppProvider) {
              this.filter={}
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
			    this.getserviceList()
		}



getserviceList(){
          this.saloonList=[]
          this.waitLoader=true
        this.commonService.getAllSaloonList()
         forkJoin([this.commonService.getAllSaloonList(),this.commonService.getServices()])
        .subscribe((data)=>{
            var list=[]
             this.waitLoader=false
            console.log(data);
            if(data[0].response){
                this.saloonList=this.saloonList.concat(data[0].data.slice(0))
                this.saloonListBackup1=data[0].data.slice(0)
                this.saloonListBackup2=data[0].data.slice(0)
            }
            if(data[1].response){
                this.serviceList=data[1].data
            }
         }) 
    }
imagePath(path){
        if(path.indexOf('base64')==-1) {
            return 'http://18.221.208.210/public/beauty-service/'+path
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

      getRatingClass(rating,flag){
      let count:number=0;
      let avg:number=0
      for (var i = 0; i < rating.length; ++i) {
        // code...rating
        if (rating[i].rating) {
          // code...
          count=count+parseInt(rating[i].rating)
        }
      }
       avg=count/rating.length
      if (flag==1) {
        if (avg<1) {
          return 'fa fa-star-half-o'
        }else{
          return 'fa fa-star'
        }
      }
     else if (flag==2) {
        if (avg<2) {
          return 'fa fa-star-half-o'
        }else{
          return 'fa fa-star'
        }
      }

      else if (flag==3) {
        if (avg<3) {
          return 'fa fa-star-half-o'
        }else{
          return 'fa fa-star'
        }
      }
     else if (flag==4) {
        if (avg<4) {
          return 'fa fa-star-half-o'
        }else{
          return 'fa fa-star'
        }
      }
    else  if (flag==5) {
        if (avg<5) {
          return 'fa fa-star-half-o'
        }else{
          return 'fa fa-star'
        }
      }
    }


    findRangclass(rang ,flag){
       if (flag==1) {
          if (parseInt(rang)>=flag) {
            return 'active'
          }
       }else if (flag==2) {
          if (parseInt(rang)>=flag) {
            return 'active'
          }
       }else if (flag==3) {
          if (parseInt(rang)>=flag) {
            return 'active'
          }
       }else if (flag==4) {
          if (parseInt(rang)>=flag) {
            return 'active'
          }
       }
    }

    unique(array){
         return array.filter(function(el, index, arr) {
                  return index == arr.indexOf(el);     
              }); 
    }

  onFirst(status){
    if (status==true) {
     let data=this.saloonListBackup1.filter(arg=>arg.price_range=='1')
     this.afterFilterSaloon=this.afterFilterSaloon.concat(data)
     this.saloonList=this.unique(this.afterFilterSaloon)
     this.saloonList=this.unique(this.saloonList)
     if (this.filter.sort) {
       this.onSort(this.filter.sort)
     }
    }else{
      this.saloonList=this.saloonList.filter(arg=>arg.price_range!='1')
      this.afterFilterSaloon=this.afterFilterSaloon.filter(arg=>arg.price_range!='1')
      if (this.filter.sort) {
       this.onSort(this.filter.sort)
     }
    }

  }
  onSecond(status){
     if (status==true) {
     let data=this.saloonListBackup1.filter(arg=>arg.price_range=='2')
      this.afterFilterSaloon=this.afterFilterSaloon.concat(data)
     this.saloonList=this.unique(this.afterFilterSaloon)
     this.saloonList=this.unique(this.saloonList)
     if (this.filter.sort) {
       this.onSort(this.filter.sort)
     }
    }else{
      this.saloonList=this.saloonList.filter(arg=>arg.price_range!='2')
      this.afterFilterSaloon=this.afterFilterSaloon.filter(arg=>arg.price_range!='2')
      if (this.filter.sort) {
       this.onSort(this.filter.sort)
     }
    }
  }
  onThird(status){
    if (status==true) {
     let data=this.saloonListBackup1.filter(arg=>arg.price_range=='3')
      this.afterFilterSaloon=this.afterFilterSaloon.concat(data)
     this.saloonList=this.unique(this.afterFilterSaloon)
     this.saloonList=this.unique(this.saloonList)
     if (this.filter.sort) {
       this.onSort(this.filter.sort)
     }
    }else{
      this.saloonList=this.saloonList.filter(arg=>arg.price_range!='3')
      this.afterFilterSaloon=this.afterFilterSaloon.filter(arg=>arg.price_range!='3')
      if (this.filter.sort) {
       this.onSort(this.filter.sort)
     }
    }
  }
  onFourth(status){
    if (status==true) {
     let data=this.saloonListBackup1.filter(arg=>arg.price_range=='4')
      this.afterFilterSaloon=this.afterFilterSaloon.concat(data)
     this.saloonList=this.unique(this.afterFilterSaloon)
     this.saloonList=this.unique(this.saloonList)
     if (this.filter.sort) {
       this.onSort(this.filter.sort)
     }
    }else{
      this.saloonList=this.saloonList.filter(arg=>arg.price_range!='4')
      this.afterFilterSaloon=this.afterFilterSaloon.filter(arg=>arg.price_range!='4')
      if (this.filter.sort) {
       this.onSort(this.filter.sort)
     }
    }
  }

  onService(checkStatus,id){
    if (checkStatus==true) {
     let data=this.saloonListBackup1.filter(arg=>this.checkIndex(arg,id)==true)
      this.afterFilterSaloon=this.afterFilterSaloon.concat(data)
     this.saloonList=this.unique(this.afterFilterSaloon)
     this.saloonList=this.unique(this.saloonList)
     if (this.filter.sort) {
       this.onSort(this.filter.sort)
     }
    }else{
      this.saloonList=this.saloonList.filter(arg=>this.checkIndex2(arg,id)==true)
      this.afterFilterSaloon=this.afterFilterSaloon.filter(arg=>this.checkIndex2(arg,id)==true)
      if (this.filter.sort) {
       this.onSort(this.filter.sort)
     }

    } 
  }
// this.filterDist.map(function (img) { return img.name; }).indexOf(this.selectedDist[i])==-1)
  checkIndex(arg,id):boolean{
     if (arg.saloonServices.length>0) {
       
       if ( arg.saloonServices.map(function (img) { return +img.service_id; }).indexOf(id)!=-1) {
         return true
       }else{
         return false
       }
     }else{
       return false
     }
  }
  checkIndex2(arg,id):boolean{
     if (arg.saloonServices.length>0) {
       
       if ( arg.saloonServices.map(function (img) { return +img.service_id; }).indexOf(id)!=-1) {
         return false
       }else{
         return true
       }
     }
  }

  onClearAll(){
      this.filter.first=false
      this.filter.two=false
      this.filter.three=false
      this.filter.four=false
      for (var i = 0; i < this.serviceList.length; ++i) {
        this.serviceList[i].checkStatus=false
      }
      this.saloonList=this.saloonListBackup2.slice(0)
  }

 onSort(value){
 const data =this.saloonList.slice();
    if (!value || value == '') {
      this.saloonList = data;
      
      return;
    }

    this.saloonList.sort((a, b) => {
      //alert(value)
      let isAsc =  'asc';
      switch (value) {

        case 'low': return compare1(parseInt(a.price_range), parseInt(b.price_range), isAsc);
        case 'high': return compare2(parseInt(a.price_range), parseInt(b.price_range), isAsc);
        default: return 0;
      }
    });
  }
}

function compare1(a, b, isAsc) {
  return (a-b) 
}

function compare2(a, b, isAsc) {
  return (b-a) 
}


function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}
