import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager , Toast} from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {CustomerSignUpModel} from '../../models/customer.modal';
import {CustomerService} from '../../providers/customer.service'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
declare var $
declare var jQuery
declare var Metronic
declare var Layout
declare var Demo
declare var Tasks
@Component({
    selector: 'app-customer-booking-details',
    templateUrl: './customer-booking-details.component.html',
    styleUrls: ['./customer-booking-details.component.scss']
})
export class CustomerBookingDetailsComponent implements OnInit {
 
    constructor(public router: Router, private fb: FormBuilder,
                vcr: ViewContainerRef,
                private toastr: ToastsManager,
                private customerService:CustomerService) {
    }

    ngOnInit() {
        $("#row1").hide(600);
        $("#row2").show(600);
        $("#row5").hide(500);
        $("#row6").show(500);
        Metronic.init(); // init metronic core componets
        Layout.init(); // init layout
        Demo.init(); // init demo features 
        /*Index.init(); // init index page*/
        Tasks.initDashboardWidget(); // init tash dashboard widget
   }
}
