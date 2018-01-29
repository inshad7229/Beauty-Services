import { Component, OnInit } from '@angular/core';
import { SaloonService }from '../../providers/saloon.service'

@Component({
    selector: 'app-transaction-details',
    templateUrl: './transaction-details.component.html',
    styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
	userDetail=JSON.parse(localStorage['userdetails']);
	transactionData;
    p:number=1;
    constructor(private saloonService:SaloonService) {}

    ngOnInit() {

    	this.getTransactionData();
    }


    getTransactionData(){
    	this.saloonService.salonTransactionDetails(this.userDetail.id).subscribe(data=>{
    		if (data) {
    			this.transactionData=data.data;
    		}
    	},err=>{

    	})
    }
}
